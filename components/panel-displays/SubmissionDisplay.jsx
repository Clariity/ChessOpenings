import Badge from '../utils/Badge';

export default function SubmissionDisplay({ history, opening, submission }) {
  function getDate() {
    const date = new Date(submission.timestamp._seconds * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <>
      <Badge title={submission.status} status={submission.status} />
      <h2 className="text-align-center completed" style={{ marginTop: '0px' }}>
        {opening.label}
      </h2>
      <div>
        {opening.value.map(
          (move, i) =>
            i % 2 === 0 && (
              <div
                key={i}
                className={`pad-5-tb font-size-20 ${(history.length - 1 === i || history.length === i) && 'current'}`}
              >{`${i / 2 + 1}. ${move.san}, ${opening.value[i + 1] ? opening.value[i + 1].san : ''}`}</div>
            )
        )}
      </div>
      <div className="pad-20-t font-size-20">{opening.description}</div>
      <h2 className="text-align-center completed">Submission Details</h2>
      <div className="pad-20-t font-size-20">Submission Type: {submission.type}</div>
      <div className="pad-20-t font-size-20">Submitted by: {submission.contributor}</div>
      <div className="pad-20-t font-size-20">Submitted on: {getDate()}</div>
      <div className="pad-20-t font-size-20">
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
