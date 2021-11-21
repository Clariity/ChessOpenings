import React, { useContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';

export const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [openingGroups, setOpeningGroups] = useState();
  const [submissions, setSubmissions] = useState();
  const [traps, setTraps] = useState();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();

  const [loadingError, setLoadingError] = useState();

  useEffect(() => {
    async function createNewUserData(uid) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ uid })
      });
      const resJson = await response.json();
      if (!response?.ok) {
        setLoadingError(resJson.error);
      }
    }

    async function fetchUserData(uid) {
      const response = await fetch(`/api/users/${uid}`);
      const resJson = await response.json();
      if (response?.status === 200) {
        setUserData(resJson.body);
      } else if (response?.status === 404) {
        createNewUserData(uid);
      } else {
        setLoadingError(resJson.error);
      }
    }

    onAuthStateChanged(auth, (u) => {
      if (u) {
        Cookies.set('uid', JSON.stringify(u.uid), { expires: 1 });
        setUser(u);
        fetchUserData(u.uid);
      } else {
        Cookies.remove('uid');
        setUser(null);
        setUserData(null);
      }
    });
  }, []);

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

  return (
    <DataContext.Provider
      value={{
        openingGroups,
        submissions,
        traps,
        user,
        userData,
        setOpeningGroups,
        setSubmissions,
        setTraps,

        loadingError,
        setLoadingError
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
