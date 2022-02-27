import { storage } from '../../../../firebaseAdmin';

export default async (req, res) => {
  const { type, limit } = req.query;
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
    const querySnapshot = await storage
      .collection('submissions')
      .where('status', '==', 'MERGED')
      .where('type', '==', type)
      .orderBy('updated', 'desc')
      .limit(parseInt(limit))
      .get();
    querySnapshot.forEach((doc) => submissions.push(doc.data()));

    statusCode = 200;
    responseBody = { title: 'Success', body: submissions };
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
