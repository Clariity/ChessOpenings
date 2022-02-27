import admin from 'firebase-admin';

import { auth, storage } from '../../../firebaseAdmin';

export default async (req, res) => {
  const { id } = req.query;
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

  if (req.method === 'PUT') {
    // check admin token
    const idToken = JSON.parse(req.cookies?.idToken);
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    if (uid !== process.env.ADMIN_UID) {
      res.statusCode = 401;
      res.json({ error: 'Unauthorized: Invalid Token.' });
      return;
    }

    try {
      await storage
        .collection('submissions')
        .doc(id)
        .update({
          ...JSON.parse(req.body),
          updated: admin.firestore.FieldValue.serverTimestamp()
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

  try {
    const doc = await storage.collection('submissions').doc(id).get();

    if (doc.exists) {
      statusCode = 200;
      responseBody = { title: 'Success', body: doc.data() };
    } else {
      statusCode = 404;
      responseBody = { error: 'Not Found: Submission with this ID not found.' };
    }
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
