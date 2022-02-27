import { storage } from '../../../firebaseAdmin';

export default async (req, res) => {
  const { uid } = req.query;
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

  try {
    const doc = await storage.collection('users').doc(uid).get();

    if (doc.exists) {
      statusCode = 200;
      responseBody = { title: 'Success', body: doc.data() };
    } else {
      statusCode = 404;
      responseBody = { error: 'Not Found: User with this UID not found.' };
    }
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
