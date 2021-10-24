import React from 'react';
import { useRouter } from 'next/router';

import DebugDisplay from '../displays/DebugDisplay';
import { BoardControls } from './BoardControls';
import { useChessboard } from '../../context/board-context';

export function DebugSidePanel() {
  const router = useRouter();
  const { game } = useChessboard();

  function handleSubmit() {
    window.localStorage.setItem('moves', JSON.stringify(game?.history({ verbose: true })));
    router.push('/contribute');
  }

  return (
    <div className="panel">
      <div id="panel-title" className="panel-title">
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
      <BoardControls resetDisabled={false} />
    </div>
  );
}
