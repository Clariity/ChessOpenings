import { auth, storage } from '../../../firebaseAdmin';

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
      .collection('data')
      .doc('submissions')
      .update({
        data: JSON.parse(req.body)
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
};
