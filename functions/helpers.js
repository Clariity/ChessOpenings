import { OPENING_GRADES } from '../data/consts';

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

export function handleAuthErrorMessage(code, setter) {
  switch (code) {
    case 'auth/invalid-email':
      setter('Invalid Email');
      break;
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      setter('Incorrect email or password');
      break;
    case 'auth/email-already-exists':
    case 'auth/email-already-in-use':
      setter('An account already exists with this email address');
      break;
    case 'auth/invalid-password':
    case 'auth/weak-password':
      setter('Password must be a string with at least six characters');
      break;
    case 'auth/expired-action-code':
      setter('Action code from email has expired. Please get a new link and try again');
      break;
    case 'auth/invalid-action-code':
      setter('Invalid code supplied');
      break;
    default:
      setter(code);
  }
}

export function getGradeData(successes) {
  let gradeAchievedIndex = 0;
  let distanceToNextGrade = 0;
  const successThresholds = Object.values(OPENING_GRADES);

  for (let i = 0; i < successThresholds.length; i++) {
    if (successes >= successThresholds[i]) {
      gradeAchievedIndex = i;
    } else {
      distanceToNextGrade = successThresholds[i] - successes;
      break;
    }
  }

  return { gradeAchievedIndex, distanceToNextGrade };
}

export function scrollIntoView(parent, child, scrollToTop) {
  const parentRect = parent.getBoundingClientRect();
  const parentViewableArea = {
    height: parent.clientHeight,
    width: parent.clientWidth
  };
  const childRect = child.getBoundingClientRect();
  const scrollTop = childRect.top - parentRect.top;
  const scrollBot = childRect.bottom - parentRect.bottom;

  if (scrollToTop) {
    parent.scrollTo({ top: parent.scrollTop + scrollTop - 34, behavior: 'smooth' });
    return;
  }

  if (Math.abs(scrollTop) < Math.abs(scrollBot)) {
    parent.scrollTo({ top: parent.scrollTop + (scrollTop - parentViewableArea.height / 2), behavior: 'smooth' });
  } else {
    parent.scrollTo({ top: parent.scrollTop + (scrollBot + parentViewableArea.height / 2), behavior: 'smooth' });
  }
}
