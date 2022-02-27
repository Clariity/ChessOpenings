import { useCallback, useEffect, useState } from 'react';
import { applyActionCode, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import Router, { useRouter } from 'next/router';

import { auth } from '../firebase';
import { handleAuthErrorMessage } from '../functions/helpers';
import { useData } from '../context/data-context';
import { Button } from '../components/utils/Button';
import { SEO } from '../components/utils/SEO';
import { Input } from '../components/utils/Input';

export default function SignIn() {
  const { setUser } = useData();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const {
    query: { mode, oobCode }
  } = useRouter();
  const isDisabled = !password || password !== passwordConfirm || password.length < 8;

  const handleResetPassword = useCallback(async () => {
    if (!password || !passwordConfirm) return;
    setLoading(true);
    try {
      await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, password);
      Router.push('/sign-in?reset=true');
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
    setLoading(false);
  }, [password, passwordConfirm, oobCode]);

  // Add event listeners
  useEffect(() => {
    function upHandler({ key }) {
      if (key === 'Enter' && !isDisabled) {
        handleResetPassword();
      }
    }

    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [handleResetPassword, isDisabled]);

  // verify email
  useEffect(() => {
    async function verifyEmail() {
      setLoading(true);
      try {
        await applyActionCode(auth, oobCode);
        setVerified(true);
        setUser((oldUser) => ({ ...oldUser, emailVerified: true }));
      } catch (error) {
        handleAuthErrorMessage(error.code, setError);
      }
      setLoading(false);
    }
    if (mode === 'verifyEmail') {
      verifyEmail();
    }
  }, [mode, oobCode, setUser]);

  // redirect on verification
  useEffect(() => {
    if (verified) {
      setTimeout(() => Router.push('/'), 2000);
    }
  }, [verified]);

  return (
    <div className="flex flex-col max-w-[512px] w-full">
      <SEO description="Email Action" title={mode} path="/auth_action" />

      <div className="flex flex-col items-center my-8">
        <img className="rounded-lg" src="/media/images/logo.png" alt="Chess Openings Logo" width={80} height={80} />
        <h1 className="text-xl xs:text-2xl sm:text-3xl mt-4">
          {mode === 'resetPassword' ? 'Reset Password' : 'Email Address Verification'}
        </h1>
      </div>

      {mode === 'resetPassword' && (
        <>
          {error && <p className="text-center">Error: {error}</p>}
          <Input
            id="new-password-input"
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            id="confirm-input"
            label="Confirm New Password"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <Button fill onClick={handleResetPassword} disabled={isDisabled}>
            {loading ? 'Loading' : 'Reset Password'}
          </Button>
        </>
      )}
      {mode === 'verifyEmail' && (
        <div>
          {loading && <p>Verifying Email</p>}
          {!loading && verified && <p>Email has been verified successfully. Thank you. Redirecting...</p>}
          {error && <p className="text-center">Error: {error}</p>}
        </div>
      )}
    </div>
  );
}
