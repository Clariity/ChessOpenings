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
    const doc = await storage.collection('data').doc('submissions').get();

    if (doc.exists) {
      const sortedSubmissions = doc.data().data.sort((a, b) => (a.timestamp._seconds > b.timestamp._seconds ? -1 : 1));
      statusCode = 200;
      responseBody = { title: 'Success', body: sortedSubmissions };
    } else {
      statusCode = 404;
      responseBody = { error: 'Not Found: Cannot find submissions in Firestore.' };
    }
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
