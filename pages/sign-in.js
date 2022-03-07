import { useState, useEffect, useCallback } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import GoogleButton from 'react-google-button';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { auth } from '../firebase';
import { handleAuthErrorMessage } from '../functions/helpers';
import { useData } from '../context/data-context';
import { Button, LinkButton } from '../components/utils/Button';
import { ErrorMessage } from '../components/utils/ErrorMessage';
import { Input } from '../components/utils/Input';
import { Splitter } from '../components/utils/Splitter';
import { SEO } from '../components/utils/SEO';

const provider = new GoogleAuthProvider();

export default function SignIn() {
  const { userData } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const {
    query: { redirect, reset }
  } = useRouter();

  const handleEmailAndPasswordSignIn = useCallback(async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
    setLoading(false);
  }, [email, password]);

  // Add event listeners
  useEffect(() => {
    function upHandler({ key }) {
      if (key === 'Enter') {
        handleEmailAndPasswordSignIn();
      }
    }

    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [handleEmailAndPasswordSignIn]);

  // Redirect once user data is received
  useEffect(() => {
    if (userData) Router.push(redirect?.[0] === '/' ? redirect : '/');
  }, [userData, redirect]);

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col max-w-[512px] mb-10">
      <SEO description="Sign in to ChessOpenings.co.uk" title="sign in" path="/sign-in" />

      <div className="flex flex-col items-center  my-8">
        <img className="rounded-lg" src="/media/images/logo.png" alt="Chess Openings Logo" width={80} height={80} />
        <h1 className="text-xl xs:text-2xl sm:text-3xl mt-4">Sign In to ChessOpenings.co.uk</h1>
      </div>

      {error && <ErrorMessage message={error} />}
      {/* // TODO - info warning component instead or error warning */}
      {reset && <p className="text-center">Password successfully reset. Please sign in with new password</p>}

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
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Link href="/forgot">
        <a>
          <span className="cursor-pointer underline">Forgotten Password?</span>
        </a>
      </Link>
      <div className="my-4">
        <Button
          fill
          onClick={handleEmailAndPasswordSignIn}
          text={loading ? 'Loading' : 'Sign In'}
          disabled={!email || !password}
        >
          {loading ? 'Loading' : 'Sign In'}
        </Button>
      </div>

      <Splitter text="or" />

      <div className="my-4">
        <GoogleButton className="w-full rounded-md" type="light" onClick={handleGoogleSignIn} />
      </div>

      <h1 className="text-lg mt-4">Don&apos;t have an account yet?</h1>
      <div className="pb-4">
        <p className="pb-4">Register an account with ChessOpenings to gain access to more features. Such as:</p>
        <ul className="list-disc list-inside">
          <li className="ml-4">Earn achievements</li>
          <li className="ml-4">Track learned openings and openings statistics</li>
          <li className="ml-4">Attribution for contributed openings</li>
        </ul>
      </div>

      <LinkButton fill link="/register">
        Register
      </LinkButton>
    </div>
  );
}

// export async function getServerSideProps(ctx) {
//   const idToken = ctx.req.cookies?.idToken;

//   // user is already signed in so redirect back to home page
//   if (idToken) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/'
//       }
//     };
//   }

//   return {
//     props: {}
//   };
// }
