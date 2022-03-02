import { PGN } from '../utils/PGN';

export function SubmissionData({ description, history, label, opening, submission }) {
  function getDate() {
    const date = new Date(submission.timestamp?._seconds * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <>
      <h2 className="text-center text-theme text-xl mt-4">Submission Data</h2>
      <div className="pb-4">{label || submission.data.label}</div>
      <PGN opening={opening} history={history} />
      <div className="pt-4">{description || submission.data.description}</div>

      <h2 className="text-center text-theme text-xl mt-4">Submission Details</h2>
      <div className="pt-4">Submission Type: {submission.type}</div>
      <div className="pt-4">Submitted by: {submission.contributorDisplayName}</div>
      <div className="pt-4">Submitted on: {getDate()}</div>
      <div className="pt-4">
        Admin Comments:
        {submission.comments.length === 0 && ' No comments'}
        {submission.comments.map((c, i) => (
          <p key={i}>
            &quot;<i>{c}</i>&quot;
          </p>
        ))}
      </div>
    </>
  );
}
