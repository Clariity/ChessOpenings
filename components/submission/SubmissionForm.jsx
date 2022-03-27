import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CreatableSelect from 'react-select/creatable';
import Filter from 'bad-words';
import ReCAPTCHA from 'react-google-recaptcha';
import Select from 'react-select';

import { contributeTypeChoices, colourChoices, openingChoices, CLEAN_WORDS, start } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { Button, LinkButton } from '../utils/Button';
import { ErrorMessage } from '../utils/ErrorMessage';
import { Input } from '../utils/Input';
import { LoadingSpinner } from '../utils/LoadingSpinner';
import { useLocalStorage } from '../../functions/hooks';
import { Logo } from '../utils/Logo';

export function SubmissionForm({ setResult, setShowResultModal }) {
  const { game, reset, loadGame } = useChessboard();
  const { openingGroups, setSubmissions, traps, user, userData } = useData();

  const [submission, setSubmission] = useLocalStorage('submission', null);
  const [loadedGameFromMemory, setLoadedGameFromMemory] = useState(false);
  const [contributionType, setContributionType] = useState(
    contributeTypeChoices.find((c) => c.value === submission?.type) || contributeTypeChoices[0]
  );
  const [colour, setColour] = useState(colourChoices.find((c) => c.value === submission?.colour) || colourChoices[0]);
  const [name, setName] = useState(submission?.name ? { value: submission.name, label: submission.name } : '');
  const [variation, setVariation] = useState(submission?.variation || '');
  const [description, setDescription] = useState(submission?.description || '');

  const [captchaToken, setCaptchaToken] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(false);

  const wordFilter = new Filter();
  wordFilter.removeWords(...CLEAN_WORDS);
  const submitDisabled =
    game?.history().length < 4 ||
    !name ||
    !variation ||
    !description ||
    !captchaToken ||
    wordFilter.isProfane(name) ||
    wordFilter.isProfane(variation) ||
    wordFilter.isProfane(description);

  useEffect(() => {
    if (typeof window !== 'undefined' && resetCaptcha) {
      window.grecaptcha.reset();
      setResetCaptcha(false);
    }
  }, [resetCaptcha]);

  useEffect(() => {
    if (submission.game && game && !loadedGameFromMemory) {
      loadGame(submission.game);
      setLoadedGameFromMemory(true);
    }
  }, [submission, game, loadedGameFromMemory, loadGame]);

  useEffect(() => {
    if (loadedGameFromMemory)
      setSubmission({
        type: contributionType.value,
        name: name?.value,
        variation,
        description,
        game: game?.fen(),
        colour: colour.value
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colour, contributionType, description, game, name, variation, loadedGameFromMemory]);

  if (!openingGroups || !traps)
    return (
      <div className="my-8">
        <LoadingSpinner
          img={
            <div className="w-24">
              <Logo />
            </div>
          }
          text={'Loading Opening Data...'}
        />
      </div>
    );

  const extraOpeningChoices = openingGroups
    .filter((g) => !openingChoices.find((c) => c.label === g.label))
    .map((g) => ({ label: g.label, value: g.label }));
  const extraTrapChoices = traps
    .filter((t) => !openingChoices.find((c) => c.label === t.label))
    .map((t) => ({ label: t.label, value: t.label }));
  const mergedChoices = [...openingChoices, ...extraOpeningChoices, ...extraTrapChoices];

  async function handleSubmit() {
    const id = uuidv4();
    const submission = {
      id,
      status: 'OPEN',
      type: contributionType.value,
      comments: [],
      contributor: user?.uid || 'anonymous contributor',
      contributorDisplayName: user?.uid ? userData?.displayName || 'A registered user' : 'anonymous contributor',
      data: {
        label: `${name.value}: ${variation}`,
        description,
        value: game?.history({ verbose: true })
      }
    };
    if (contributionType?.value.includes('Trap')) submission.data.colour = colour.value;

    try {
      setSubmitting(true);
      const response = await fetch('/api/submission', {
        method: 'POST',
        headers: {
          Authorization: captchaToken
        },
        body: JSON.stringify(submission)
      });
      const responseJSON = await response.json();

      if (response?.status === 200) {
        setResult({
          ...responseJSON,
          id
        });
        setSubmissions((oldSubmissions) => [...oldSubmissions, submission]);
      } else {
        setResult(responseJSON);
      }
    } catch (error) {
      setResult(error);
    }
    setSubmitting(false);
    setShowResultModal(true);
    resetForm();
    // limit size too https://nextjs.org/docs/api-routes/api-middlewares
  }

  function resetForm() {
    setName('');
    setVariation('');
    setDescription('');
    setCaptchaToken(null);
    setResetCaptcha(true);
    reset();
  }

  return (
    <div className="flex flex-col h-full">
      <div className="my-4">
        <Button fill onClick={() => reset()} disabled={game?.fen() === start}>
          Reset Board
        </Button>
      </div>

      <label className="mb-2" htmlFor="type-form-input">
        Contribution Type
      </label>
      <div className="mb-4 text-black panel-select">
        <Select
          id="type-form-input"
          options={contributeTypeChoices}
          defaultValue={contributionType}
          onChange={setContributionType}
          isSearchable={false}
        />
      </div>

      {contributionType?.value.includes('Trap') && (
        <div className="mb-4">
          <label className="mb-2" htmlFor="type-form-input">
            Play as Colour
          </label>
          <div className="text-black panel-select">
            <Select
              id="type-form-input"
              options={colourChoices}
              defaultValue={colourChoices[0]}
              onChange={setColour}
              isSearchable={false}
            />
          </div>
        </div>
      )}

      <label className="mb-2" htmlFor="opening-name">
        Opening Name
      </label>
      <div className="mb-4 text-black panel-select">
        <CreatableSelect
          defaultValue={name}
          id="opening-name"
          isClearable
          placeholder="e.g. Italian Game"
          options={mergedChoices.sort((a, b) => (a.value < b.value ? -1 : 1))}
          onChange={setName}
        />
      </div>

      <Input
        id="opening-variation"
        label="Variation"
        placeholder="e.g. Evans Gambit, Pierce Defense"
        value={variation}
        onChange={(e) => setVariation(e.target.value)}
        maxLength={75}
      />

      <Input
        id="opening-description"
        label="Description"
        placeholder="A couple sentences describing the opening or need for alteration"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setCaptchaToken} />

      <div className="mt-auto">
        {!user && (
          <ErrorMessage>
            <div className="flex flex-wrap items-center">
              <div className="w-full sm:w-3/4">
                Note: Submitting without being logged in means your contribution will be submitted anonymously and you
                will not get credit for your contribution. Your submission is automatically saved for when you come
                back.
              </div>
              <div className="w-full mt-4 sm:w-1/4 sm:pl-4 sm:mt-0">
                <LinkButton fill link="sign-in">
                  Sign In
                </LinkButton>
              </div>
            </div>
          </ErrorMessage>
        )}
        <Button fill onClick={handleSubmit} disabled={submitDisabled}>
          {submitting ? 'Loading...' : 'Submit'}
        </Button>
      </div>
    </div>
  );
}
