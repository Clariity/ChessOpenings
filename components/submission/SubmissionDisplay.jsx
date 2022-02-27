import { Badge } from '../utils/Badge';
import { SubmissionData } from './SubmissionData';

export function SubmissionDisplay({ history, opening, submission }) {
  return (
    <>
      <div className="mx-auto">
        <Badge title={submission.status} status={submission.status} />
      </div>
      <SubmissionData history={history} opening={opening} submission={submission} />
    </>
  );
}
