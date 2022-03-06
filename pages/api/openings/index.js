import { sortOpeningsIntoGroups } from '../../../functions/helpers';
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
    const doc = await storage.collection('data').doc('openings').get();

    if (doc.exists) {
      const openingGroups = sortOpeningsIntoGroups(doc.data().data);
      statusCode = 200;
      responseBody = { title: 'Success', body: openingGroups };
    } else {
      statusCode = 404;
      responseBody = { error: 'Not Found: Cannot find openings in Firestore.' };
    }
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
