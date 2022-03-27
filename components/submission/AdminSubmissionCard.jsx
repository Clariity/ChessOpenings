import { ChessboardSVG } from 'react-chessboard-svg';
import Chess from 'chess.js';
import Link from 'next/link';

import { openingChoices } from '../../data/consts';
import { Badge } from '../utils/Badge';

export function AdminSubmissionCard({ submission, index }) {
  function getFen() {
    const fen = openingChoices.find((o) => o.label === submission.data.label);
    if (fen) return fen.fen;
    const game = new Chess();
    submission.data.value.forEach((move) => {
      game.move({ from: move.from, to: move.to });
    });
    return game.fen();
  }

  return (
    <Link href={`/admin/submissions/${submission.id}`}>
      <div className="flex my-4 p-4 rounded-md cursor-pointer bg-secondary transition duration-100 ease-in-out transform hover:scale-105">
        <div className="flex flex-col w-3/4">
          <div className="flex justify-between pr-4">
            {`#${index}`}
            <Badge status={submission.status} />
          </div>
          <h2 className="text-xl">{submission.data.label}</h2>
          <p>Type: {submission.type}</p>
          <p>Submitted: {new Date(submission.timestamp._seconds * 1000).toDateString()}</p>
          <p className="mt-auto">Contributor: {submission.contributorDisplayName}</p>
        </div>
        <div id="board" className="w-1/4">
          <ChessboardSVG fen={getFen()} squareDarkColour="var(--theme)" squareLightColour="var(--theme-secondary)" />
        </div>
      </div>
    </Link>
  );
}
