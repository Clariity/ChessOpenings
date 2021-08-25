import admin from 'firebase-admin';
import firebase from '../../../firebaseConfig';

export default async (req, res) => {
  let statusCode = 500;
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' };

  const secretKey = process.env.API_SECRET_KEY;
  const password = req.headers.authorization;
  const passwordVerified = password === secretKey;
  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (
    req.headers.referer !== 'http://localhost:3000/traps' &&
    req.headers.referer !== 'https://YourNan.co.uk/traps'
  ) {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized: Unauthorized host' });
    return res;
  }

  if (passwordVerified) {
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
    responseBody = { error: 'Unauthorized: Invalid Password.' };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
