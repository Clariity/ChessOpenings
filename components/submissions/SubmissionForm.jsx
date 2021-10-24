import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import ReCAPTCHA from 'react-google-recaptcha';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

import Button from '../../components/utils/Button';
import Input from '../../components/utils/Input';
import { useChessboard } from '../../context/board-context';
import { contributeTypeChoices, colourChoices, openingChoices } from '../../data/consts';

export function SubmissionForm({ setResult, setShowResultModal }) {
  const { game, reset } = useChessboard();

  const [contributionType, setContributionType] = useState(contributeTypeChoices[0]);
  const [colour, setColour] = useState(colourChoices[0]);
  const [name, setName] = useState('');
  const [variation, setVariation] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [captchaToken, setCaptchaToken] = useState();

  const [resetCaptcha, setResetCaptcha] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && resetCaptcha) {
      window.grecaptcha.reset();
      setResetCaptcha(false);
    }
  }, [resetCaptcha]);

  async function handleSubmit() {
    const id = uuidv4();
    const submission = {
      id,
      status: 'OPEN',
      type: contributionType.value,
      comments: [],
      contributor: username || 'anonymous contributor',
      data: {
        label: `${name.value}: ${variation}`,
        description,
        value: game?.history({ verbose: true })
      }
    };
    if (contributionType?.value.includes('Trap')) submission.data.colour = colour.value;

    try {
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
      } else {
        setResult(responseJSON);
      }
    } catch (error) {
      setResult(error);
    }
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
    <div className="flex-column submission-form">
      <Button
        onClick={reset}
        text="Reset Position"
        customStyles={{ borderRadius: '0px', marginTop: '10px' }}
        disabled={!game?.history().length}
      />

      <textarea
        value={game?.history({ verbose: true }) ? JSON.stringify(game?.history({ verbose: true })) : ''}
        disabled
        rows={10}
        style={{
          resize: 'none',
          border: 'none',
          backgroundColor: 'lightgray',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px'
        }}
      />

      <label className="margin-10-t margin-5-b" htmlFor="type-form-input">
        Contribution Type
      </label>
      <div className="contribute-select">
        <Select
          id="type-form-input"
          options={contributeTypeChoices}
          defaultValue={contributeTypeChoices[0]}
          onChange={setContributionType}
          isSearchable={false}
        />
      </div>

      {contributionType?.value.includes('Trap') && (
        <>
          <label className="margin-10-t margin-5-b" htmlFor="type-form-input">
            Play as Colour
          </label>
          <div className="contribute-select">
            <Select
              id="type-form-input"
              options={colourChoices}
              defaultValue={colourChoices[0]}
              onChange={setColour}
              isSearchable={false}
            />
          </div>
        </>
      )}

      <label className="margin-10-t margin-5-b" htmlFor="opening-name">
        Opening Name
      </label>
      <div className="contribute-select">
        <CreatableSelect
          id="opening-name"
          isClearable
          placeholder="e.g. Italian Game"
          options={openingChoices.sort((a, b) => (a.value < b.value ? -1 : 1))}
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

      <Input
        id="opening-username"
        label="Username to be displayed (optional)"
        placeholder=""
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        customStyles={{ marginBottom: '20px' }}
        maxLength={30}
      />

      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setCaptchaToken} />

      <Button
        onClick={handleSubmit}
        text="Submit"
        customStyles={{ marginBottom: '40px', marginTop: '20px' }}
        disabled={game?.history().length < 4 || !name || !variation || !description || !captchaToken}
      />
    </div>
  );
}
