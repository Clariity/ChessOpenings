import Select from 'react-select';

import { useSettings } from '../../context/settings-context';
import { Modal } from '../utils/Modal';
import { Radio } from '../utils/Radio';

export function SettingsModal({ setShowSettingsModal }) {
  const { animationsOn, theme, themes, updateAnimationsOn, updateTheme } = useSettings();

  const animationChoices = [
    {
      label: 'On',
      value: true
    },
    {
      label: 'Off',
      value: false
    }
  ];

  const currentTheme = {
    label: theme,
    value: theme
  };
  const themeChoices = themes.map((t) => ({
    label: t,
    value: t
  }));

  return (
    <Modal title="Settings" onClose={() => setShowSettingsModal(false)}>
      <div className="flex flex-col">
        <label className="mb-2" htmlFor="theme-select">
          Site Theme:
        </label>
        <div className="panel-select">
          <Select
            id="theme-select"
            options={themeChoices}
            value={currentTheme}
            onChange={(newTheme) => updateTheme(newTheme.value)}
            isSearchable={false}
          />
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
