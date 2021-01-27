import React from 'react';
import Select from 'react-select';

import openings from '../data/openings';
import { start } from '../data/consts';
import { colourChoices, formatGroupLabel } from '../data/selectOptionsAndStyles';

// https://react-select.com/components -> custom option example, on hover show tooltip that contains final opening layout, add final fen into data structure so it can read that
// add default colour to each opening so we can switch to that on opening change
// Need to show current opening above the chess board

export default function Panel({
  path,
  reset,
  boardOrientation,
  setBoardOrientation,
  redoStack,
  userColor,
  setUserColor,
  opening,
  setOpening,
  game,
  goBack,
  goForward,
  openingComplete,
  setOpeningComplete
}) {
  const isTrain = path === '/train';
  const [selectedOpenings, setSelectedOpenings] = React.useState([]);
  const [openingsCopy, setOpeningsCopy] = React.useState([]);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (openingComplete) {
      // Wait half a second before moving on to next opening
      setTimeout(() => {
        setOpeningComplete(false);
        handleTrainStart();
      }, 500);
    }
  }, [openingComplete]);

  function handleLearnOpeningChange(change) {
    setOpening(change);
    reset();
  }

  function handleTrainOpeningChange(change) {
    setSelectedOpenings([...change] ?? []);
    setOpeningsCopy([...change] ?? []);
  }

  function handleUserColorChange(change) {
    setUserColor(change.value);
    setBoardOrientation(change.value); // once autoflipping setting is added, can optionally do this or not
    reset();
  }

  function handleTrainStart() {
    setStarted(true);
    const o = openingsCopy.shift();
    if (o === undefined) {
      // it is complete
    } else {
      setOpening(o);
      reset();
    }
  }

  function handleTrainStop() {
    setStarted(false);
    setOpeningsCopy([...selectedOpenings]);
  }

  const flattenedVariations = openings.flatMap((o) => o.options);
  const backDisabled = game?.fen() === start || (game?.history().length === 1 && userColor === 'black');
  const forwardDisabled = redoStack.length === 0;
  const startDisabled = selectedOpenings.length === 0;
  // const testVariations = flattenedVariations.filter((v) => selectedOpenings.includes(v.id));

  return (
    <div className="panel">
      <div className="panel-title">
        <h1 className="panel-title-text">{isTrain ? 'Train Openings' : 'Learn Openings'}</h1>
      </div>
      <div className="panel-body flex-column">
        <div className="panel-select">
          <Select
            closeMenuOnSelect={!isTrain}
            value={isTrain ? selectedOpenings : opening.value}
            formatGroupLabel={formatGroupLabel}
            isMulti={isTrain}
            isSearchable={true}
            onChange={isTrain ? handleTrainOpeningChange : handleLearnOpeningChange}
            options={openings}
            placeholder={isTrain ? 'Select Openings to Train' : 'Select Opening to Learn'}
          />
        </div>
        <div className="panel-select">
          <Select options={colourChoices} defaultValue={colourChoices[0]} onChange={handleUserColorChange} />
        </div>
        <button
          onClick={() => {
            setSelectedOpenings(selectedOpenings.length === flattenedVariations.length ? [] : [...flattenedVariations]);
            setOpeningsCopy(selectedOpenings.length === flattenedVariations.length ? [] : [...flattenedVariations]);
          }}
        >
          {`${selectedOpenings.length === flattenedVariations.length ? 'Deselect ' : 'Select '} All`}
        </button>
        <br />
        <div className="panel-scroll-display">
          <h1>Move history:</h1>
          <div>
            {game?.history({ verbose: true }).map((moveText, i) => (
              <span key={i}>{moveText.to}</span>
            ))}
          </div>
        </div>
        <button
          className={`panel-start ${startDisabled && 'disabled'}`}
          disabled={startDisabled}
          onClick={started ? handleTrainStop : handleTrainStart}
        >
          {started ? 'Finish' : 'Start'}
        </button>
      </div>
      <div className="panel-board-controls flex-row">
        <div className="panel-board-control flex-column hover-dim">
          <button
            className="material-icons panel-board-control-button"
            onClick={() => setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')}
          >
            cached
          </button>
          Flip
        </div>
        <div className="panel-board-control flex-column hover-dim">
          <button className="material-icons panel-board-control-button" onClick={reset}>
            replay
          </button>
          Reset
        </div>
        <div className={`panel-board-control flex-column hover-dim ${backDisabled && 'disabled'}`}>
          <button
            className={`material-icons panel-board-control-button ${backDisabled && 'disabled'}`}
            disabled={backDisabled}
            onClick={goBack}
          >
            chevron_left
          </button>
          Back
        </div>
        <div className={`panel-board-control flex-column hover-dim ${forwardDisabled && 'disabled'}`}>
          <button
            className={`material-icons panel-board-control-button ${forwardDisabled && 'disabled'}`}
            disabled={forwardDisabled}
            onClick={goForward}
          >
            chevron_right
          </button>
          Forward
        </div>
      </div>
    </div>
  );
}
