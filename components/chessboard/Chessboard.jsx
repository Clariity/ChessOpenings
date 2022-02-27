import { useEffect, useMemo, useState } from 'react';
import { Chessboard as Board } from 'react-chessboard';

import { chessPieces, start } from '../../data/consts';
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
  const { animationsOn, theme } = useSettings();
  const [showBoard, setShowBoard] = useState(false);

  const isContributeBoard = id === 'contributeChessboard';
  const customPieces = useMemo(() => chessPieces(theme?.value), [theme]);
  const arePiecesDraggable = !id.includes('Submission') && (id === 'contributeChessboard' || !!opening);

  // remount new board
  useEffect(() => {
    setShowBoard(true);
  }, []);

  return (
    <div
      className={`flex flex-col items-center w-full ${
        !isContributeBoard ? 'xl:w-8/12' : ''
      } xl:px-4 mb-2 xl:mb-0 max-w-[80vh]`}
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
          customDarkSquareStyle={theme?.darkSquareStyle}
          customDropSquareStyle={{
            boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)'
          }}
          customLightSquareStyle={theme?.lightSquareStyle}
          customPieces={customPieces}
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
