import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Select from 'react-select';

import BoardControls from '../BoardControls';
import LearnDisplay from '../panel-displays/LearnDisplay';
import { start, formatGroupLabel } from '../../data/consts';
import { ActionType, useStoreContext } from '../Store';
import { useWindowSize } from '../../functions/hooks';

export default function TrapsPanel({
  boardOrientation,
  game,
  goBack,
  goForward,
  navDisabled,
  opening,
  redoStack,
  reset,
  setBoardOrientation,
  setOpening,
  setUserColor,
  userColor
}) {
  const router = useRouter();
  const window = useWindowSize();
  const { openingLink } = router.query;
  const { dispatch, state } = useStoreContext();

  useEffect(() => {
    if (state.traps) {
      document.getElementById('panel-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [state.traps]);

  useEffect(async () => {
    if (!state.traps) {
      const response = await fetch('/api/traps');
      const traps = await response.json();
      if (response.status === 200) {
        dispatch({
          type: ActionType.SET_TRAPS,
          payload: JSON.parse(traps.body)
        });
      } else {
        dispatch({
          type: ActionType.SET_TRAPS_ERROR,
          payload: JSON.parse(traps.error)
        });
      }
    }
  }, [state.traps]);

  // Set opening on load with URL param
  useEffect(() => {
    if (openingLink && !opening) {
      const o = state.traps.flatMap((o) => o.options).filter((o) => o.label === openingLink)[0];
      setOpening(o);
    }
  }, [openingLink]);

  // Scroll chessboard into view when opening is selected
  useEffect(() => {
    if (opening) {
      document.getElementById('chessboard').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [opening]);

  if (state.trapsError) {
    return <div>Error</div>;
  }

  function handleLearnOpeningChange(change) {
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
    const groupOptions = state.traps.filter((group) => group.label.toLocaleLowerCase().includes(searchLower));

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

  const backDisabled = game?.fen() === start || (game?.history().length === 1 && userColor === 'black') || navDisabled;
  const forwardDisabled = redoStack.length === 0 || navDisabled;

  return (
    <div className="panel">
      <div id="panel-title" className="panel-title">
        <h1 className="panel-title-text">Learn Opening Traps</h1>
      </div>
      <div className="panel-body flex-column">
        {state.traps && (
          <div className="panel-select">
            <Select
              value={opening}
              filterOption={filterOptions}
              formatGroupLabel={formatGroupLabel}
              isSearchable={window > 850}
              maxMenuHeight={325}
              onChange={handleLearnOpeningChange}
              options={state.traps.sort((a, b) => (a.value < b.value ? -1 : 1))}
              placeholder={'Select Opening Trap to Learn'}
            />
          </div>
        )}
        <div id="panel-scroll-display" className="panel-scroll-display">
          <LearnDisplay history={game?.history({ verbose: true })} opening={opening} />
        </div>
      </div>
      <BoardControls
        backDisabled={backDisabled}
        boardOrientation={boardOrientation}
        forwardDisabled={forwardDisabled}
        goBack={goBack}
        goForward={goForward}
        reset={reset}
        resetDisabled={false}
        setBoardOrientation={setBoardOrientation}
      />
    </div>
  );
}
