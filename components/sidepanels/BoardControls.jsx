import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { start } from '../../data/consts';
import { useChessboard } from '../../context/board-context';

export function BoardControls({ resetDisabled }) {
  const {
    boardOrientation,
    game,
    moveSounds,
    opening,
    playSound,
    redoStack,
    reset,
    resume,
    safeGameMutate,
    setBoardOrientation,
    setMoveSquares,
    setRedoStack,
    userColor
  } = useChessboard();
  const { pathname } = useRouter();
  const [keyDown, setKeyDown] = useState();
  const [resumeDisabled, setResumeDisabled] = useState(true);

  const backDisabled = game?.fen() === start || (game?.history().length === 1 && userColor === 'black');
  const forwardDisabled = redoStack.length === 0;

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  useEffect(() => {
    setResumeDisabled(opening?.value[game.history().length] === undefined || pathname.includes('/submissions'));
  }, [opening, game, pathname]);

  useEffect(() => {
    // needs some more logic for when multiple are set down, and for looping on hold
    if (keyDown === 'ArrowLeft') {
      goBack();
    } else if (keyDown === 'ArrowRight') {
      goForward();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyDown]);

  function downHandler({ key }) {
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      setKeyDown(key);
    }
  }

  function upHandler({ key }) {
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      setKeyDown();
    }
  }

  function goBack() {
    if (backDisabled) return;
    const history = game.history({ verbose: true });
    const lastMove = history[history.length - 1];

    setRedoStack((oldStack) => [...oldStack, lastMove]);

    safeGameMutate((game) => {
      game.undo();
    });

    moveSounds.move.play();
    setResumeDisabled(false);

    if (pathname.includes('/learn') || pathname.includes('/traps')) {
      // colour move squares of move made 2 moves ago
      const move = opening.value[history.length - 2];
      setMoveSquares({
        [move?.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        [move?.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
      });
      return;
    }

    setMoveSquares({});
  }

  function goForward() {
    if (forwardDisabled) return;
    const redoMove = redoStack[redoStack.length - 1];
    setRedoStack((oldStack) => {
      const newStack = [...oldStack];
      newStack.pop();
      return newStack;
    });

    if (!redoMove) return;

    safeGameMutate((game) => {
      game.move(redoMove);
    });

    playSound('', redoMove);

    setMoveSquares({
      [redoMove.from]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)'
      },
      [redoMove.to]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)'
      }
    });
  }

  function handleResume() {
    setResumeDisabled(true);
    resume();
  }

  return (
    <>
      <div className="panel-board-controls flex-row">
        <div
          className={`panel-board-control flex-column hover-dim ${backDisabled && 'disabled'}`}
          disabled={backDisabled}
          onClick={goBack}
        >
          <button className={`material-icons panel-board-control-button ${backDisabled && 'disabled'}`}>
            chevron_left
          </button>
          Back
        </div>

        <div
          className={`panel-board-control flex-column hover-dim ${resumeDisabled && 'disabled'}`}
          disabled={resumeDisabled}
          onClick={handleResume}
        >
          <button className={`material-icons panel-board-control-button ${resumeDisabled && 'disabled'}`}>
            play_arrow
          </button>
          Resume
        </div>

        <div
          className={`panel-board-control flex-column hover-dim ${forwardDisabled && 'disabled'}`}
          disabled={forwardDisabled}
          onClick={goForward}
        >
          <button className={`material-icons panel-board-control-button ${forwardDisabled && 'disabled'}`}>
            chevron_right
          </button>
          Forward
        </div>
      </div>
      <div className="panel-board-controls flex-row ">
        <div
          className="panel-board-control flex-row hover-dim"
          onClick={() => setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')}
        >
          <button className="material-icons panel-board-control-button">cached</button>
          Flip Board
        </div>

        <div
          className={`panel-board-control flex-row hover-dim ${resetDisabled && 'disabled'}`}
          onClick={reset}
          disabled={resetDisabled}
        >
          <button className={`material-icons panel-board-control-button `}>replay</button>
          Reset
        </div>
      </div>
    </>
  );
}
