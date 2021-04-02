import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import ReCAPTCHA from 'react-google-recaptcha';
import Select from 'react-select';

import Button from '../components/utils/Button';
import Input from '../components/utils/Input';
import SEO from '../components/SEO';
import { contributeTypeChoices } from '../data/consts';

export default function Contribute() {
  const [moves, setMoves] = useState();
  const [contributionType, setContributionType] = useState(contributeTypeChoices[0]);
  const [name, setName] = useState();
  const [variation, setVariation] = useState();
  const [description, setDescription] = useState();
  const [username, setUsername] = useState();
  const [captchaToken, setCaptchaToken] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && !moves) {
      setMoves(JSON.parse(window.localStorage.getItem('moves')));
    }
  }, []);

  async function handleSubmit() {
    const submission = {
      type: contributionType.value,
      data: {
        label: `${name}: ${variation}`,
        description,
        value: moves,
        contributor: username || 'anonymous contributor'
      }
    };
    await fetch('/api/submit', {
      method: 'POST',
      headers: {
        Authorization: captchaToken
      },
      body: JSON.stringify(submission)
    });
    // after submission reset moves/form so they cannot spam submit
    // window.grecaptcha.reset();
    // limit size too https://nextjs.org/docs/api-routes/api-middlewares
  }

  return (
    <div className="flex-column" style={{ maxWidth: '1044px' }}>
      <SEO description="Contribute to ChessOpenings.co.uk" title="contribute" path="/contribute" />
      <h1 className="page-title">Contribute to ChessOpenings</h1>
      <div style={{ textAlign: 'justify' }}>
        <p>
          As an open source project, ChessOpenings.co.uk relies on community contributions to add great content to the
          site. If you know an opening/variation that has not been added yet, you can submit it below and it will be
          reviewed to be added to the site.
        </p>
        <p>Want to contribute to the site itself? Make a Pull Request on the GitHub Repo.</p>

        <h1>Submission Form</h1>
        <p>
          Adding content has been made easy with the use of the debug tool. Simply make the moves you wish to submit
          using the tool. When you are returned here, the moves section will be filled out for you. Then complete the
          rest of the form and submit your contribution to be reviewed.
        </p>
      </div>

      <Link href="/debug">
        <Button
          disabled={false}
          onClick={null}
          text="Add Moves with Debug Tool"
          customStyles={{ borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}
        />
      </Link>
      <textarea
        value={moves ? JSON.stringify(moves) : ''}
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
          onChange={(change) => setContributionType(change.value)}
          isSearchable={false}
        />
      </div>

      <Input
        id="opening-name"
        label="Opening Name"
        placeholder="e.g. Italian Game"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={30}
      />

      <Input
        id="opening-variation"
        label="Variation"
        placeholder="e.g. Evans Gambit, Pierce Defense"
        value={variation}
        onChange={(e) => setVariation(e.target.value)}
        maxLength={50}
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
        icon="play_arrow"
        customStyles={{ marginBottom: '40px', marginTop: '20px' }}
        disabled={!moves || !name || !variation || !description || !captchaToken}
      />
      <div className="flex-column">
        <h1>Top Contributors</h1>
      </div>
    </div>
  );
}
