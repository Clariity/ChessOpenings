import { useEffect, useState } from 'react';

import { share } from '../../data/icons';
import { Button, LinkButton } from '../utils/Button';
import { Modal } from '../utils/Modal';
import { SVG } from '../utils/SVG';

export function ResultModal({ setShowResultModal, result }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      navigator.clipboard.writeText(`https://chessopenings.co.uk/submissions/${result.id}`);
    }
  }, [copied, result]);

  return (
    <Modal title="Contribute" onClose={() => setShowResultModal(false)}>
      {result?.id ? (
        <div className="flex flex-col">
          <h2 className="text-xl mb-4">Submission Successful</h2>
          <p className="mb-4">It will now be reviewed by an admin and either accepted or rejected.</p>
          <p className="mb-4">
            Here is a permanent link to your submission so you can track its progress. Copy it down somewhere safe:
          </p>

          <div className="text-center p-2 mb-4 bg-darkest rounded-md">
            {`https://chessopenings.co.uk/submissions/${result.id}`}
          </div>
          <div className="mb-4 mx-auto" onClick={() => setCopied(!copied)}>
            <Button>
              <SVG icon={share} marginRight={2} size={24} />
              {copied ? 'Copied' : 'Click to Copy'}
            </Button>
          </div>

          <p className="mb-4">
            Keep track of your submissions easier and see Admin comments by joining the ChessOpenings Discord Server.
            Click the Discord logo below to join!
          </p>
          <a
            className="flex flex-col items-center"
            href="https://discord.gg/xKYtamwV8p"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="mb-4 w-24" src="/media/images/discord.png" alt="Discord" />
            ChessOpenings Discord Server
          </a>

          <div className="mt-8 mb-4 flex justify-evenly">
            <Button onClick={() => setShowResultModal(false)}>Submit Another</Button>
            <LinkButton link={`/submissions/${result.id}`}>View Submission</LinkButton>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="text-xl mb-4">Submission Failed</h2>
          <p className="mb-4">Something went wrong with your submission, please try again later:</p>
          <p className="mb-4">{result?.error}</p>
          <div className="mt-auto">
            <Button onClick={() => setShowResultModal(false)}>Close</Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
