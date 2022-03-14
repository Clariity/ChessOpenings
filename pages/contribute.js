import { useState } from 'react';

import { contributeOutlined } from '../data/icons';
import { Chessboard } from '../components/chessboard/Chessboard';
import { ChessboardProvider } from '../context/board-context';
import { Header } from '../components/utils/Header';
import { ResultModal } from '../components/modals/ResultModal';
import { SubmissionForm } from '../components/submission/SubmissionForm';
import { SEO } from '../components/utils/SEO';

export default function Contribute() {
  const [showResultModal, setShowResultModal] = useState();
  const [result, setResult] = useState();

  return (
    <div className="container flex flex-col">
      <SEO
        description="Contribute your opening knowledge and help other ChessOpenings users to learn valuable openings. With a move recording tool and an easy to fill out form, it's very simple to submit your openings. Once reviewed by a site admin it will then be added to the list of openings if approved."
        title="contribute"
        path="/contribute"
      />
      <Header icon={contributeOutlined} heading="Contribute to ChessOpenings" />

      <p className="mb-4">
        As an open source project, ChessOpenings.co.uk relies on community contributions to add great content to the
        site. If you know an opening/variation that has not been added yet, you can submit it below and it will be
        reviewed to be added to the site. If you feel an opening needs to be corrected, you can submit an alteration
        request below too by selecting &apos;Opening Alteration&apos; in the Contribution Type dropdown.
      </p>
      <p className="mb-4">
        The codebase is also open source and welcomes contributions. Want to contribute?{' '}
        <a
          className="underline"
          href="https://github.com/Clariity/ChessOpenings"
          target="_blank"
          rel="noopener noreferrer"
        >
          Make a Pull Request on the GitHub Repo.
        </a>
      </p>

      <h2 className="text-2xl mt-4">Submission Form</h2>
      <p className="mb-4">
        Adding content has been made easy with the use of a contribution form. Simply make the moves you wish to submit
        on the board below and they will be automatically recorded in the correct format for you. Then complete the rest
        of the form and submit your contribution to be reviewed.
      </p>

      <h2 className="text-2xl mt-4">Submission Criteria</h2>
      <p className="mb-4">The following criteria must be met for an opening to be accepted:</p>
      <ol className="list-decimal list-inside mb-4">
        <li className="ml-4">
          The opening must be equal in terms of advantage for both Black and White. If you know an opening where you
          gain an advantage when the opponent makes a mistake, submit it as a trap.
        </li>
        <br />
        <li className="ml-4">
          The opening should be at least 7 moves deep. An ideal length is 10-14 moves. There have been a lot of
          submissions that are great openings but were unfortunately too short.
        </li>
      </ol>

      <div className="flex flex-col items-center">
        <div className="w-full">
          <ChessboardProvider>
            <div className="flex flex-col mb-8 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <h2 id="board" className="text-2xl mt-4 mb-2 w-full">
                  Submission Board - (Drag to Move Pieces)
                </h2>
                <Chessboard id="contributeChessboard" />
              </div>

              <div className="w-full xl:w-1/2 xl:pl-4 xl:mt-10">
                <SubmissionForm setResult={setResult} setShowResultModal={setShowResultModal} />
              </div>
            </div>
          </ChessboardProvider>
        </div>
      </div>

      {showResultModal && <ResultModal setShowResultModal={setShowResultModal} result={result} />}
    </div>
  );
}
