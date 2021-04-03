import React from 'react';

import Select from 'react-select';

import { animationChoices, themeChoices } from '../../data/consts';
import { ActionType, useStoreContext } from '../Store';
import Modal from '../utils/Modal';

export default function SettingsModal({ showModal, setShowModal }) {
  const { state, dispatch } = useStoreContext();

  function handleAnimationsOnChange(value) {
    dispatch({
      type: ActionType.SET_ANIMATIONS_ON,
      payload: value
    });
  }

  function handleThemeChange(theme) {
    dispatch({
      type: ActionType.SET_THEME,
      payload: theme
    });
  }

  return (
    <Modal title="Settings" onClose={() => setShowModal(false)} visible={showModal}>
      <div className="panel-select">
        <p className="modal-label">Animations:</p>
        <Select
          options={animationChoices}
          value={state.animationsOn}
          onChange={handleAnimationsOnChange}
          isSearchable={false}
        />
      </div>
      <div className="panel-select">
        <p className="modal-label">Theme (Chessboard and Sounds):</p>
        <Select options={themeChoices} value={state.theme} onChange={handleThemeChange} isSearchable={false} />
      </div>
    </Modal>
  );
}
