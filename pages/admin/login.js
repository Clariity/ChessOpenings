import React, { useEffect, useState } from 'react';
import Router from 'next/router';

import ReCAPTCHA from 'react-google-recaptcha';

import Button from '../../components/utils/Button';
import Input from '../../components/utils/Input';
import SEO from '../../components/SEO';

export default function Login() {
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.grecaptcha?.reset();
      setPassword('');
    }
  }, []);

  async function handleSubmit() {
    Router.push({
      pathname: '/admin/submissions',
      query: { pw: password, ct: captchaToken }
    });
  }

  return (
    <div className="flex-column" style={{ maxWidth: '1044px' }}>
      <SEO description="Admin Login" title="login" path="/admin/login" />
      <h1 className="page-title">Admin Login</h1>
      <div style={{ textAlign: 'justify' }}>
        <p>If you&#39;re having a nosey around and find this page. Quit being nosey.</p>
        <p>
          Want to contribute to the site itself?{' '}
          <a
            className="link"
            href="https://github.com/Clariity/ChessOpenings"
            target="_blank"
            rel="noopener noreferrer"
          >
            Make a Pull Request on the GitHub Repo.
          </a>
        </p>
      </div>

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        customStyles={{ marginBottom: '20px' }}
      />

      <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={setCaptchaToken} />

      <Button
        onClick={handleSubmit}
        text="Submit"
        customStyles={{ marginBottom: '40px', marginTop: '20px' }}
        disabled={!password || !captchaToken}
      />
    </div>
  );
}
