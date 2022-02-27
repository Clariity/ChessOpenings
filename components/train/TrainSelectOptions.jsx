import Select from 'react-select';

import { colourChoices, formatGroupLabel } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { useWindowSize } from '../../functions/hooks';

export function TrainSelectOptions({ selectedOpenings, setCanRetry, setSelectedOpenings }) {
  const { windowSize } = useWindowSize();
  const { openingGroups } = useData();
  const { setBoardOrientation, reset, setUserColor } = useChessboard();

  function filterOptions({ label, value }, searchInput) {
    const searchLower = searchInput.toLocaleLowerCase();
    // default search
    if (label.toLocaleLowerCase().includes(searchLower)) return true;

    // check if a group has the filter string as label
    const groupOptions = openingGroups.filter((group) => group.label.toLocaleLowerCase().includes(searchLower));

    if (groupOptions) {
      for (const groupOption of groupOptions) {
        // Check if current option is in group
        const option = groupOption.options.find((opt) => opt.value === value);
        if (option) {
          return true;
        }
      }
    }
    return false;
  }

  function handleUserColorChange(change) {
    setUserColor(change.value);
    setBoardOrientation(change.value); // once autoflipping setting is added, can optionally do this or not
    reset();
  }

  function handleTrainOpeningChange(change) {
    setSelectedOpenings(change ? [...change] : []);
    setCanRetry(false);
  }

  return (
    <>
      <h2>Select Openings to Train</h2>
      <div className="panel-select">
        <Select
          closeMenuOnSelect={false}
          value={selectedOpenings}
          filterOption={filterOptions}
          formatGroupLabel={formatGroupLabel}
          isMulti={true}
          isSearchable={windowSize > 850}
          maxMenuHeight={325}
          onChange={handleTrainOpeningChange}
          options={openingGroups}
          placeholder={openingGroups ? 'Select Openings to Train' : 'Loading Openings'}
        />
      </div>
      <h2>Select Colour to Play as</h2>
      <div className="panel-select">
        <Select
          options={colourChoices}
          defaultValue={colourChoices[0]}
          onChange={handleUserColorChange}
          isSearchable={false}
        />
      </div>
    </>
  );
}
