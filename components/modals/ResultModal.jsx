import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Button from '../utils/Button';
import Modal from '../utils/Modal';

export default function ResultModal({ setShowResultModal, result }) {
  const router = useRouter();

  useEffect(() => {
    document.getElementById('modal-header')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <Modal title="Contribute" onClose={() => setShowResultModal(false)}>
      {result.id ? (
        <>
          <h1 style={{ marginTop: '0px' }}>Submission Successful</h1>
          <p>
            It will now be reviewed by an admin and either accepted or rejected. Here is a permanent link to your
            submission so you can track its progress:
          </p>
          <a href={`/submission/${result.id}`}>{`https://chessopenings.co.uk/submission/${result.id}`}</a>
          <Button
            onClick={() => setShowResultModal(false)}
            text="Submit Another"
            customStyles={{ marginTop: 'auto', marginBottom: '10px' }}
          />
          <Button onClick={() => router.push(`/submission/${result.id}`)} text="View Submission" />
        </>
      ) : (
        <>
          <h1 style={{ marginTop: '0px' }}>Submission Failed</h1>
          <p>Something went wrong with your submission, please try again later:</p>
          <p>{result.error}</p>
          <Button
            onClick={() => setShowResultModal(false)}
            text="Close"
            customStyles={{ marginTop: 'auto', marginBottom: '10px' }}
          />
        </>
      )}
    </Modal>
  );
}
