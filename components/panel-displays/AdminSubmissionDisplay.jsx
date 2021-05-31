import { useState } from 'react';

import Badge from '../utils/Badge';
import Button from '../utils/Button';
import Input from '../utils/Input';

export default function AdminSubmissionDisplay({ history, opening, submission }) {
  console.log(submission);
  const [label, setLabel] = useState(submission.data.label);
  const [description, setDescription] = useState(submission.data.description);
  const [contributor, setContributor] = useState(submission.contributor);
  const [comment, setComment] = useState('');

  function getDate() {
    const date = new Date(submission.timestamp._seconds * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  function handleCommentSubmit() {
    // post comment
    // fetch updated submissions
    console.log(comment);
  }

  function handleMerge() {
    // if opening/trap, make POST to /opening or /trap with new object
    // update submission to MERGED status (adding timestamp for merged action)
    // fetch updated submissions
    console.log(comment);
  }

  function handleClose() {
    // Don't allow Close unless comment exists on submission
    // update submission to CLOSED status (adding timestamp for closed action)
    // fetch updated submissions
    console.log(comment);
  }

  return (
    <>
      <Badge title={submission.status} status={submission.status} />

      <Input id="opening-label" label="Label" value={label} onChange={(e) => setLabel(e.target.value)} />

      <Input
        id="opening-description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Input
        id="opening-contributor"
        label="Contributor"
        value={contributor}
        onChange={(e) => setContributor(e.target.value)}
      />

      <Input id="opening-comment" label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button
        onClick={handleCommentSubmit}
        text="Add Comment"
        customStyles={{ marginBottom: '20px', marginTop: '20px' }}
        disabled={!comment}
      />

      <h2 className="text-align-center completed">Submission Data</h2>
      <div className="pad-20-b font-size-20">{label}</div>
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
      <div className="pad-20-t font-size-20">{description}</div>
      <h2 className="text-align-center completed">Submission Details</h2>
      <div className="pad-20-t font-size-20">Submission Type: {submission.type}</div>
      <div className="pad-20-t font-size-20">Submitted by: {contributor}</div>
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

      <Button onClick={handleMerge} text="Merge" customStyles={{ marginBottom: '20px', marginTop: '40px' }} />
      <Button onClick={handleClose} text="Close" customStyles={{ backgroundColor: 'rgb(255, 60, 60)' }} />
    </>
  );
}
