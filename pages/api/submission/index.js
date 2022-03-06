import admin from 'firebase-admin';
import { storage } from '../../../firebaseAdmin';

function getDisplayMessageFromType(type) {
  switch (type) {
    case 'Opening':
      return 'a new Opening';
    case 'Trap':
      return 'a new Opening Trap';
    default:
      return 'an Opening';
  }
}

export default async (req, res) => {
  let statusCode = 500;
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' };
  let captchaVerified = false;

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
    try {
      await storage
        .collection('data')
        .doc('submissions')
        .update({
          data: admin.firestore.FieldValue.arrayUnion(
            ...[
              {
                ...JSON.parse(req.body),
                timestamp: admin.firestore.Timestamp.now()
              }
            ]
          )
        });
    } catch (error) {
      res.statusCode = 500;
      res.json({ error: `Internal Server Error: Error updating Firestore. ${error.message}` });
      return res;
    }

    let contributorDisplayName = JSON.parse(req.body).contributorDisplayName;

    try {
      const discordURL = req.headers.referer.includes('http://localhost:3000')
        ? process.env.DISCORD_DEV_WEBHOOK_URL
        : process.env.DISCORD_WEBHOOK_URL;

      await fetch(discordURL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          username: 'Submissions Bot',
          avatar_url: 'https://chessopenings.co.uk/media/images/logo.png',
          content: `${contributorDisplayName} submitted ${getDisplayMessageFromType(JSON.parse(req.body).type)}`,
          embeds: [
            {
              title: 'Chess Openings Submission',
              thumbnail: {
                url: 'https://chessopenings.co.uk/media/images/seo.png'
              },
              url: `https://chessopenings.co.uk/submissions/${JSON.parse(req.body).id}`,
              fields: [
                {
                  name: 'Opening Name',
                  value: JSON.parse(req.body).data.label,
                  inline: true
                }
              ]
            }
          ]
        })
      });
      statusCode = 200;
      responseBody = { title: 'Success' };
    } catch (error) {
      statusCode = 500;
      responseBody = { error: `Internal Server Error: Error pinging Discord. ${error}` };
    }
  } else {
    statusCode = 401;
    responseBody = { error: 'Unauthorized: Unsuccessful ReCAPTCHA verification.' };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
