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
    const openings = [];
    const querySnapshot = await firebase.collection('openings').get();
    querySnapshot.forEach((doc) => openings.push(doc.data()));

    const openingGroups = openings.reduce((acc, current) => {
      const groupLabel = current.label.split(':')[0];
      const groupIndex = acc.findIndex((group) => group.label === groupLabel);
      if (groupIndex > -1) {
        acc[groupIndex].options.push(current);
      } else {
        acc.push({
          label: groupLabel,
          options: [current]
        });
      }
      return acc;
    }, []);

    const selectAllOptions = [];
    const sortedOpeningGroups = openingGroups
      .map((g) => {
        selectAllOptions.push({
          label: `All ${g.label}`,
          value: `${g.label}:`
        });
        return {
          label: g.label,
          options: g.options.sort((a, b) => (a.label < b.label ? -1 : 1))
        };
      })
      .sort((a, b) => (a.label < b.label ? -1 : 1));

    const sortedSelectAllOptions = selectAllOptions.sort((a, b) => (a.label < b.label ? -1 : 1));
    sortedSelectAllOptions.unshift({
      label: 'All Openings',
      value: 'All'
    });
    sortedOpeningGroups.unshift({
      label: 'Select All',
      options: sortedSelectAllOptions
    });

    statusCode = 200;
    responseBody = { title: 'Success', body: sortedOpeningGroups };
  } catch (error) {
    statusCode = 500;
    responseBody = { error: `Internal Server Error: Error fetching from Firestore. ${error.message}` };
  }

  res.statusCode = statusCode;
  res.json(responseBody);
};
