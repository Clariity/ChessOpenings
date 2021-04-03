export default async (req, res) => {
  let statusCode = 500;
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' };
  let captchaVerified = false;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const captchaToken = req.headers.authorization;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (
    req.headers.referer !== 'http://localhost:3000/contribute' &&
    req.headers.referer !== 'https://chessopenings.co.uk/contribute'
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
    console.log('Verified!', req.body);
    statusCode = 200;
    responseBody = { title: 'Success' };
  } else {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized: Unsuccessful ReCAPTCHA verification.' });
    return res;
  }

  // check if request from IP sent in last 60 seconds, if so then reject and update time for IP to now
  // if not, add IP and time
  // at end, go through all IP's
  // try {
  //   const response = await fetch('https://api.github.com/repos/Clariity/ChessOpenings/issues', {
  //     method: 'POST',
  //     body: JSON.stringify(req.body),
  //     headers: {
  //       'User-Agent': 'ChessOpeningsBot',
  //       Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`
  //     }
  //   });
  //   const responseJSON = await response.json();
  //   if (response.status === 200) {
  //     const data = await responseJSON.url;
  //     status = 200;
  //     responseBody = { title: 'Success', body: data };
  //   } else throw responseJSON;
  // } catch (err) {
  //   console.log(err);
  //   responseBody = { error: err };
  // }

  res.statusCode = statusCode;
  res.json(responseBody);
};
