import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import AdminSubmissionDisplay from '../displays/AdminSubmissionDisplay';
import SubmissionDisplay from '../displays/SubmissionDisplay';
import { BoardControls } from './BoardControls';
import { useChessboard } from '../../context/board-context';

export function SubmissionSidePanel() {
  const { game, opening, setOpening } = useChessboard();
  const {
    pathname,
    query: { id }
  } = useRouter();

  const [submission, setSubmission] = useState();
  const [submissionNotFound, setSubmissionNotFound] = useState(false);
  const isAdmin = pathname.includes('/admin/');

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const response = await fetch(`/api/submission/${id}`);
        const submission = await response.json();
        if (response?.status === 200) {
          setOpening(submission.body.data);
          setSubmission(submission.body);
        } else setSubmissionNotFound(true);
      } catch (error) {
        setSubmissionNotFound(true);
      }
    }
    if (id) fetchSubmission();
  }, [id, setOpening]);

  return (
    <div className="panel">
      <div className="panel-title">
        <h1 className="panel-title-text">Submission</h1>
      </div>
      {submissionNotFound ? (
        <div className="panel-body flex-column">
          <div id="panel-scroll-display" className="panel-scroll-display">
            Submission Not Found
          </div>
        </div>
      ) : submission ? (
        <div className="panel-body flex-column">
          <div id="panel-scroll-display" className="panel-scroll-display">
            {isAdmin ? (
              <AdminSubmissionDisplay
                history={game?.history({ verbose: true })}
                opening={opening}
                submission={submission}
              />
            ) : (
              <SubmissionDisplay history={game?.history({ verbose: true })} opening={opening} submission={submission} />
            )}
          </div>
        </div>
      ) : (
        'Loading'
      )}
      <BoardControls resetDisabled={false} />
    </div>
  );
}
