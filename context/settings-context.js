import React, { useContext, useEffect, useState } from 'react';

export const SettingsContext = React.createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [animationsOn, setAnimationsOn] = useState();
  const [moveMethod, setMoveMethod] = useState();
  const [theme, setTheme] = useState();

  // initialise
  useEffect(() => {
    setAnimationsOn(
      (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('animationsOn'))) || {
        label: 'On',
        value: true
      }
    );
    setMoveMethod(
      (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('moveMethod'))) || {
        label: 'Drag and Drop',
        value: 'drag'
      }
    );
    setTheme(
      (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('theme'))) || {
        label: 'Lichess',
        value: 'lichess'
      }
    );
  }, []);

  function updateAnimationsOn(newAnimationsOn) {
    setAnimationsOn(newAnimationsOn);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('animationsOn', JSON.stringify(newAnimationsOn));
    }
  }

  function updateMoveMethod(newMoveMethod) {
    setMoveMethod(newMoveMethod);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('moveMethod', JSON.stringify(newMoveMethod));
    }
  }

  function updateTheme(newTheme) {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', JSON.stringify(newTheme));
    }
  }

  return (
    <SettingsContext.Provider
      value={{
        animationsOn,
        moveMethod,
        theme,
        updateAnimationsOn,
        updateMoveMethod,
        updateTheme
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
