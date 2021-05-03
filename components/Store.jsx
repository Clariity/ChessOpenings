import React from 'react';

const ActionType = {
  SET_THEME: 'SET_THEME',
  SET_ANIMATIONS_ON: 'SET_ANIMATIONS_ON',
  SET_OPENINGS: 'SET_OPENINGS',
  SET_OPENINGS_ERROR: 'SET_OPENINGS_ERROR',
  SET_TRAPS: 'SET_TRAPS',
  SET_TRAPS_ERROR: 'SET_TRAPS_ERROR'
};

const initialState = {
  theme: (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('theme'))) || {
    label: 'Lichess',
    value: 'lichess'
  },
  animationsOn: (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('animationsOn'))) || {
    label: 'On',
    value: true
  },
  openings: null,
  openingsError: null,
  traps: null,
  trapsError: null
};

const StoreContext = React.createContext(initialState);
const useStoreContext = () => React.useContext(StoreContext);

const StateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case ActionType.SET_THEME:
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('theme', JSON.stringify(action.payload));
        }
        return { ...state, theme: action.payload };
      case ActionType.SET_ANIMATIONS_ON:
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('animationsOn', JSON.stringify(action.payload));
        }
        return { ...state, animationsOn: action.payload };
      case ActionType.SET_OPENINGS:
        return { ...state, openings: action.payload, openingsError: null };
      case ActionType.SET_OPENINGS_ERROR:
        return { ...state, openingsError: action.payload };
      case ActionType.SET_TRAPS:
        return { ...state, traps: action.payload };
      case ActionType.SET_TRAPS_ERROR:
        return { ...state, trapsError: action.payload, traps: null };
      default:
        throw new Error(`Unhandled ActionType ${action.type}`);
    }
  }, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { StoreContext, useStoreContext, StateProvider, ActionType };
