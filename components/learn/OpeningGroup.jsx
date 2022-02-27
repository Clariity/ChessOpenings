import { useState } from 'react';
import { Chessboard as Board } from 'react-chessboard';
import Chess from 'chess.js';
import Link from 'next/link';

import { useChessboardSize } from '../../functions/hooks';

export function OpeningGroup({ group, type }) {
  const [error, setError] = useState(false);
  const { chessboardSize } = useChessboardSize();

  const game = new Chess();
  const opening = group.options[0].value;
  for (let i = 0; i < 4; i++) {
    game.move({ from: opening[i].from, to: opening[i].to });
  }

  return (
    <div className="px-2 lg:px-4 w-full xs:w-1/2 xl:w-1/4 my-4">
      <Link href={`/${type}/${encodeURIComponent(group.label)}`}>
        <a>
          <div className="transition duration-100 ease-in-out transform hover:scale-105">
            <div id="board" className="flex text-sm sm:text-lg bg-darkest p-2">
              <h3>{group.label}</h3>
              <h3 className="ml-auto">{group.options.length}</h3>
            </div>
            {error ? (
              <div className="relative z-10" style={{ minHeight: chessboardSize }}>
                <div className="absolute z-20">
                  <Board
                    id={group.label}
                    arePiecesDraggable={false}
                    boardOrientation={'white'}
                    boardWidth={chessboardSize}
                    position={game?.fen()}
                  />
                </div>
                <div
                  className="relative z-30 cursor-pointer"
                  style={{ width: chessboardSize, height: chessboardSize }}
                />
              </div>
            ) : (
              <img
                src={`/media/boards/${group.label}.png`}
                alt={group.label}
                onError={() => setError(true)}
                className="w-full"
              />
            )}
          </div>
        </a>
      </Link>
    </div>
  );
}
