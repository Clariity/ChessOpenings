import { useState } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { useData } from '../../context/data-context';
import { Badge } from '../utils/Badge';
import { Button, WarningButton } from '../utils/Button';
import { Input } from '../utils/Input';
import { SubmissionData } from './SubmissionData';

export function AdminSubmissionDisplay({ history, opening, submission }) {
  const { setSubmissions, submissions, user } = useData();
  const [comment, setComment] = useState('');
  const [description, setDescription] = useState(submission.data.description);
  const [label, setLabel] = useState(submission.data.label);
  const [result, setResult] = useState('');

  async function handleCommentSubmit() {
    try {
      const newSubmission = { ...submission };
      newSubmission.comments = [...submission.comments, comment];
      const newSubmissions = submissions.map((s) => (s.id === newSubmission.id ? newSubmission : s));

      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
      const response = await fetch(`/api/submission`, {
        method: 'PUT',
        body: JSON.stringify(newSubmissions)
      });
      const responseJSON = await response.json();
      if (response?.status !== 200) {
        setResult(responseJSON);
        return;
      } else {
        setSubmissions(newSubmissions);
      }
    } catch (error) {
      setResult(error);
      return;
    }
    setComment('');
  }

  async function handleMerge() {
    try {
      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
      const response = await fetch(`/api/${submission.type.toLowerCase()}`, {
        method: 'POST',
        body: JSON.stringify({
          ...submission.data,
          id: submission.id,
          description,
          label
        })
      });
      const responseJSON = await response.json();
      if (response?.status !== 200) {
        setResult(responseJSON);
        return;
      } else {
        await updateSubmission('MERGED');
        Router.push('/admin/submissions');
      }
    } catch (error) {
      setResult(error);
      return;
    }
  }

  async function handleClose() {
    await updateSubmission('CLOSED');
    Router.push('/admin/submissions');
  }

  async function updateSubmission(status) {
    try {
      const newSubmission = { ...submission };
      newSubmission.status = status;
      newSubmission.data = {
        ...submission.data,
        description,
        label
      };

      const newSubmissions = submissions.map((s) => (s.id === newSubmission.id ? newSubmission : s));

      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
      const response = await fetch(`/api/submission`, {
        method: 'PUT',
        body: JSON.stringify(newSubmissions)
      });
      const responseJSON = await response.json();
      if (response?.status !== 200) {
        setResult(responseJSON);
        return;
      } else {
        setSubmissions(newSubmissions);
      }
    } catch (error) {
      setResult(error);
      return;
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
