import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Select from 'react-select';

import LearnDisplay from '../displays/LearnDisplay';
import { BoardControls } from './BoardControls';
import { formatGroupLabel } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { useWindowSize } from '../../functions/hooks';

export function TrapsSidePanel() {
  const window = useWindowSize();
  const { setBoardOrientation, game, opening, reset, setOpening, setUserColor } = useChessboard();
  const { traps, setTraps, loadingError, setLoadingError } = useData();
  const {
    pathname,
    query: { openingLink }
  } = useRouter();

  useEffect(() => {
    if (traps) {
      document.getElementById('panel-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [traps, pathname]);

  useEffect(() => {
    async function fetchTraps() {
      const response = await fetch('/api/traps');
      const resJson = await response.json();
      if (response?.status === 200) {
        setTraps(resJson.body);
      } else {
        setLoadingError(resJson.error);
      }
    }
    if (!traps) fetchTraps();
  }, [traps, setLoadingError, setTraps]);

  // Set opening on load with URL param
  useEffect(() => {
    if (traps && openingLink && !opening) {
      const o = traps.flatMap((o) => o.options).filter((o) => o.label === openingLink)[0];
      setOpening(o);
    }
  }, [openingLink, traps, opening, setOpening]);

  // Scroll chessboard into view when opening is selected
  useEffect(() => {
    if (opening) {
      document.getElementById('chessboard').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [opening]);

  if (loadingError) {
    return <div>Error</div>;
  }

  function handleTrapsOpeningChange(change) {
    setOpening(change);
    setUserColor(change.colour);
    setBoardOrientation(change.colour);
    reset();
  }

  function filterOptions({ label, value }, searchInput) {
    const searchLower = searchInput.toLocaleLowerCase();
    // default search
    if (label.toLocaleLowerCase().includes(searchLower)) return true;

    // check if a group as the filter string as label
    const groupOptions = traps.filter((group) => group.label.toLocaleLowerCase().includes(searchLower));

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

  return (
    <div className="panel">
      <div id="panel-title" className="panel-title">
        <h1 className="panel-title-text">Learn Opening Traps</h1>
      </div>
      <div className="panel-body flex-column">
        <div className="panel-select">
          <Select
            value={opening}
            filterOption={filterOptions}
            formatGroupLabel={formatGroupLabel}
            isSearchable={window > 850}
            maxMenuHeight={325}
            onChange={handleTrapsOpeningChange}
            options={traps}
            placeholder={traps ? 'Select Opening Trap to Learn' : 'Loading Traps'}
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
