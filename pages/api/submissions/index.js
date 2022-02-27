import { storage } from '../../../firebaseAdmin';

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

  try {
    const submissions = [];
    const querySnapshot = await storage.collection('submissions').get();
    querySnapshot.forEach((doc) => submissions.push(doc.data()));
    const sortedSubmissions = submissions.sort((a, b) => (a.timestamp._seconds > b.timestamp._seconds ? -1 : 1));
    statusCode = 200;
    responseBody = { title: 'Success', body: sortedSubmissions };
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
