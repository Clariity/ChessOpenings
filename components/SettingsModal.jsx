import React from 'react';

import Select from 'react-select';

import { themeChoices } from '../data/consts';
import { ActionType, useStoreContext } from './Store';

export default function SettingsModal({ showModal, setShowModal }) {
  const { state, dispatch } = useStoreContext();

  function handleThemeChange(theme) {
    dispatch({
      type: ActionType.SET_THEME,
      payload: theme
    });
  }

  return (
    <div className={`settings-modal ${!showModal && 'fade'}`}>
      <div className="modal-header">
        <div className="modal-header-box" />
        <h1 className="panel-title-text modal-title">Settings</h1>
        <div className="modal-header-box">
          <button className="material-icons panel-board-control-button" onClick={() => setShowModal(false)}>
            clear
          </button>
        </div>
      </div>
      <div className="modal-content">
        <div className="panel-select">
          <p className="modal-label">Theme (Chessboard and Sounds):</p>
          <Select options={themeChoices} value={state.theme} onChange={handleThemeChange} />
        </div>
      </div>
    </div>
  );
}
