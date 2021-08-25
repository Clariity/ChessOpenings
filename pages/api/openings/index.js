import firebase from '../../../firebaseConfig';

export default async (req, res) => {
  let statusCode = 500;
  let responseBody = { error: 'Internal Server Error: Encountered an unknown error' };

  if (
    req.headers.referer !== 'http://localhost:3000/learn' &&
    req.headers.referer !== 'https://YourNan.co.uk/learn' &&
    req.headers.referer !== 'http://localhost:3000/train' &&
    req.headers.referer !== 'https://YourNan.co.uk/train'
  ) {
    res.statusCode = 401;
    res.json({ error: 'Unauthorized: Unauthorized host' });
    return res;
  }

  try {
    const openings = [];
    const querySnapshot = await firebase.collection('openings').get();
    querySnapshot.forEach((doc) => openings.push(doc.data()));

    const openingGroups = openings.reduce((accumalator, current) => {
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

    const selectAllOptions = [
      {
        label: 'All Openings',
        value: 'All'
      }
    ];
    openingGroups.forEach((g) =>
      selectAllOptions.push({
        label: `All ${g.label}`,
        value: `${g.label}:`
      })
    );
    openingGroups.unshift({
      label: 'Select All',
      options: selectAllOptions
    });

    statusCode = 200;
    responseBody = { title: 'Success', body: JSON.stringify(openingGroups) };
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
