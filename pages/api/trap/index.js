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

  // check admin token
  const adminToken = req.cookies?.adminToken;
  let tokenVerified = false;

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
      tokenVerified = true;
    }
  }

  if (tokenVerified) {
    try {
      await firebase.collection('traps').add({
        ...JSON.parse(req.body),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      });
      statusCode = 200;
      responseBody = { title: 'Success' };
    } catch (error) {
      statusCode = 500;
      responseBody = { error: `Internal Server Error: Error updating Firestore. ${error.message}` };
    }
  } else {
    statusCode = 401;
    responseBody = { error: 'Unauthorized: Invalid Token.' };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
