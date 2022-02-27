import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';

import { colourChoices } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { LearnDisplay } from './LearnDisplay';
import { SidePanel } from '../chessboard/SidePanel';

export function LearnSidePanel() {
  const { setBoardOrientation, opening, reset, setOpening, setUserColor } = useChessboard();
  const { openingGroups, loadingError, setLoadingError } = useData();
  const {
    query: { group, openingLink }
  } = useRouter();
  const [openings, setOpenings] = useState();

  // Scroll chessboard into view when opening is selected
  useEffect(() => {
    if (opening) {
      document.getElementById('board').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [opening]);

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
    <SidePanel title="Learn Openings">
      <div className="panel-select mt-2">
        <Select
          options={colourChoices}
          defaultValue={colourChoices[0]}
          onChange={handleUserColorChange}
          isSearchable={false}
        />
      </div>
      <LearnDisplay openings={openings} />
    </SidePanel>
  );
}
