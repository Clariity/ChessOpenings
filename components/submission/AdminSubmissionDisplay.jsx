import { useState } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { useData } from '../../context/data-context';
import { Badge } from '../utils/Badge';
import { Button, WarningButton } from '../utils/Button';
import { Input } from '../utils/Input';
import { SubmissionData } from './SubmissionData';

export function AdminSubmissionDisplay({ history, opening, submission }) {
  const { setSubmissions, setLoadingError, user } = useData();
  const [comment, setComment] = useState('');
  const [description, setDescription] = useState(submission.data.description);
  const [label, setLabel] = useState(submission.data.label);
  const [result, setResult] = useState('');

  async function handleCommentSubmit() {
    try {
      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
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
      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
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
    await updateSubmission('MERGED');
    await fetchUpdatedSubmissions();
    Router.push('/admin/submissions');
  }

  async function handleClose() {
    await updateSubmission('CLOSED');
    await fetchUpdatedSubmissions();
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

      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
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
        setSubmissions(submissions.body);
      } else {
        setLoadingError(submissions.error);
      }
    } catch (error) {
      setLoadingError(error);
    }
  }

  return (
    <>
      {result && <p>{result}</p>}

      <div className="mx-auto">
        <Badge title={submission.status} status={submission.status} />
      </div>

      <Input id="label-input" label="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
      <Input
        id="description-input"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input id="comment-input" label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />

      <Button onClick={handleCommentSubmit} disabled={!comment}>
        Add Comment
      </Button>

      <SubmissionData
        description={description}
        history={history}
        label={label}
        opening={opening}
        submission={submission}
      />

      <div className="my-4">
        <Button
          fill
          onClick={handleMerge}
          disabled={submission.type.includes('Alteration') || submission.status === 'MERGED'}
        >
          Merge
        </Button>
      </div>
      <div className="mb-2">
        <WarningButton
          fill
          onClick={handleClose}
          disabled={submission.comments.length === 0 || submission.status === 'CLOSED'}
        >
          Close
        </WarningButton>
      </div>
    </>
  );
}
