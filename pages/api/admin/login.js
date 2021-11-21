import firebase from '../../../firebaseAdmin';

export default async (req, res) => {
  let statusCode = 500;
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' };
  let captchaVerified = false;

  const submittedPw = JSON.parse(req.body).pw;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const captchaToken = req.headers.authorization;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (
    !req.headers.referer.includes('http://localhost:3000') &&
    !req.headers.referer.includes('https://chessopenings.co.uk')
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
    // verify password and create token
    if (submittedPw === process.env.ADMIN_SECRET_KEY && captchaVerified) {
      const date = new Date();
      const expires = date.setDate(date.getDate() + 1);
      try {
        const docRef = await firebase.collection('tokens').add({
          expires
        });
        statusCode = 200;
        responseBody = {
          title: 'Success',
          token: {
            id: docRef.id,
            expires
          }
        };
      } catch (error) {
        statusCode = 500;
        responseBody = { error: `Internal Server Error: Error updating Firestore. ${error.message}` };
      }
    } else {
      statusCode = 401;
      responseBody = { error: 'Unauthorized: Invalid Password.' };
    }
  } else {
    statusCode = 401;
    responseBody = { error: 'Unauthorized: Unsuccessful ReCAPTCHA verification.' };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
