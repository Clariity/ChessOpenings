import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';

import TrainDisplay from '../displays/TrainDisplay';
import { colourChoices, formatGroupLabel } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { useWindowSize } from '../../functions/hooks';

export function TrainSidePanel() {
  const window = useWindowSize();
  const {
    setBoardOrientation,
    opening,
    openingComplete,
    openingError,
    playSound,
    reset,
    setOpening,
    setOpeningComplete,
    setOpeningError,
    setUserColor
  } = useChessboard();
  const { openings, setOpenings, loadingError, setLoadingError } = useData();
  const {
    pathname,
    query: { openingLink }
  } = useRouter();

  const [selectedOpenings, setSelectedOpenings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openingsCompleted, setOpeningsCompleted] = useState([]);
  const [openingsFailed, setOpeningsFailed] = useState([]);
  const [canRetry, setCanRetry] = useState(false);

  const flattenedVariations = openings?.flatMap((o) => o.options).filter((o) => !o.label.includes('All '));
  const startDisabled = selectedOpenings.length === 0;

  // Scroll panel into view when openings loaded
  useEffect(() => {
    if (openings) {
      document.getElementById('panel-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [openings, pathname]);

  // Scroll chessboard into view when train is started
  useEffect(() => {
    if (opening) {
      document.getElementById('chessboard').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [opening]);

  // fetch openings
  useEffect(() => {
    async function fetchOpenings() {
      const response = await fetch('/api/openings');
      const openings = await response.json();
      if (response?.status === 200) {
        setOpenings(openings.body);
      } else {
        setLoadingError(openings.error);
      }
    }
    if (!openings) fetchOpenings();
  }, [openings, setOpenings, setLoadingError]);

  // Act on opening complete
  useEffect(() => {
    if (openingComplete) {
      // update completed openings
      const newCompleted = [...openingsCompleted];
      newCompleted.push({ ...opening });
      setOpeningsCompleted(newCompleted);

      // setup next opening
      setOpeningComplete(false);
      setCurrentIndex((oldIndex) => oldIndex + 1);
    }
  }, [opening, openingComplete, openingsCompleted, setOpeningComplete]);

  // Act on opening error
  useEffect(() => {
    if (openingError) {
      // immediately set to false so effect doesn't run again
      setOpeningError(false);
      // wait so error squares can show
      setTimeout(() => {
        // update failed openings
        const newFailed = [...openingsFailed];
        newFailed.push({ ...opening });
        setOpeningsFailed(newFailed);

        // setup next opening
        setCurrentIndex((oldIndex) => oldIndex + 1);
      }, 500);
    }
  }, [opening, openingError, openingsFailed, setOpeningError]);

  // Get next opening when index changes
  useEffect(() => {
    if (currentIndex > 0) {
      const o = selectedOpenings[currentIndex];
      if (o) {
        setOpening(o);
        reset();
      } else {
        setTimeout(() => {
          handleTrainStop();
        }, 500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, selectedOpenings, setOpening]);

  // Set opening on load with URL param
  useEffect(() => {
    if (openings && openingLink && !opening) {
      const o = openings.flatMap((o) => o.options).filter((o) => o.label === openingLink)[0];
      setOpening(o);
    }
  }, [opening, openingLink, openings, setOpening]);

  function handleTrainOpeningChange(change) {
    if (change?.filter((c) => c.label.includes('All ')).length > 0) {
      handleSelectAll(change.filter((c) => c.label.includes('All '))[0].value);
    } else {
      setSelectedOpenings(change ? [...change] : []);
    }
    setCanRetry(false);
  }

  function handleSelectAll(value) {
    // all openings selected
    if (value === 'All') {
      setSelectedOpenings([...flattenedVariations]);
    } else {
      // all <opening> selected
      // get current selected openings and remove the new selected ones so there are no duplicates
      const oldListFiltered = [...selectedOpenings].filter((v) => !v.label.includes(value));
      const filteredVariations = [...flattenedVariations].filter((v) => v.label.includes(value));
      // append new openings
      setSelectedOpenings([...oldListFiltered, ...filteredVariations]);
    }
  }

  function handleUserColorChange(change) {
    setUserColor(change.value);
    setBoardOrientation(change.value); // once autoflipping setting is added, can optionally do this or not
    reset();
  }

  function handleRetryFailed() {
    setSelectedOpenings([...openingsFailed]);
    handleStart();
  }

  function handleTrainShuffle() {
    const shuffledOpenings = selectedOpenings.sort(() => (Math.random() < 0.5 ? 1 : -1));
    setSelectedOpenings([...shuffledOpenings]);
    handleStart();
  }

  function handleStart() {
    const o = selectedOpenings[0];
    setOpeningsCompleted([]);
    setOpeningsFailed([]);
    setOpening(o);
    reset(true);
  }

  function handleTrainStop() {
    setOpening();
    setCanRetry(true);
    setCurrentIndex(0);
    playSound('end');
  }

  function filterOptions({ label, value }, searchInput) {
    const searchLower = searchInput.toLocaleLowerCase();
    // default search
    if (label.toLocaleLowerCase().includes(searchLower)) return true;

    // check if a group has the filter string as label
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

  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <div className="panel">
      <div id="panel-title" className="panel-title">
        <h1 className="panel-title-text">Train Openings</h1>
      </div>
      <div className="panel-body flex-column">
        {!opening && (
          <div className="panel-select">
            <Select
              closeMenuOnSelect={false}
              value={selectedOpenings}
              filterOption={filterOptions}
              formatGroupLabel={formatGroupLabel}
              isMulti={true}
              isSearchable={window > 850}
              maxMenuHeight={325}
              onChange={handleTrainOpeningChange}
              options={openings}
              placeholder={openings ? 'Select Openings to Train' : 'Loading Openings'}
            />
          </div>
        )}
        {!opening && (
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
          <TrainDisplay
            selectedOpenings={selectedOpenings}
            opening={opening}
            openingsCompleted={openingsCompleted}
            openingsFailed={openingsFailed}
            started={opening}
          />
        </div>
        <div className="flex-row">
          <ReactTooltip id="panel-buttons" place="top" effect="solid" />
          {!opening && (
            <button
              className={`button-component margin-10-r ${
                (startDisabled || (canRetry && openingsFailed.length === 0)) && 'disabled'
              }`}
              disabled={startDisabled || (canRetry && openingsFailed.length === 0)}
              onClick={canRetry ? handleRetryFailed : handleTrainShuffle}
              data-tip={canRetry ? 'Retry Failed' : 'Shuffle & Start'}
              data-for="panel-buttons"
            >
              <span className="material-icons pad-5-r">{canRetry ? 'restart_alt' : 'shuffle'}</span>
              {canRetry ? 'Failed' : ''}
            </button>
          )}
          {
            <button
              className={`button-component margin-10-l ${startDisabled && 'disabled'} ${opening && 'quit'}`}
              disabled={startDisabled}
              onClick={opening ? handleTrainStop : handleStart}
              data-tip={opening ? '' : canRetry ? 'Retry All' : 'Start'}
              data-for="panel-buttons"
            >
              <span className="material-icons pad-5-r">{opening ? '' : canRetry ? 'restart_alt' : 'play_arrow'}</span>
              {opening ? 'Quit' : canRetry ? 'All' : ''}
            </button>
          }
        </div>
      </div>
    </div>
  );
}
