import { createContext, useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';

export const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [openingGroups, setOpeningGroups] = useState();
  const [submissions, setSubmissions] = useState();
  const [traps, setTraps] = useState();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [contributorData, setContributorData] = useState();

  const [canCreateNewUserData, setCanCreateNewUserData] = useState();
  const [tempDisplayName, setTempDisplayName] = useState();

  const [loadingError, setLoadingError] = useState();

  useEffect(() => {
    async function createNewUserData(u) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          ...u,
          displayName: u.displayName || tempDisplayName || 'User'
        })
      });
      const resJson = await response.json();
      if (!response?.ok) {
        setLoadingError(resJson.error);
      }
      if (response?.status === 200) {
        setUserData(resJson.body);
      }
      setCanCreateNewUserData(null);
      setTempDisplayName('');
    }
    if (canCreateNewUserData) createNewUserData(canCreateNewUserData);
  }, [canCreateNewUserData, tempDisplayName]);

  useEffect(() => {
    async function fetchUserData(u) {
      const response = await fetch(`/api/user/${u.uid}`);
      const resJson = await response.json();
      if (response?.status === 200) {
        const { noOfDaysLoggedIn, noOfSuccessiveDaysLoggedIn, mostNoOfSuccessiveDaysLoggedIn } = resJson.body.stats;
        const fullDaysSinceEpoch = Math.floor(Date.now() / 8.64e7);
        const lastDayLoggedIn = resJson.body.lastDayLoggedIn;
        const newDay = fullDaysSinceEpoch !== lastDayLoggedIn;
        const successiveLogIn = fullDaysSinceEpoch - lastDayLoggedIn === 1 && newDay;
        const newSuccessiveLogInRecord =
          successiveLogIn && noOfSuccessiveDaysLoggedIn + 1 > mostNoOfSuccessiveDaysLoggedIn;

        const updatedUserData = {
          ...resJson.body,
          lastDayLoggedIn: fullDaysSinceEpoch,
          stats: {
            ...resJson.body.stats,
            noOfDaysLoggedIn: newDay ? noOfDaysLoggedIn + 1 : noOfDaysLoggedIn,
            noOfSuccessiveDaysLoggedIn: successiveLogIn ? noOfSuccessiveDaysLoggedIn + 1 : noOfSuccessiveDaysLoggedIn,
            mostNoOfSuccessiveDaysLoggedIn: newSuccessiveLogInRecord
              ? mostNoOfSuccessiveDaysLoggedIn + 1
              : mostNoOfSuccessiveDaysLoggedIn
          }
        };
        updateUserData(updatedUserData, u);
      } else if (response?.status === 404) {
        setCanCreateNewUserData(u);
      } else {
        setLoadingError(resJson.error);
      }
    }

    onAuthStateChanged(auth, async (u) => {
      if (u) {
        const token = await u.getIdToken();
        Cookies.set('idToken', JSON.stringify(token));
        setUser(u);
        fetchUserData(u);
      } else {
        Cookies.remove('idToken', { path: '/' });
        setUser(null);
        setUserData(null);
      }
    });
  }, []);

  async function updateUserData(updatedUserObject, user) {
    // TODO: handle achievements here
    try {
      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
      const response = await fetch(`/api/user`, {
        method: 'PUT',
        body: JSON.stringify({
          ...updatedUserObject
        })
      });
      if (response?.ok) {
        setUserData(updatedUserObject);
      } else {
        setLoadingError(
          `Oops, something went wrong updating user statistics. We were unable to update the user. Please try again later.`
        );
      }
    } catch (error) {
      setLoadingError(
        `Oops, something went wrong updating user statistics: ${JSON.stringify(error)}. Please try again later.`
      );
    }
  }

  // load openings
  useEffect(() => {
    async function fetchOpenings() {
      const response = await fetch('/api/openings');
      const resJson = await response.json();
      if (response?.status === 200) {
        setOpeningGroups(resJson.body);
      } else {
        setLoadingError(resJson.error);
      }
    }
    if (!openingGroups) fetchOpenings();
  }, [openingGroups, setOpeningGroups, setLoadingError]);

  // load traps
  useEffect(() => {
    async function fetchTraps() {
      const response = await fetch('/api/traps');
      const resJson = await response.json();
      if (response?.status === 200) {
        setTraps(resJson.body);
      } else {
        setLoadingError(resJson.error);
      }
    }
    if (!traps) fetchTraps();
  }, [traps, setLoadingError, setTraps]);

  // load submissions
  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch('/api/submissions');
        const resJson = await response.json();
        if (response?.status === 200) {
          setSubmissions(resJson.body);
        } else {
          setLoadingError(resJson.error);
        }
      } catch (error) {
        setLoadingError(error);
      }
    }
    if (!submissions) fetchSubmissions();
  }, [submissions, setLoadingError, setSubmissions]);

  // process contributor information
  useEffect(() => {
    async function getNamedContributors() {
      const contributors = submissions
        .filter((s) => s.status === 'MERGED')
        .sort((a, b) => (new Date(a.timestamp._seconds * 1000) > new Date(b.timestamp._seconds * 1000) ? -1 : 1))
        .reduce((acc, current) => {
          acc[current.contributor] = acc[current.contributor]
            ? { displayName: current.contributorDisplayName, data: [...acc[current.contributor].data, current.data] }
            : { displayName: current.contributorDisplayName, data: [current.data] };
          return acc;
        }, {});
      const sortedContributors = contributors
        ? Object.entries(contributors).sort(([, dataA], [, dataB]) => -(dataA.data.length - dataB.data.length))
        : [];

      const newContributorData = [];
      for (const contributorEntries of sortedContributors) {
        const [contributor, { displayName, data }] = contributorEntries;
        newContributorData.push({ displayName: displayName, link: contributor, contributions: data.length });
      }
      setContributorData(newContributorData);
    }
    if (submissions) getNamedContributors();
  }, [submissions]);

  function clearUser() {
    setUser(null);
    setUserData(null);
  }

  return (
    <DataContext.Provider
      value={{
        contributorData,
        openingGroups,
        submissions,
        tempDisplayName,
        traps,
        user,
        userData,
        setOpeningGroups,
        setSubmissions,
        setTempDisplayName,
        setTraps,
        setUser,
        setUserData,

        clearUser,
        loadingError,
        setLoadingError,
        updateUserData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
