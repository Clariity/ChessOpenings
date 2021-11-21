import admin from 'firebase-admin';
import firebase from '../../../firebaseAdmin';

export default async (req, res) => {
  let statusCode = 500;
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' };

  if (
    !req.headers.referer.includes('http://localhost:3000') &&
    !req.headers.referer.includes('https://chessopenings.co.uk')
  ) {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized: Unauthorized host' });
    return res;
  }

  if (req.method === 'POST') {
    try {
      await firebase.collection('users').doc(JSON.parse(req.body).uid).set({
        achievements: [],
        openings: [],
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });

      statusCode = 200;
      responseBody = { title: 'Success' };
    } catch (error) {
      statusCode = 500;
      responseBody = { error: `Internal Server Error: Error updating Firestore. ${error.message}` };
    }

    res.statusCode = statusCode;
    res.json(responseBody);
    return;
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
