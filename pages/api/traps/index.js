import firebase from '../../../firebaseConfig';

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
    const traps = [];
    const querySnapshot = await firebase.collection('traps').get();
    querySnapshot.forEach((doc) => traps.push(doc.data()));

    const trapGroups = traps.reduce((accumalator, current) => {
      const groupLabel = current.label.split(':')[0];
      const groupIndex = accumalator.findIndex((group) => group.label === groupLabel);
      if (groupIndex > -1) {
        accumalator[groupIndex].options.push(current);
      } else {
        accumalator.push({
          label: groupLabel,
          options: [current]
        });
      }
      return accumalator;
    }, []);

    const sortedTrapGroups = trapGroups
      .map((g) => {
        return {
          label: g.label,
          options: g.options.sort((a, b) => (a.label < b.label ? -1 : 1))
        };
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    statusCode = 200;
    responseBody = {
      title: 'Success',
      body: sortedTrapGroups
    };
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
