import { useRouter } from 'next/router';

import Button from '../utils/Button';
import Modal from '../utils/Modal';

export default function ResultModal({ setShowResultModal, result }) {
  const router = useRouter();

  return (
    <Modal title="Contribute" onClose={() => setShowResultModal(false)}>
      {result.id ? (
        <>
          <h1 style={{ marginTop: '0px' }}>Submission Successful</h1>
          <p>It will now be reviewed by an admin and either accepted or rejected.</p>
          <p>Here is a permanent link to your submission so you can track its progress:</p>
          <a
            style={{ textAlign: 'center' }}
            href={`/submission/${result.id}`}
          >{`https://chessopenings.co.uk/submission/${result.id}`}</a>
          <div className="help-social">
            <p className="text-align-left">
              Keep track of your submissions easier and see Admin comments by joining the ChessOpenings Discord Server.
              Click on the Discord logo to join.
            </p>
            <a
              className="flex-column flex-align flex-justify help-social-link"
              href="https://discord.gg/xKYtamwV8p"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="twitter" src="/media/images/discord.png" alt="Discord" />
              ChessOpenings Discord Server
            </a>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <Button
              onClick={() => setShowResultModal(false)}
              text="Submit Another"
              customStyles={{ marginTop: '20px', marginBottom: '10px' }}
            />
            <Button onClick={() => router.push(`/submission/${result.id}`)} text="View Submission" />
          </div>
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
