import React, { useContext, useState } from 'react';

export const DataContext = React.createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [openings, setOpenings] = useState();
  const [submissions, setSubmissions] = useState();
  const [traps, setTraps] = useState();

  const [loadingError, setLoadingError] = useState();

  return (
    <DataContext.Provider
      value={{
        openings,
        submissions,
        traps,
        setOpenings,
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
