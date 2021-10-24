import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Select from 'react-select';

import { BoardControls } from './BoardControls';
import LearnDisplay from '../displays/LearnDisplay';
import { colourChoices, formatGroupLabel } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { useWindowSize } from '../../functions/hooks';

export function LearnSidePanel() {
  const window = useWindowSize();
  const { setBoardOrientation, game, opening, reset, setOpening, setUserColor } = useChessboard();
  const { openings, setOpenings, loadingError, setLoadingError } = useData();
  const {
    pathname,
    query: { openingLink }
  } = useRouter();

  useEffect(() => {
    if (openings) {
      document.getElementById('panel-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [openings, pathname]);

  useEffect(() => {
    async function fetchOpenings() {
      const response = await fetch('/api/openings');
      const resJson = await response.json();
      if (response?.status === 200) {
        setOpenings(resJson.body);
      } else {
        setLoadingError(resJson.error);
      }
    }
    if (!openings) fetchOpenings();
  }, [openings, setOpenings, setLoadingError]);

  // Set opening on load with URL param
  useEffect(() => {
    if (openings && openingLink && !opening) {
      const o = openings.flatMap((o) => o.options).filter((o) => o.label === openingLink)[0];
      setOpening(o);
    }
  }, [openingLink, openings, opening, setOpening]);

  if (loadingError) {
    return <div>Error</div>;
  }

  function handleLearnOpeningChange(change) {
    setOpening(change);
    reset();
  }

  function handleUserColorChange(change) {
    setUserColor(change.value);
    setBoardOrientation(change.value); // once autoflipping setting is added, can optionally do this or not
    reset();
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

  const learnOpenings = openings ? [...openings.slice(1)] : []; // remove the select all options

  return (
    <div className="panel">
      <div id="panel-title" className="panel-title">
        <h1 className="panel-title-text">Learn Openings</h1>
      </div>
      <div className="panel-body flex-column">
        <div className="panel-select">
          <Select
            closeMenuOnSelect={true}
            value={opening}
            filterOption={filterOptions}
            formatGroupLabel={formatGroupLabel}
            isSearchable={window > 850}
            maxMenuHeight={325}
            onChange={handleLearnOpeningChange}
            options={learnOpenings}
            placeholder={learnOpenings.length > 0 ? 'Select Opening to Learn' : 'Loading Openings'}
          />
        </div>
        <div className="panel-select">
          <Select
            options={colourChoices}
            defaultValue={colourChoices[0]}
            onChange={handleUserColorChange}
            isSearchable={false}
          />
        </div>
        <div id="panel-scroll-display" className="panel-scroll-display">
          <LearnDisplay history={game?.history({ verbose: true })} opening={opening} />
        </div>
      </div>
      <BoardControls resetDisabled={false} />
    </div>
  );
}
