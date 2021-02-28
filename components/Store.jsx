import React from 'react';

const ActionType = {
  SET_THEME: 'SET_THEME',
  SET_ANIMATIONS_ON: 'SET_ANIMATIONS_ON'
};

const initialState = {
  theme: (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('theme'))) || {
    label: 'Lichess',
    value: 'lichess'
  },
  animationsOn: (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('animationsOn'))) || {
    label: 'On',
    value: true
  }
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
      default:
        throw new Error(`Unhandled ActionType ${action.type}`);
    }
  }, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { StoreContext, useStoreContext, StateProvider, ActionType };
