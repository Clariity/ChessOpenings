import { useEffect, useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';

import { handleAuthErrorMessage } from '../functions/helpers';
import { useData } from '../context/data-context';
import { Button } from '../components/utils/Button';
import { ErrorMessage } from '../components/utils/ErrorMessage';
import { SEO } from '../components/utils/SEO';

export default function Register() {
  const { user } = useData();
  const [sent, setSent] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (user?.emailVerified) {
      window.close();
    }
  }, [user]);

  function handleSendEmailVerification() {
    setSent(true);
    try {
      sendEmailVerification(user);
    } catch (error) {
      handleAuthErrorMessage(error.code, setError);
    }
  }

  return (
    <div className="flex flex-col max-w-[512px]">
      <SEO description="Verify account email address" title="verify" path="/verify" />

      <div className="flex flex-col items-center  my-8">
        <img className="rounded-lg" src="/media/images/logo.png" alt="Chess Openings Logo" width={80} height={80} />
        <h1 className="text-xl xs:text-2xl sm:text-3xl mt-4">Verify account email address</h1>
      </div>
      <div className="pb-4">
        <p className="pb-4">
          An email has been sent to the email account entered when you registered. Please click the verification link
          sent in that email to verify your account. Once verified, you can close this window.
        </p>
        <p className="pb-4">
          Make sure to check the junk/spam inbox incase it gets filtered there. If an email is not received within 10
          minutes. Please try the resend button below.
        </p>
      </div>

      {error && <ErrorMessage message={error} />}
      <div className="my-4">
        <Button disabled={sent} fill onClick={handleSendEmailVerification}>
          {sent ? 'Sent' : 'Resend Verification Email'}
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const idToken = ctx.req.cookies?.idToken;

  // user isn't signed in so redirect back to home page
  if (!idToken) {
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
