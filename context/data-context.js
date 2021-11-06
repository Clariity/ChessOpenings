import React, { useContext, useEffect, useState } from 'react';

export const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [openingGroups, setOpeningGroups] = useState();
  const [submissions, setSubmissions] = useState();
  const [traps, setTraps] = useState();

  const [loadingError, setLoadingError] = useState();

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
