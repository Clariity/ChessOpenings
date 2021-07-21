import { useEffect } from 'react';

import firebase from '../../../firebaseConfig';
import SEO from '../../../components/SEO';
import SubmissionCard from '../../../components/submissions/SubmissionCard';
import { ActionType, useStoreContext } from '../../../components/Store';

export default function Submissions() {
  const { dispatch, state } = useStoreContext();

  useEffect(async () => {
    if (!state.submissions) {
      const response = await fetch('/api/submissions');
      const submissions = await response.json();
      if (response?.status === 200) {
        dispatch({
          type: ActionType.SET_SUBMISSIONS,
          payload: JSON.parse(submissions.body)
        });
      } else {
        dispatch({
          type: ActionType.SET_SUBMISSIONS_ERROR,
          payload: JSON.parse(submissions.error)
        });
      }
    }
  }, [state.submissions]);

  return (
    <div className="flex-column" style={{ maxWidth: '1044px', width: '100%' }}>
      <SEO description="Admin Submissions" title="submissions" path="/admin/submissions" />
      <h1 className="page-title">Submissions</h1>

      {state.submissions?.map((s) => (
        <SubmissionCard key={s.id} submission={s} />
      ))}
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
