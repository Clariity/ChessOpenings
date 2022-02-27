import { useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';

import { useData } from '../../context/data-context';
import { Button, WarningButton } from '../utils/Button';
import { ErrorMessage } from '../utils/ErrorMessage';
import { Modal } from '../utils/Modal';

export function VerifyEmailModal({ setShowModal }) {
  const { user } = useData();
  const [emailSent, setEmailSent] = useState(false);
  const [requestError, setRequestError] = useState();

  async function handleSubmit() {
    try {
      setEmailSent(true);
      sendEmailVerification(user);
    } catch (error) {
      setRequestError(error.message);
    }
  }

  return (
    <Modal title="Verify Email Address" onClose={() => setShowModal(false)}>
      <>
        {requestError && <ErrorMessage message={requestError} />}

        <p>
          {emailSent
            ? `Email verification request has been sent, remember to check your spam/junk folder in case it arrives there.`
            : `Click "Send Email Verification Request" to send a verification email to the address associated with this account. Please only do this once.`}
        </p>

        {!emailSent && (
          <div className="my-4">
            <Button onClick={handleSubmit}>Send Email Verification Request</Button>
          </div>
        )}
        <WarningButton onClick={() => setShowModal(false)}>{emailSent ? 'Close' : 'Cancel'}</WarningButton>
      </>
    </Modal>
  );
}
