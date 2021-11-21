import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import GoogleButton from 'react-google-button';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import Button from '../components/utils/Button';
import Input from '../components/utils/Input';
import { auth } from '../firebase';
import { SEO } from '../components/utils/SEO';
import { Splitter } from '../components/utils/Splitter';
import { handleAuthErrorMessage } from '../functions/helpers';

const provider = new GoogleAuthProvider();

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const {
    query: { redirect }
  } = useRouter();

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      Router.push(redirect || '/');
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
    setLoading(false);
  }

  async function handleEmailAndPasswordSignIn() {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Router.push(redirect || '/');
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
    setLoading(false);
  }

  return (
    <div className="flex-column" style={{ maxWidth: '1044px' }}>
      <SEO description="Sign in to ChessOpenings.co.uk" title="sign in" path="/sign-in" />

      <div className="flex-column container-sm margin-auto-lr">
        <div className="margin-auto-lr margin-20-t flex-column flex-align">
          <Image
            priority={true}
            className="home-logo"
            src="/media/images/logo2.png"
            alt="Chess Openings Logo"
            width={80}
            height={80}
          />
          <h1 className="home-title-text">Sign In to ChessOpenings</h1>
        </div>

        {error && <p className="text-align-center">Error: {error}</p>}

        <Input
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          customStyles={{ marginBottom: '10px' }}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          customStyles={{ marginBottom: '20px' }}
        />
        <Button
          onClick={handleEmailAndPasswordSignIn}
          text={loading ? 'Loading' : 'Sign In'}
          customStyles={{ marginBottom: '40px', marginTop: '20px' }}
          disabled={!email || !password}
        />
        <Splitter text="or" />
        <div className="flex flex-justify margin-20-tb">
          <GoogleButton className="width-100 border-radius-4" type="light" onClick={handleGoogleSignIn} />
        </div>

        <h1 className="margin-40-t">Don&apos;t have an account yet?</h1>
        <div style={{ textAlign: 'justify' }}>
          <p>Register an account with ChessOpenings to gain access to more features. Such as:</p>
          <ul>
            <li>Earn achievements</li>
            <li>Track learned openings</li>
            <li>Track pass rate</li>
          </ul>
        </div>

        <Link href="/register">
          <Button text="Register" customStyles={{ marginBottom: '40px', marginTop: '20px' }} />
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const uid = ctx.req.cookies?.uid;

  // user is already signed in so redirect back to home page
  if (uid) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  return {
    props: {}
  };
}
