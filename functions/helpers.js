export function sortOpeningsIntoGroups(openings) {
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

  const sortedOpeningGroups = openingGroups
    .map((g) => {
      return {
        label: g.label,
        options: g.options.sort((a, b) => (a.label < b.label ? -1 : 1))
      };
    })
    .sort((a, b) => (a.label < b.label ? -1 : 1));

  return sortedOpeningGroups;
}

export function prependSelectAllGroup(openingGroups) {
  const selectAllOptions = [];
  openingGroups.forEach((g) => {
    selectAllOptions.push({
      label: `All ${g.label}`,
      value: `${g.label}:`
    });
  });
  const sortedSelectAllOptions = selectAllOptions.sort((a, b) => (a.label < b.label ? -1 : 1));

  sortedSelectAllOptions.unshift({
    label: 'All Openings',
    value: 'All'
  });
  openingGroups.unshift({
    label: 'Select All',
    options: sortedSelectAllOptions
  });

  return openingGroups;
}
