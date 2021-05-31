import { useEffect } from 'react';

import Cookies from 'js-cookie';

import firebase from '../../../firebaseConfig';
import SEO from '../../../components/SEO';
import SubmissionCard from '../../../components/submissions/SubmissionCard';
import { ActionType, useStoreContext } from '../../../components/Store';

export default function Submissions({ token }) {
  const { dispatch, state } = useStoreContext();

  useEffect(async () => {
    if (!state.submissions) {
      const response = await fetch('/api/submissions');
      const submissions = await response.json();
      if (response.status === 200) {
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

  if (token) {
    Cookies.set('adminToken', JSON.stringify(token), { expires: 1 });
  }

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
  const { pw, ct } = ctx.req.__NEXT_INIT_QUERY;
  const adminToken = ctx.req.cookies?.adminToken;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const ip = ctx.req.headers['x-forwarded-for'] || ctx.req.connection.remoteAddress;
  const redirect = {
    redirect: {
      permanent: false,
      destination: '/admin/login'
    }
  };

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

  // verify captcha
  if (!ct) {
    return redirect;
  }
  let captchaVerified = false;
  try {
    const verified = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `secret=${secretKey}&response=${ct}&remoteip=${ip}`
    });
    const verifiedJSON = await verified.json();
    captchaVerified = verifiedJSON.success;
  } catch (error) {
    return redirect;
  }

  // verify password and create token
  if (pw === process.env.ADMIN_SECRET_KEY && captchaVerified) {
    const date = new Date();
    const expires = date.setDate(date.getDate() + 1);
    try {
      const docRef = await firebase.collection('tokens').add({
        expires
      });
      return {
        props: {
          token: {
            id: docRef.id,
            expires
          }
        }
      };
    } catch (error) {
      console.log(error);
      return redirect;
    }
  }

  return redirect;
}
