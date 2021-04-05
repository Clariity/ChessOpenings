import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import BoardControls from '../BoardControls';
import SubmissionDisplay from '../panel-displays/SubmissionDisplay';
import { start } from '../../data/consts';
import { useStoreContext } from '../Store';

// TODO: Make this prettier

export default function SubmissionPanel({
  boardOrientation,
  game,
  goBack,
  goForward,
  navDisabled,
  opening,
  redoStack,
  reset,
  setBoardOrientation,
  setOpening,
  userColor,
  isAdmin = false
}) {
  const router = useRouter();
  const id = router.query.id;
  const { state } = useStoreContext();

  const [submission, setSubmission] = useState();
  const [submissionNotFound, setSubmissionNotFound] = useState(false);

  // Set opening on load with URL query
  useEffect(async () => {
    if (id && state.submissions && !opening) {
      // try to find submission locally first
      const s = state.submissions.find((s) => s.id === id);
      if (s) {
        setOpening(s.data);
        setSubmission(s);
      } else {
        // try to find submission remotely
        try {
          const response = await fetch(`/api/submission/${id}`);
          const submission = await response.json();
          if (response.status === 200) {
            setOpening(JSON.parse(submission.body).data);
            setSubmission(JSON.parse(submission.body));
          } else setSubmissionNotFound(true);
        } catch (error) {
          setSubmissionNotFound(true);
        }
      }
    }
  }, [id, state.submissions]);

  const backDisabled = game?.fen() === start || (game?.history().length === 1 && userColor === 'black') || navDisabled;
  const forwardDisabled = redoStack.length === 0 || navDisabled;

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
            <SubmissionDisplay history={game?.history({ verbose: true })} opening={opening} submission={submission} />
          </div>
          {isAdmin && <div className="flex-row">Buttons go here</div>}
        </div>
      ) : (
        'Loading'
      )}
      <BoardControls
        backDisabled={backDisabled}
        boardOrientation={boardOrientation}
        forwardDisabled={forwardDisabled}
        goBack={goBack}
        goForward={goForward}
        reset={reset}
        resetDisabled={true}
        setBoardOrientation={setBoardOrientation}
      />
    </div>
  );
}
