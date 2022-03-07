import { useCallback, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import Filter from 'bad-words';
import GoogleButton from 'react-google-button';
import Router from 'next/router';

import { auth } from '../firebase';
import { handleAuthErrorMessage } from '../functions/helpers';
import { useData } from '../context/data-context';
import { Button, LinkButton } from '../components/utils/Button';
import { ErrorMessage } from '../components/utils/ErrorMessage';
import { Input } from '../components/utils/Input';
import { Splitter } from '../components/utils/Splitter';
import { CLEAN_WORDS } from '../data/consts';
import { SEO } from '../components/utils/SEO';

const provider = new GoogleAuthProvider();

export default function Register() {
  const { tempDisplayName, setTempDisplayName } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const wordFilter = new Filter();
  wordFilter.removeWords(...CLEAN_WORDS);
  const isDisabled =
    !email ||
    !password ||
    password !== passwordConfirm ||
    password.length < 8 ||
    !tempDisplayName ||
    tempDisplayName.length < 3 ||
    tempDisplayName.toLowerCase().includes('admin') ||
    wordFilter.isProfane(tempDisplayName);

  const handleEmailAndPasswordRegister = useCallback(async () => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      sendEmailVerification(user);
      Router.push('/verify');
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
    setLoading(false);
  }, [email, password]);

  // Add event listeners
  useEffect(() => {
    function upHandler({ key }) {
      if (key === 'Enter' && !isDisabled) {
        handleEmailAndPasswordRegister();
      }
    }

    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [handleEmailAndPasswordRegister, isDisabled]);

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      Router.push('/');
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col max-w-[512px] mb-10">
      <SEO description="Register with ChessOpenings.co.uk" title="register" path="/register" />

      <div className="flex flex-col items-center my-8">
        <img className="rounded-lg" src="/media/images/logo.png" alt="Chess Openings Logo" width={80} height={80} />
        <h1 className="text-xl xs:text-2xl sm:text-3xl mt-4">Register with ChessOpenings.co.uk</h1>
      </div>

      <div className="pb-4">
        <p className="pb-4">Register an account with ChessOpenings to gain access to more features. Such as:</p>
        <ul className="list-disc list-inside">
          <li className="ml-4">Earn achievements</li>
          <li className="ml-4">Track learned openings and openings statistics</li>
          <li className="ml-4">Attribution for contributed openings</li>
        </ul>
      </div>

      <div className="flex my-4">
        <GoogleButton className="w-full rounded-md" type="light" onClick={handleGoogleSignIn} />
      </div>

      <Splitter text="or" />

      <div className="mt-4" />
      {error && <ErrorMessage message={error} />}
      <Input
        autoFocus
        id="email-input"
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="password-input"
        label="Password (Minimum 8 characters)"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        id="confirm-input"
        label="Confirm Password"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Input
        id="name-input"
        label="Display Name"
        type="text"
        value={tempDisplayName}
        onChange={(e) => setTempDisplayName(e.target.value)}
      />
      <div className="my-4">
        <Button disabled={isDisabled} fill onClick={handleEmailAndPasswordRegister}>
          {loading ? 'Loading' : 'Register'}
        </Button>
      </div>

      <Splitter />

      <h2 className="text-center text-xl my-4">Already have an account?</h2>
      <div className="mb-8">
        <LinkButton link="/sign-in" fill>
          Sign In
        </LinkButton>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const idToken = ctx.req.cookies?.idToken;

  // user is already signed in so redirect back to home page
  if (idToken) {
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
