import firebase from '../../../firebaseConfig';
import { sortOpeningsIntoGroups } from '../../../functions/helpers';

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
    const openings = [];
    const querySnapshot = await firebase.collection('openings').get();
    querySnapshot.forEach((doc) => {
      const opening = doc.data();
      openings.push({ ...opening, id: doc.id });
    });

    const openingGroups = sortOpeningsIntoGroups(openings);

    statusCode = 200;
    responseBody = { title: 'Success', body: openingGroups };
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
