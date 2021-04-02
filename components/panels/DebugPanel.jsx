import React from 'react';
import { useRouter } from 'next/router';

import BoardControls from '../BoardControls';
import DebugDisplay from '../panel-displays/DebugDisplay';
import { start } from '../../data/consts';

export default function DebugPanel({
  boardOrientation,
  game,
  goBack,
  goForward,
  navDisabled,
  redoStack,
  reset,
  setBoardOrientation
}) {
  const router = useRouter();
  const backDisabled = game?.fen() === start || game?.history().length < 2 || navDisabled;
  const forwardDisabled = redoStack.length === 0 || navDisabled;

  function handleSubmit() {
    window.localStorage.setItem('moves', JSON.stringify(game?.history({ verbose: true })));
    router.push('/contribute');
  }

  return (
    <div className="panel">
      <div className="panel-title">
        <h1 className="panel-title-text">Debug Tool</h1>
      </div>
      <div className="panel-body flex-column">
        <div id="panel-scroll-display" className="panel-scroll-display">
          <DebugDisplay history={game?.history({ verbose: true })} />
        </div>
        <div className="flex-row">
          <button
            className={`button-component ${game?.history().length < 4 && 'disabled'}`}
            disabled={game?.history().length < 4}
            onClick={handleSubmit}
          >
            Add Moves to Form
          </button>
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
