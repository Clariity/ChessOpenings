import firebase from '../../../firebaseConfig';

export default async (req, res) => {
  const { id } = req.query;
  let statusCode = 500;
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' };

  if (
    req.headers.referer !== `http://localhost:3000/submission/${id}` &&
    req.headers.referer !== `https://chessopenings.co.uk/submission/${id}`
  ) {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized: Unauthorized host' });
    return res;
  }

  try {
    const doc = await firebase.collection('submissions').doc(id).get();

    if (doc.exists) {
      statusCode = 200;
      responseBody = { title: 'Success', body: JSON.stringify(doc.data()) };
    } else {
      statusCode = 404;
      responseBody = { error: 'Not Found: Submission with this ID not found.' };
    }
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
