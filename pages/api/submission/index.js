import admin from 'firebase-admin';
import firebase from '../../../firebaseConfig';

export default async (req, res) => {
  let statusCode = 500;
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' };
  let captchaVerified = false;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const captchaToken = req.headers.authorization;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (
    req.headers.referer !== 'http://localhost:3000/contribute' &&
    req.headers.referer !== 'https://YourNan.co.uk/contribute'
  ) {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized: Unauthorized host' });
    return res;
  }

  if (!captchaToken) {
    res.statusCode = 401;
    res.json({ error: 'Bad Request: No ReCAPTCHA token provided' });
    return res;
  }

  try {
    const verified = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: `secret=${secretKey}&response=${captchaToken}&remoteip=${ip}`
    });
    const verifiedJSON = await verified.json();
    captchaVerified = verifiedJSON.success;
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: `Internal Server Error: Error in Google Siteverify API. ${error.message}` });
    return res;
  }

  if (captchaVerified) {
    try {
      await firebase
        .collection('submissions')
        .doc(JSON.parse(req.body).id)
        .set({
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
    responseBody = { error: 'Unauthorized: Unsuccessful ReCAPTCHA verification.' };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
