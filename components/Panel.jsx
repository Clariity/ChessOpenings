import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Select from 'react-select';

import BoardControls from './BoardControls';
import LearnDisplay from './panel-displays/LearnDisplay';
import TrainDisplay from './panel-displays/TrainDisplay';
import { start, colourChoices, formatGroupLabel } from '../data/consts';
import { ActionType, useStoreContext } from './Store';
import { useWindowSize } from '../functions/hooks';

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
  const router = useRouter();
  const window = useWindowSize();
  const { openingLink } = router.query;
  const { dispatch, state } = useStoreContext();

  const [selectedOpenings, setSelectedOpenings] = useState([]);
  const [openingsCopy, setOpeningsCopy] = useState([]);
  const [openingsCompleted, setOpeningsCompleted] = useState([]);
  const [openingsFailed, setOpeningsFailed] = useState([]);
  const [started, setStarted] = useState(false);
  const [canStart, setCanStart] = useState(false);
  const [canRetry, setCanRetry] = useState(false);

  useEffect(async () => {
    if (!state.openings) {
      const response = await fetch('/api/openings');
      const openings = await response.json();
      if (response.status === 200) {
        dispatch({
          type: ActionType.SET_OPENINGS,
          payload: JSON.parse(openings.body)
        });
      } else {
        dispatch({
          type: ActionType.SET_OPENINGS_ERROR,
          payload: JSON.parse(openings.error)
        });
      }
    }
  }, [state.openings]);

  // Act on opening complete
  useEffect(() => {
    if (isTrain && openingComplete) {
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

  // Act on opening error
  useEffect(() => {
    if (isTrain && openingError) {
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

  // Set opening on load with URL param
  useEffect(() => {
    if (openingLink && !opening) {
      const o = state.openings.flatMap((o) => o.options).filter((o) => o.label === openingLink)[0];
      setOpening(o);
    }
  }, [openingLink]);

  // Scroll chessboard into view when train is started
  useEffect(() => {
    if (started) {
      document.getElementById('chessboard').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [started]);

  // Run train once shuffling is completed or once failed openings have been set
  useEffect(() => {
    if (canStart) {
      setCanStart(false);
      handleTrainStart();
    }
  }, [openingsCopy]);

  if (state.openingsError) {
    return <div>Error</div>;
  }

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
    setCanRetry(false);
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

  function handleTrainShuffle() {
    const shuffledOpenings = selectedOpenings.sort(() => (Math.random() < 0.5 ? 1 : -1));
    setSelectedOpenings([...shuffledOpenings]);
    setOpeningsCopy([...shuffledOpenings]);
    setCanStart(true);
  }

  function handleRetryFailed() {
    const failedOpenings = selectedOpenings.filter((o) => openingsFailed.includes(o.label));
    setSelectedOpenings([...failedOpenings]);
    setOpeningsCopy([...failedOpenings]);
    setCanStart(true);
  }

  function handleTrainStart() {
    if (!started) {
      setOpeningsCompleted([]);
      setOpeningsFailed([]);
    }
    setStarted(true);
    setCanRetry(true);
    const o = openingsCopy.shift();
    if (o === undefined) {
      // train complete
      setTimeout(() => {
        handleTrainStop();
      }, 500);
    } else {
      setOpening(o);
      reset();
    }
  }

  function handleTrainStop() {
    setStarted(false);
    setOpening();
    setOpeningsCopy([...selectedOpenings]);
  }

  function filterOptions({ label, value }, searchInput) {
    const searchLower = searchInput.toLocaleLowerCase();
    // default search
    if (label.toLocaleLowerCase().includes(searchLower)) return true;

    // check if a group as the filter string as label
    const groupOptions = state.openings.filter((group) => group.label.toLocaleLowerCase().includes(searchLower));

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

  const flattenedVariations = state.openings?.flatMap((o) => o.options).filter((o) => !o.label.includes('All '));
  const learnOpenings = state.openings ? [...state.openings.slice(1)] : []; // remove the select all options
  const backDisabled =
    game?.fen() === start ||
    (game?.history().length === 1 && userColor === 'black') ||
    navDisabled ||
    (isTrain && !started);
  const forwardDisabled = redoStack.length === 0 || navDisabled;
  const startDisabled = selectedOpenings.length === 0;

  return state.openings ? (
    <div className="panel">
      <div className="panel-title">
        <h1 className="panel-title-text">{isTrain ? 'Train Openings' : 'Learn Openings'}</h1>
      </div>
      <div className="panel-body flex-column">
        {!started && (
          <div className="panel-select">
            <Select
              closeMenuOnSelect={!isTrain}
              value={isTrain ? selectedOpenings : opening}
              filterOption={filterOptions}
              formatGroupLabel={formatGroupLabel}
              isDisabled={started}
              isMulti={isTrain}
              isSearchable={window > 850}
              maxMenuHeight={325}
              onChange={isTrain ? handleTrainOpeningChange : handleLearnOpeningChange}
              options={isTrain ? state.openings : learnOpenings}
              placeholder={isTrain ? 'Select Openings to Train' : 'Select Opening to Learn'}
            />
          </div>
        )}
        {!started && (
          <div className="panel-select">
            <Select
              options={colourChoices}
              defaultValue={colourChoices[0]}
              onChange={handleUserColorChange}
              isSearchable={false}
            />
          </div>
        )}
        <div id="panel-scroll-display" className="panel-scroll-display">
          {isTrain ? (
            <TrainDisplay
              selectedOpenings={selectedOpenings}
              opening={opening}
              openingsCompleted={openingsCompleted}
              openingsFailed={openingsFailed}
              started={started}
            />
          ) : (
            <LearnDisplay history={game?.history({ verbose: true })} opening={opening} />
          )}
        </div>
        <div className="flex-row">
          {isTrain && !started && (
            <button
              className={`button-component margin-10-r ${
                (startDisabled || (canRetry && openingsFailed.length === 0)) && 'disabled'
              }`}
              disabled={startDisabled || (canRetry && openingsFailed.length === 0)}
              onClick={canRetry ? handleRetryFailed : handleTrainShuffle}
            >
              <span className="material-icons pad-5-r">{canRetry ? 'restart_alt' : 'shuffle'}</span>
              {canRetry ? 'Failed' : ''}
            </button>
          )}
          {isTrain && (
            <button
              className={`button-component margin-10-l ${startDisabled && 'disabled'} ${started && 'quit'}`}
              disabled={startDisabled}
              onClick={started ? handleTrainStop : handleTrainStart}
            >
              <span className="material-icons pad-5-r">{started ? '' : canRetry ? 'restart_alt' : 'play_arrow'}</span>
              {started ? 'Quit' : canRetry ? 'All' : ''}
            </button>
          )}
        </div>
      </div>
      <BoardControls
        backDisabled={backDisabled}
        boardOrientation={boardOrientation}
        forwardDisabled={forwardDisabled}
        goBack={goBack}
        goForward={goForward}
        reset={reset}
        resetDisabled={isTrain && !started}
        setBoardOrientation={setBoardOrientation}
      />
    </div>
  ) : (
    <div>Loading</div>
  );
}
