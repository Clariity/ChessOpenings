import { useState } from 'react';

import ResultModal from '../components/modals/ResultModal';
import { Chessboard } from '../components/chessboard/Chessboard';
import { ChessboardProvider } from '../context/board-context';
import { SEO } from '../components/utils/SEO';
import { SubmissionForm } from '../components/submissions/SubmissionForm';

export default function Contribute() {
  const [showResultModal, setShowResultModal] = useState();
  const [result, setResult] = useState();

  return (
    <div className="flex-column container">
      <SEO
        description="Contribute your opening knowledge and help other ChessOpenings users to learn valuable openings. With a move recording tool and an easy to fill out form, it's very simple to submit your openings. Once reviewed by a site admin it will then be added to the list of openings if approved."
        title="contribute"
        path="/contribute"
      />
      <h1 className="page-title">Contribute to ChessOpenings</h1>
      <div style={{ textAlign: 'justify' }}>
        <p>
          As an open source project, ChessOpenings.co.uk relies on community contributions to add great content to the
          site. If you know an opening/variation that has not been added yet, you can submit it below and it will be
          reviewed to be added to the site. If you feel an opening needs to be corrected, you can submit an alteration
          request below too by selecting &apos;Opening Alteration&apos; in the Contribution Type dropdown.
        </p>
        <p>
          Want to contribute to the site itself?{' '}
          <a
            className="link"
            href="https://github.com/Clariity/ChessOpenings"
            target="_blank"
            rel="noopener noreferrer"
          >
            Make a Pull Request on the GitHub Repo.
          </a>
        </p>

        <h2>Submission Form</h2>
        <p>
          Adding content has been made easy with the use of a contribution form. Simply make the moves you wish to
          submit on the board below and they will be automatically recorded in the correct format for you. Then complete
          the rest of the form and submit your contribution to be reviewed.
        </p>
        <h2>Submission Criteria</h2>
        <p>The following criteria must be met for an opening to be accepted:</p>
        <ol>
          <li>
            The opening must be equal for both Black and White. If you know an opening where you gain an advantage when
            the opponent makes a mistake, submit it as a trap.
          </li>
          <br />
          <li>
            The opening should be around 7-10 moves deep at least. There have been a lot of submissions that are great
            openings but were unfortunately too short.
          </li>
        </ol>
      </div>

      <h2>Submission Board - (Drag to Move Pieces)</h2>
      <div className="chessboard-header">
        <ChessboardProvider>
          <Chessboard id="contributeChessboard" />
          <SubmissionForm setResult={setResult} setShowResultModal={setShowResultModal} />
        </ChessboardProvider>
      </div>

      <div className="flex-column">
        <h1>Top Contributors</h1>
        <p>Coming Soon...</p>
      </div>

      {showResultModal && <ResultModal setShowResultModal={setShowResultModal} result={result} />}
    </div>
  );
}
