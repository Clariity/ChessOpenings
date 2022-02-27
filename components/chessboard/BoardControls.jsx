import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { flipArrow, hintsFilled, hintsOutlined, leftArrow, playArrow, replayArrow, rightArrow } from '../../data/icons';
import { start } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { SVG } from '../utils/SVG';

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
    setShowHints,
    showHints,
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
    <div className="order-1 xl:order-2 bg-darkest">
      <div className="flex p-4">
        <button
          className={`flex flex-col items-center w-1/3 cursor-pointer hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
          disabled={backDisabled}
          onClick={goBack}
        >
          <SVG icon={leftArrow} />
          Back
        </button>

        <button
          className={`flex flex-col items-center w-1/3 cursor-pointer hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
          disabled={resumeDisabled}
          onClick={handleResume}
        >
          <SVG icon={playArrow} />
          Resume
        </button>

        <button
          className={`flex flex-col items-center w-1/3 cursor-pointer hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
          disabled={forwardDisabled}
          onClick={goForward}
        >
          <SVG icon={rightArrow} />
          Forward
        </button>
      </div>

      <div className="flex p-4 ">
        <button
          className="flex justify-center items-center w-1/3 cursor-pointer hover:opacity-50"
          onClick={() => setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')}
        >
          <SVG icon={flipArrow} marginRight={2} />
          Flip Board
        </button>

        <button
          className="flex justify-center items-center w-1/3 cursor-pointer hover:opacity-50"
          onClick={() => setShowHints(!showHints)}
        >
          <SVG icon={showHints ? hintsFilled : hintsOutlined} marginRight={2} />
          Toggle Hints
        </button>

        <button
          className={`flex justify-center items-center w-1/3 cursor-pointer hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`}
          onClick={reset}
          disabled={resetDisabled}
        >
          <SVG icon={replayArrow} marginRight={2} />
          Reset
        </button>
      </div>
    </div>
  );
}
