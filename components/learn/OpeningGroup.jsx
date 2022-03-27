import { ChessboardSVG } from 'react-chessboard-svg';
import Chess from 'chess.js';
import Link from 'next/link';

import { openingChoices } from '../../data/consts';
import { useChessboardSize } from '../../functions/hooks';

export function OpeningGroup({ group, type }) {
  const { chessboardSize } = useChessboardSize();

  function getFen() {
    const fen = openingChoices.find((o) => o.label === group.label);
    if (fen) return fen.fen;
    const game = new Chess();
    const opening = group.options[0].value;
    for (let i = 0; i < 4; i++) {
      game.move({ from: opening[i].from, to: opening[i].to });
    }
    return game.fen();
  }

  return (
    <div className="px-2 lg:px-4 w-full xs:w-1/2 xl:w-1/4 my-4">
      <Link href={`/${type}/${encodeURIComponent(group.label)}`}>
        <a>
          <div className="transition duration-100 ease-in-out transform hover:scale-105 shadow-md">
            <div id="board" className="flex text-sm sm:text-lg bg-secondary p-2">
              <h3>{group.label}</h3>
              <h3 className="ml-auto">{group.options.length}</h3>
            </div>
            <div className="relative z-10" style={{ minHeight: chessboardSize }}>
              <ChessboardSVG
                fen={getFen()}
                squareDarkColour="var(--theme)"
                squareLightColour="var(--theme-secondary)"
              />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
