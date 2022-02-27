import Select from 'react-select';

import { animationChoices, themeChoices } from '../../data/consts';
import { useSettings } from '../../context/settings-context';
import { Modal } from '../utils/Modal';
import { Radio } from '../utils/Radio';

export function SettingsModal({ setShowSettingsModal }) {
  const { animationsOn, theme, updateAnimationsOn, updateTheme } = useSettings();

  return (
    <Modal title="Settings" onClose={() => setShowSettingsModal(false)}>
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="theme-select">
          Theme (Chessboard and Sounds):
        </label>
        <div className="panel-select">
          <Select id="theme-select" options={themeChoices} value={theme} onChange={updateTheme} isSearchable={false} />
        </div>

        <p className="mb-2">Animations:</p>
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
