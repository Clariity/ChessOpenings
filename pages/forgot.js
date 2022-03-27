import { useCallback, useEffect, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../firebase';
import { handleAuthErrorMessage } from '../functions/helpers';
import { Button } from '../components/utils/Button';
import { Input } from '../components/utils/Input';
import { SEO } from '../components/utils/SEO';
import { Logo } from '../components/utils/Logo';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handlePasswordResetEmail = useCallback(async () => {
    if (!email || sent) return;
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
    setLoading(false);
  }, [email, sent]);

  useEffect(() => {
    function upHandler({ key }) {
      if (key === 'Enter') {
        handlePasswordResetEmail();
      }
    }

    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keyup', upHandler);
    };
  }, [handlePasswordResetEmail]);

  return (
    <div className="flex flex-col max-w-[512px]">
      <SEO description="Password reset request" title="forgot" path="/forgot" />

      <div className="flex flex-col items-center my-8">
        <div className="w-20">
          <Logo />
        </div>
        <h1 className="text-xl xs:text-2xl sm:text-3xl mt-4">Forgot Password?</h1>
      </div>

      <p className="mb-4">
        Enter the email used for your account below and a password reset email will be sent to that address.
      </p>
      <p className="mb-4">Please only submit once and ensure to check junk/spam folders.</p>
      <p className="mb-4">This tab can be closed once your password is reset.</p>

      {error && <p className="text-align-center">Error: {error}</p>}

      <Input
        autofocus
        id="email-input"
        label="Email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={handlePasswordResetEmail} disabled={loading || !email || sent}>
        {loading ? 'Loading' : sent ? 'Email Sent' : 'Send Email'}
      </Button>
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
