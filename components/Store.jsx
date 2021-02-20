import React from 'react';

const ActionType = {
  SET_THEME: 'SET_THEME'
};

const intialState = {
  theme: (typeof window !== 'undefined' && JSON.parse(window.localStorage.getItem('theme'))) || {
    label: 'Lichess',
    value: 'lichess'
  }
};

const StoreContext = React.createContext(intialState);
const useStoreContext = () => React.useContext(StoreContext);

const StateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case ActionType.SET_THEME:
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('theme', JSON.stringify(action.payload));
        }
        return { ...state, theme: action.payload };
      default:
        throw new Error(`Unhandled ActionType ${action.type}`);
    }
  }, intialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { StoreContext, useStoreContext, StateProvider, ActionType };
