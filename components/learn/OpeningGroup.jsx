import { useMemo } from 'react';
import { Chessboard as Board } from 'react-chessboard';
import Link from 'next/link';
import Chess from 'chess.js';

import { chessPieces } from '../../data/consts';
import { useChessboardSize } from '../../functions/hooks';
import { useSettings } from '../../context/settings-context';

export function OpeningGroup({ group, type }) {
  const { chessboardSize } = useChessboardSize();
  const { theme } = useSettings();
  const customPieces = useMemo(() => chessPieces(theme?.value), [theme]);

  const game = new Chess();
  const opening = group.options[0].value;
  for (let i = 0; i < 5; i++) {
    game.move({ from: opening[i].from, to: opening[i].to });
  }

  return (
    <div className="group-section">
      <div className="group-heading-container flex-row">
        <h3 className="group-heading">{group.label}</h3>
        <h4 className="group-heading margin-left-auto">{group.options.length}</h4>
      </div>
      <Link href={`/${type}/${encodeURIComponent(group.label)}`}>
        <div className="chessboard-header group-board" style={{ height: chessboardSize }}>
          <div className="group-board-underlay">
            <Board
              id={group.label}
              arePiecesDraggable={false}
              boardOrientation={'white'}
              boardWidth={chessboardSize}
              customDarkSquareStyle={theme?.darkSquareStyle}
              customLightSquareStyle={theme?.lightSquareStyle}
              customPieces={customPieces}
              position={game?.fen()}
            />
          </div>
          <div className="group-board-overlay" style={{ width: chessboardSize, height: chessboardSize }} />
        </div>
      </Link>
    </div>
  );
}
