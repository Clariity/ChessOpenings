import React from 'react';
import Select from 'react-select';

import openings from '../data/openings';
import {
  colourChoices,
  formatGroupLabel
} from '../data/selectOptionsAndStyles';

// https://react-select.com/components -> custom option example, on hover show tooltip that contains final opening layout, add final fen into data structure so it can read that
// add default colour to each opening so we can switch to that on opening change
// need to add unique id to each opening

export default function Panel({
  start,
  reset,
  boardOrientation,
  setBoardOrientation,
  redoStack,
  userColor,
  setUserColor,
  variation,
  setVariation,
  game,
  goBack,
  goForward
}) {
  const defaultOpening = openings[0].options[0];
  const [variations, setVariations] = React.useState(defaultOpening.value);
  const [selectedOpenings, setSelectedOpenings] = React.useState([]);

  React.useEffect(() => {
    setVariation(variations[0]);
  }, []);

  function handleOpeningChange(change) {
    setVariations(change.value);
    setVariation(change.value[0]);
    reset();
  }

  function handleVariationChange(change) {
    setVariation(change);
    reset();
  }

  function handleColorChange(change) {
    setUserColor(change.value);
    setBoardOrientation(change.value); // once autoflipping setting is added, can optionally do this or not
    reset();
  }

  const joinedOpenings = [...openings[0].options, ...openings[1].options];
  const flattenedVariations = joinedOpenings.flatMap((o) => o.value);
  const testVariations = flattenedVariations.filter((v) =>
    selectedOpenings.includes(v.id)
  );

  function handleCheckbox(id) {
    const index = selectedOpenings.findIndex((s) => s === id);
    if (index > -1) {
      const newSelectedOpenings = [...selectedOpenings];
      newSelectedOpenings.splice(index, 1);
      setSelectedOpenings(newSelectedOpenings);
    } else setSelectedOpenings([...selectedOpenings, id]);
  }

  return (
    <div className="panel">
      Opening
      <div style={{ color: 'black' }}>
        <Select
          options={openings}
          isSearchable={true}
          defaultValue={defaultOpening}
          formatGroupLabel={formatGroupLabel}
          onChange={handleOpeningChange}
        />
      </div>
      Variation
      <div style={{ color: 'black' }}>
        <Select
          options={variations}
          isSearchable={true}
          value={variation || variations[0]}
          onChange={handleVariationChange}
        />
      </div>
      Play as:
      <div style={{ color: 'black' }}>
        <Select
          options={colourChoices}
          defaultValue={colourChoices[0]}
          onChange={handleColorChange}
        />
      </div>
      <button onClick={reset}>Reset</button>
      <button
        onClick={() =>
          setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')
        }
      >
        Flip
      </button>
      <button
        disabled={
          game?.fen() === start ||
          (game?.history().length === 1 && userColor === 'black')
        }
        onClick={goBack}
      >
        Back
      </button>
      <button disabled={redoStack.length === 0} onClick={goForward}>
        Next
      </button>
      <br />
      Multi Test
      {joinedOpenings.map((o) => {
        return (
          <div key={o.label}>
            <b>{o.label}</b>
            {o.value.map((v) => {
              // on click, add v.id to selectedOpenings
              return (
                <div key={v.label}>
                  <input
                    onChange={() => handleCheckbox(v.id)}
                    type="checkbox"
                    id={`${v.id}-checkbox`}
                    checked={selectedOpenings.includes(v.id)}
                  />
                  <label htmlFor={`${v.id}-checkbox`}>{v.label}</label>
                </div>
              );
            })}
          </div>
        );
      })}
      <h1>Move history:</h1>
      <div>
        {game?.history().map((moveText, i) => (
          <span key={i}>{moveText.to}</span>
        ))}
      </div>
    </div>
  );
}
