import { useEffect, useState } from 'react';

import firebase from '../../../firebaseAdmin';
import Button from '../../../components/utils/Button';
import SubmissionCard from '../../../components/submissions/SubmissionCard';
import { SEO } from '../../../components/utils/SEO';
import { useData } from '../../../context/data-context';

export default function Submissions() {
  const { loadingError, submissions, setSubmissions, setLoadingError } = useData();
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 5;
  const lowerLimit = page * PAGE_SIZE;
  const higherLimit = page * PAGE_SIZE + PAGE_SIZE;

  useEffect(() => {
    async function fetchSubmissions() {
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
    if (!submissions) fetchSubmissions();
  }, [submissions, setLoadingError, setSubmissions]);

  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex-column" style={{ maxWidth: '1044px', width: '100%' }}>
      <SEO description="Admin Submissions" title="submissions" path="/admin/submissions" />
      <h1 className="page-title">Submissions</h1>
      {submissions?.map(
        (s, i) =>
          lowerLimit <= i &&
          i < higherLimit && <SubmissionCard index={i + 1 /* submissions.length - i */} key={s.id} submission={s} />
      )}
      <div>
        <Button
          onClick={() => setPage((oldPage) => oldPage - 1)}
          text="Prev Page"
          customStyles={{ marginBottom: '40px', marginTop: '20px' }}
          disabled={page === 0}
        />
        <Button
          onClick={() => setPage((oldPage) => oldPage + 1)}
          text="Next Page"
          customStyles={{ marginBottom: '40px', marginTop: '20px' }}
          disabled={page === Math.floor(submissions?.length / PAGE_SIZE)}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const adminToken = ctx.req.cookies?.adminToken;

  // allow session if token provided and update stored tokens
  if (adminToken) {
    // get all tokens from firebase
    const querySnapshot = await firebase.collection('tokens').get();
    // for each token, if they have expired delete them
    const validTokens = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().expires < Date.now()) {
        firebase.collection('tokens').doc(doc.id).delete();
      } else validTokens.push(doc.id);
    });
    // check if adminToken remains
    if (validTokens.includes(JSON.parse(adminToken).id)) {
      return {
        props: {}
      };
    }
  }

  // if no token or invalid token, redirect to login
  return {
    redirect: {
      permanent: false,
      destination: '/admin/login'
    }
  };
}
