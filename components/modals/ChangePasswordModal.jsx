import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../../firebase';
import { useData } from '../../context/data-context';
import { Button, WarningButton } from '../utils/Button';
import { ErrorMessage } from '../utils/ErrorMessage';
import { Modal } from '../utils/Modal';

export function ChangePasswordModal({ setShowModal }) {
  const { user } = useData();
  const [emailSent, setEmailSent] = useState(false);
  const [requestError, setRequestError] = useState();

  async function handleSubmit() {
    try {
      setEmailSent(true);
      await sendPasswordResetEmail(auth, user?.email);
    } catch (error) {
      setRequestError(error.message);
    }
  }

  return (
    <Modal title="Request Password Reset" onClose={() => setShowModal(false)}>
      <>
        {requestError && <ErrorMessage>{requestError}</ErrorMessage>}

        <p>
          {emailSent
            ? `Password reset email has been sent, remember to check your spam/junk folder in case it arrives there.`
            : `Click "Send Password Reset Email" to send a reset email to the address associated with this account. Please only do this once.`}
        </p>

        {!emailSent && (
          <div className="my-4">
            <Button onClick={handleSubmit}>Send Password Reset Email</Button>
          </div>
        )}
        <WarningButton onClick={() => setShowModal(false)}>{emailSent ? 'Close' : 'Cancel'}</WarningButton>
      </>
    </Modal>
  );
}
