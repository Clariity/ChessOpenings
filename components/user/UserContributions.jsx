import { ChessboardSVG } from 'react-chessboard-svg';
import Chess from 'chess.js';
import Link from 'next/link';

import { openingChoices } from '../../data/consts';
import { useChessboardSize } from '../../functions/hooks';

export function UserContributions({ contributions }) {
  const latestContributions = [...contributions].splice(0, 4);
  return (
    <div className="flex flex-wrap">
      {latestContributions.map((c) => (
        <ContributionBoard key={c.id} contribution={c} />
      ))}
    </div>
  );
}

function ContributionBoard({ contribution }) {
  const { chessboardSize } = useChessboardSize();
  const labelComponents = contribution.data.label.split(':');
  const urlText = `/${getRouteByType(contribution.type.toLowerCase())}/${encodeURIComponent(
    labelComponents[0]
  )}?openingLink=${encodeURIComponent(contribution.data.label)}`;

  function getRouteByType(type) {
    switch (type) {
      case 'trap':
        return 'traps';
      default:
        return 'learn';
    }
  }

  const game = new Chess();
  contribution.data.value.forEach((move) => {
    game.move({ from: move.from, to: move.to });
  });

  function getFen() {
    const fen = openingChoices.find((o) => o.label === contribution.data.label);
    if (fen) return fen.fen;
    const game = new Chess();
    contribution.data.value.forEach((move) => {
      game.move({ from: move.from, to: move.to });
    });
    return game.fen();
  }

  return (
    <Link href={urlText}>
      <a className="flex flex-col w-1/2 px-1 mb-4 lg:w-1/4 lg:px-2 lg:first-of-type:pl-0 lg:first-of-type:pr-4 lg:last-of-type:pl-4 lg:last-of-type:pr-0 transition duration-100 ease-in-out transform lg:hover:scale-105">
        <div id="board" className="bg-secondary text-lg lg:text-xl text-center p-2">
          {contribution.type}
        </div>
        <div className="relative z-10" style={{ minHeight: chessboardSize }}>
          <ChessboardSVG fen={getFen()} squareDarkColour="var(--theme)" squareLightColour="var(--theme-secondary)" />
        </div>
        <div className="bg-secondary text-lg lg:text-xl text-center p-2 flex flex-grow justify-center items-center">
          {contribution.data.label}
        </div>
      </a>
    </Link>
  );
}
