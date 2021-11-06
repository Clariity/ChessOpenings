import Select from 'react-select';

import Modal from '../utils/Modal';
import { Radio } from '../utils/Radio';
import { animationChoices, themeChoices } from '../../data/consts';
import { useSettings } from '../../context/settings-context';

export default function SettingsModal({ setShowModal }) {
  const { animationsOn, theme, updateAnimationsOn, updateTheme } = useSettings();

  return (
    <Modal title="Settings" onClose={() => setShowModal(false)}>
      <div className="panel-select">
        <p className="modal-label">Theme (Chessboard and Sounds):</p>
        <Select options={themeChoices} value={theme} onChange={updateTheme} isSearchable={false} />
      </div>
      <div className="panel-select">
        <p className="modal-label">Animations:</p>
        {animationChoices.map((a) => (
          <Radio
            groupName="animations"
            key={a.label}
            id={a.label}
            label={a.label}
            defaultChecked={animationsOn.value === a.value}
            onChange={() => updateAnimationsOn(a)}
          />
        ))}
      </div>
      {/* <div className="panel-select">
        <p className="modal-label">Piece Move Method:</p>
        {moveMethodChoices.map((m) => (
          <Radio
            groupName="moveMethod"
            key={m.value}
            id={m.value}
            label={m.label}
            defaultChecked={moveMethod.value === m.value}
            onChange={() => updateMoveMethod(m)}
          />
        ))}
      </div> */}
    </Modal>
  );
}
