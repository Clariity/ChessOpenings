import { useState } from 'react';
import Router from 'next/router';

import Badge from '../utils/Badge';
import Button from '../utils/Button';
import Input from '../utils/Input';
import { useData } from '../../context/data-context';

export default function AdminSubmissionDisplay({ history, opening, submission }) {
  const { setSubmissions, setLoadingError } = useData();

  const [label, setLabel] = useState(submission.data.label);
  const [description, setDescription] = useState(submission.data.description);
  const [contributor, setContributor] = useState(submission.contributor);
  const [comment, setComment] = useState('');
  const [result, setResult] = useState('');

  function getDate() {
    const date = new Date(submission.timestamp?._seconds * 1000);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  async function handleCommentSubmit() {
    try {
      const response = await fetch(`/api/comment/${submission.id}`, {
        method: 'POST',
        body: JSON.stringify(comment)
      });
      const responseJSON = await response.json();
      if (response?.status !== 200) {
        setResult(responseJSON);
        return;
      }
    } catch (error) {
      setResult(error);
      return;
    }

    setComment('');
    fetchUpdatedSubmissions();
  }

  async function handleMerge() {
    try {
      const response = await fetch(`/api/${submission.type.toLowerCase()}`, {
        method: 'POST',
        body: JSON.stringify({
          ...submission.data,
          description,
          label
        })
      });
      const responseJSON = await response.json();
      if (response?.status !== 200) {
        setResult(responseJSON);
        return;
      }
    } catch (error) {
      setResult(error);
      return;
    }
    updateSubmission('MERGED');
    fetchUpdatedSubmissions();
    Router.push('/admin/submissions');
  }

  async function handleClose() {
    updateSubmission('CLOSED');
    fetchUpdatedSubmissions();
    Router.push('/admin/submissions');
  }

  async function updateSubmission(status) {
    try {
      const newSubmission = submission;
      delete newSubmission.timestamp;
      newSubmission.data = {
        ...submission.data,
        description,
        label
      };

      const response = await fetch(`/api/submission/${submission.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...newSubmission,
          status
        })
      });
      const responseJSON = await response.json();
      if (response?.status !== 200) {
        setResult(responseJSON);
        return;
      }
    } catch (error) {
      setResult(error);
      return;
    }
    fetchUpdatedSubmissions();
  }

  async function fetchUpdatedSubmissions() {
    try {
      const response = await fetch('/api/submissions');
      const submissions = await response.json();
      if (response?.status === 200) {
        setSubmissions(JSON.parse(submissions.body));
      } else {
        setLoadingError(JSON.parse(submissions.error));
      }
    } catch (error) {
      setLoadingError(error);
    }
  }

  return (
    <>
      {result && <p>{result}</p>}
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

      <Button
        onClick={handleMerge}
        text="Merge"
        disabled={submission.type.includes('Alteration') || submission.status === 'MERGED'}
        customStyles={{ marginBottom: '20px', marginTop: '40px' }}
      />
      <Button
        onClick={handleClose}
        text="Close"
        disabled={submission.comments.length === 0 || submission.status === 'CLOSED'}
        customStyles={{ backgroundColor: 'rgb(255, 60, 60)' }}
      />
    </>
  );
}
