import React from 'react';
import Select from 'react-select';

import BoardControls from './BoardControls';
import openings from '../data/openings';
import { start } from '../data/consts';
import { colourChoices, formatGroupLabel } from '../data/selectOptionsAndStyles';
import LearnDisplay from './LearnDisplay';
import TrainDisplay from './TrainDisplay';

export default function Panel({
  boardOrientation,
  game,
  goBack,
  goForward,
  navDisabled,
  opening,
  openingComplete,
  openingError,
  path,
  redoStack,
  reset,
  setBoardOrientation,
  setOpening,
  setOpeningComplete,
  setOpeningError,
  setUserColor,
  userColor
}) {
  const isTrain = path === '/train';
  const [selectedOpenings, setSelectedOpenings] = React.useState([]);
  const [openingsCopy, setOpeningsCopy] = React.useState([]);
  const [openingsCompleted, setOpeningsCompleted] = React.useState([]);
  const [openingsFailed, setOpeningsFailed] = React.useState([]);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (openingComplete) {
      // Wait half a second before moving on to next opening
      setTimeout(() => {
        const newCompleted = [...openingsCompleted];
        newCompleted.push(opening.label);
        setOpeningsCompleted(newCompleted);
        setOpeningComplete(false);
        handleTrainStart();
      }, 500);
    }
  }, [openingComplete]);

  React.useEffect(() => {
    if (openingError) {
      // Wait half a second before moving on to next opening
      setTimeout(() => {
        const newFailed = [...openingsFailed];
        newFailed.push(opening.label);
        setOpeningsFailed(newFailed);
        setOpeningError(false);
        handleTrainStart();
      }, 500);
    }
  }, [openingError]);

  function handleLearnOpeningChange(change) {
    setOpening(change);
    reset();
  }

  function handleTrainOpeningChange(change) {
    if (change && change.filter((c) => c.label.includes('All ')).length > 0) {
      handleSelectAll(change.filter((c) => c.label.includes('All '))[0].value);
    } else {
      setSelectedOpenings(change ? [...change] : []);
      setOpeningsCopy(change ? [...change] : []);
    }
  }

  function handleSelectAll(value) {
    // all openings selected
    if (value === 'All') {
      setSelectedOpenings([...flattenedVariations]);
      setOpeningsCopy([...flattenedVariations]);
    } else {
      // all <opening> selected
      // get current selected openings and remove the new selected ones so there are no duplicates
      const oldListFiltered = [...selectedOpenings].filter((v) => !v.label.includes(value));
      const filteredVariations = [...flattenedVariations].filter((v) => v.label.includes(value));
      // append new openings
      setSelectedOpenings([...oldListFiltered, ...filteredVariations]);
      setOpeningsCopy([...oldListFiltered, ...filteredVariations]);
    }
  }

  function handleUserColorChange(change) {
    setUserColor(change.value);
    setBoardOrientation(change.value); // once autoflipping setting is added, can optionally do this or not
    reset();
  }

  function handleTrainStart() {
    if (!started) {
      setOpeningsCompleted([]);
      setOpeningsFailed([]);
    }
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

  function filterOptions({ label, value }, searchInput) {
    const searchLower = searchInput.toLocaleLowerCase();
    // default search
    if (label.toLocaleLowerCase().includes(searchLower)) return true;

    // check if a group as the filter string as label
    const groupOptions = openings.filter((group) => group.label.toLocaleLowerCase().includes(searchLower));

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

  const flattenedVariations = openings.flatMap((o) => o.options).filter((o) => !o.label.includes('All '));
  const backDisabled = game?.fen() === start || (game?.history().length === 1 && userColor === 'black') || navDisabled;
  const forwardDisabled = redoStack.length === 0 || navDisabled;
  const startDisabled = selectedOpenings.length === 0;

  return (
    <div className="panel">
      <div className="panel-title">
        <h1 className="panel-title-text">{isTrain ? 'Train Openings' : 'Learn Openings'}</h1>
      </div>
      <div className="panel-body flex-column">
        <div className="panel-select">
          <Select
            closeMenuOnSelect={!isTrain}
            value={isTrain ? selectedOpenings : opening}
            filterOption={filterOptions}
            formatGroupLabel={formatGroupLabel}
            isDisabled={started}
            isMulti={isTrain}
            isSearchable={true}
            maxMenuHeight={600}
            onChange={isTrain ? handleTrainOpeningChange : handleLearnOpeningChange}
            options={openings}
            placeholder={isTrain ? 'Select Openings to Train' : 'Select Opening to Learn'}
          />
        </div>
        <div className="panel-select">
          <Select options={colourChoices} defaultValue={colourChoices[0]} onChange={handleUserColorChange} />
        </div>
        <div className="panel-scroll-display">
          {isTrain ? (
            <TrainDisplay
              selectedOpenings={selectedOpenings}
              opening={opening}
              openingsCompleted={openingsCompleted}
              openingsFailed={openingsFailed}
              started={started}
            />
          ) : (
            <LearnDisplay game={game} />
          )}
        </div>
        <button
          className={`panel-start ${startDisabled && 'disabled'} ${started && 'quit'}`}
          disabled={startDisabled}
          onClick={started ? handleTrainStop : handleTrainStart}
        >
          {started ? 'Quit' : 'Start'}
        </button>
      </div>
      <BoardControls
        backDisabled={backDisabled}
        boardOrientation={boardOrientation}
        forwardDisabled={forwardDisabled}
        goBack={goBack}
        goForward={goForward}
        reset={reset}
        setBoardOrientation={setBoardOrientation}
      />
    </div>
  );
}
