import React from 'react';

const ActionType = {
  SET_THEME: 'SET_THEME',
  SET_ANIMATIONS_ON: 'SET_ANIMATIONS_ON',
  SET_SUBMISSIONS: 'SET_SUBMISSIONS'
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
  submissions: [
    {
      id: 'd63828ac-931b-4eb4-9154-17037f48be6f',
      status: 'OPEN',
      type: 'Opening',
      comments: [],
      contributor: 'anonymous contributor',
      data: {
        label: 'a: a',
        description: 'a',
        value: [
          { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
          { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
          { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
          { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
          { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
          { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
          { color: 'w', from: 'f3', to: 'g5', flags: 'n', piece: 'n', san: 'Ng5' },
          { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
          { color: 'w', from: 'g5', to: 'f7', flags: 'c', piece: 'n', captured: 'p', san: 'Nxf7' },
          { color: 'b', from: 'c5', to: 'f2', flags: 'c', piece: 'b', captured: 'p', san: 'Bxf2+' },
          { color: 'w', from: 'e1', to: 'f1', flags: 'n', piece: 'k', san: 'Kf1' },
          { color: 'b', from: 'd7', to: 'd5', flags: 'b', piece: 'p', san: 'd5' },
          { color: 'w', from: 'e4', to: 'd5', flags: 'c', piece: 'p', captured: 'p', san: 'exd5' },
          { color: 'b', from: 'e8', to: 'f7', flags: 'c', piece: 'k', captured: 'n', san: 'Kxf7' }
        ]
      }
    }
  ]
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
      case ActionType.SET_SUBMISSIONS:
        return { ...state, submissions: action.payload };
      default:
        throw new Error(`Unhandled ActionType ${action.type}`);
    }
  }, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export { StoreContext, useStoreContext, StateProvider, ActionType };
