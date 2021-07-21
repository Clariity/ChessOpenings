import React, { useState } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';
import ReCAPTCHA from 'react-google-recaptcha';

import firebase from '../../firebaseConfig';
import Button from '../../components/utils/Button';
import Input from '../../components/utils/Input';
import SEO from '../../components/SEO';

export default function Login() {
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // Attempt login, store token and push to submissions
  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          Authorization: captchaToken
        },
        body: JSON.stringify({ pw: password })
      });
      const responseJSON = await response.json();
      if (response?.status === 200) {
        const token = responseJSON.token;
        if (token) {
          Cookies.set('adminToken', JSON.stringify(token), { expires: 1 });
        }
        Router.push('/admin/submissions');
      } else {
        setError(responseJSON.error);
        setPassword('');
        setLoading(false);
        setCaptchaToken(null);
        window.grecaptcha?.reset();
      }
    } catch (error) {
      setError(error);
      setPassword('');
      setLoading(false);
      setCaptchaToken(null);
      window.grecaptcha?.reset();
    }
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

      {error && <p>{error}</p>}

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
        text={loading ? 'Loading' : 'Submit'}
        customStyles={{ marginBottom: '40px', marginTop: '20px' }}
        disabled={!password || !captchaToken}
      />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const adminToken = ctx.req.cookies?.adminToken;

  // allow session if token provided and update stored tokens
  if (adminToken) {
    // get all tokens from firebase
    const querySnapshot = await firebase.collection('tokens').get();
    // for each token, if they have expired delete them
    const validTokens = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().expires < Date.now()) {
        firebase.collection('tokens').doc(doc.id).delete();
      } else validTokens.push(doc.id);
    });
    // check if adminToken remains, if so redirect to submissions
    if (validTokens.includes(JSON.parse(adminToken).id)) {
      return {
        redirect: {
          permanent: false,
          destination: '/admin/submissions'
        }
      };
    }
  }

  // if no token or invalid token, don't redirect
  return {
    props: {}
  };
}
