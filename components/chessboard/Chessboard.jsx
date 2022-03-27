import { useEffect, useState } from 'react';
import { Chessboard as Board } from 'react-chessboard';

import { start } from '../../data/consts';
import { useChessboard } from '../../context/board-context';
import { useChessboardSize } from '../../functions/hooks';
import { useSettings } from '../../context/settings-context';
import { ChessboardHeader } from './ChessboardHeader';

export function Chessboard({ id }) {
  const {
    boardOrientation,
    chessboardRef,
    game,
    onMouseOutSquare,
    onMouseOverSquare,
    onPieceDrop,
    onSquareClick,
    onSquareRightClick,
    opening,
    squareStyles
  } = useChessboard();
  const { chessboardSize } = useChessboardSize();
  const { animationsOn } = useSettings();
  const [showBoard, setShowBoard] = useState(false);

  const isContributeBoard = id === 'contributeChessboard';
  const arePiecesDraggable = !id.includes('Submission') && (id === 'contributeChessboard' || !!opening);

  // remount new board
  useEffect(() => {
    setShowBoard(true);
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-full ${
        !isContributeBoard ? 'xl:w-8/12 max-w-[80vh]' : ''
      } xl:px-4 mb-2 xl:mb-0`}
    >
      {!isContributeBoard && <ChessboardHeader opening={opening} />}
      {showBoard && (
        <Board
          id={id}
          animationDuration={animationsOn?.value ? 300 : 0}
          arePiecesDraggable={arePiecesDraggable}
          arePremovesAllowed={!!opening}
          boardOrientation={boardOrientation}
          boardWidth={chessboardSize}
          customBoardStyle={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          customDarkSquareStyle={{ backgroundColor: 'var(--theme)' }}
          customDropSquareStyle={{
            boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)'
          }}
          customLightSquareStyle={{ backgroundColor: 'var(--theme-secondary)' }}
          customSquareStyles={squareStyles}
          onMouseOutSquare={onMouseOutSquare}
          onMouseOverSquare={onMouseOverSquare}
          onPieceDrop={onPieceDrop}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          position={game?.fen() || start}
          ref={chessboardRef}
        />
      )}
    </div>
  );
}
