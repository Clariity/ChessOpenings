import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../functions/hooks';

export const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [animationsOn, setAnimationsOn] = useState();
  const [moveMethod, setMoveMethod] = useState();
  const [soundsOn, setSoundsOn] = useState();
  const [theme, setTheme] = useLocalStorage('theme-mode', null);

  const themes = ['dark', 'light'];

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
    setSoundsOn(
      (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('soundsOn'))) || {
        label: 'On',
        value: true
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

  function updateSoundsOn(newSoundsOn) {
    setSoundsOn(newSoundsOn);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('soundsOn', JSON.stringify(newSoundsOn));
    }
  }

  function updateTheme(newTheme) {
    const root = document.body;
    root.classList.remove(theme);
    root.classList.add(newTheme);
    setTheme(newTheme);
  }

  return (
    <SettingsContext.Provider
      value={{
        animationsOn,
        moveMethod,
        soundsOn,
        theme,
        themes,
        updateAnimationsOn,
        updateMoveMethod,
        updateSoundsOn,
        updateTheme
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
