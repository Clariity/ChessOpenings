import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { AdminSubmissionDisplay } from './AdminSubmissionDisplay';
import { SidePanel } from '../chessboard/SidePanel';
import { SubmissionDisplay } from './SubmissionDisplay';

export function SubmissionSidePanel() {
  const { game, opening, setOpening } = useChessboard();
  const { submissions } = useData();
  const {
    pathname,
    query: { id }
  } = useRouter();

  const [submission, setSubmission] = useState();
  const [submissionNotFound, setSubmissionNotFound] = useState(false);
  const isAdmin = pathname.includes('/admin/');

  useEffect(() => {
    if (submissions) {
      const newSubmission = submissions?.find((s) => s.id === id);
      if (newSubmission) {
        setOpening(newSubmission.data);
        setSubmission(newSubmission);
      } else setSubmissionNotFound(true);
    }
  }, [id, setOpening, submissions]);

  return (
    <SidePanel title="Submission">
      {submissionNotFound ? (
        <div className="text-center">Submission Not Found</div>
      ) : submission ? (
        <div className="flex flex-col">
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
      ) : (
        'Loading'
      )}
    </SidePanel>
  );
}
