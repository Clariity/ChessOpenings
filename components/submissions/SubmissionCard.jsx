export default function SubmissionCard({ submission }) {
  console.log(submission);
  return <div>{submission.data.label}</div>;
}
