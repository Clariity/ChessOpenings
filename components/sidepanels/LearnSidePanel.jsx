import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Select from 'react-select';

import { BoardControls } from './BoardControls';
import { colourChoices } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import LearnDisplay from '../displays/LearnDisplay';

export function LearnSidePanel() {
  const { setBoardOrientation, opening, reset, setOpening, setUserColor } = useChessboard();
  const { openingGroups, loadingError, setLoadingError } = useData();
  const {
    pathname,
    query: { group, openingLink }
  } = useRouter();
  const [openings, setOpenings] = useState();

  useEffect(() => {
    if (openingGroups) {
      document.getElementById('panel-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [openingGroups, pathname]);

  // Set openings list
  useEffect(() => {
    if (openingGroups && group && !openings) {
      const openingGroup = openingGroups.find((o) => o.label === group);
      if (openingGroup) {
        setOpenings(openingGroup.options);
      } else setLoadingError('Opening Group Not Found');
    }
  }, [group, openingGroups, openings, setOpenings, setLoadingError]);

  // Set opening on load with URL param
  useEffect(() => {
    if (openings && openingLink && !opening) {
      const o = openings.find((o) => o.label === openingLink);
      setOpening(o);
    }
  }, [openingLink, openings, opening, setOpening]);

  function handleUserColorChange(change) {
    setUserColor(change.value);
    setBoardOrientation(change.value); // once autoflipping setting is added, can optionally do this or not
    reset();
  }

  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <div className="panel">
      <div id="panel-title" className="panel-title">
        <h1 className="panel-title-text">Learn Openings</h1>
      </div>
      <div className="panel-body flex-column">
        <div className="panel-select">
          <Select
            options={colourChoices}
            defaultValue={colourChoices[0]}
            onChange={handleUserColorChange}
            isSearchable={false}
          />
        </div>
        <div id="panel-scroll-display" className="panel-scroll-display">
          <LearnDisplay openings={openings} />
        </div>
      </div>
      <BoardControls resetDisabled={false} />
    </div>
  );
}
