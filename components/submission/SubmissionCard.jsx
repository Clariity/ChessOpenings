import { useMemo } from 'react';
import { Chessboard as Board } from 'react-chessboard';
import Chess from 'chess.js';
import Link from 'next/link';

import { chessPieces } from '../../data/consts';
import { useChessboardSize } from '../../functions/hooks';
import { useSettings } from '../../context/settings-context';
import { Badge } from '../utils/Badge';

export function SubmissionCard({ submission, index }) {
  const { chessboardSize } = useChessboardSize();
  const { theme } = useSettings();
  const customPieces = useMemo(() => chessPieces(theme?.value), [theme]);

  const game = new Chess();
  submission.data.value.forEach((move) => {
    game.move({ from: move.from, to: move.to });
  });

  return (
    <Link href={`/admin/submissions/${submission.id}`}>
      <div className="flex my-4 p-4 rounded-md cursor-pointer bg-darker transition duration-100 ease-in-out transform hover:scale-105">
        <div className="flex flex-col w-3/4">
          <div className="flex justify-between pr-4">
            {`#${index}`}
            <Badge status={submission.status} />
          </div>
          <h2 className="text-xl">{submission.data.label}</h2>
          <p>Type: {submission.type}</p>
          <p>Submitted: {new Date(submission.timestamp._seconds * 1000).toDateString()}</p>
          {submission.updated && <p>Updated: {new Date(submission.updated._seconds * 1000).toDateString()}</p>}
          <p className="mt-auto">Contributor: {submission.contributorDisplayName}</p>
        </div>
        <div id="board" className="w-1/4">
          <Board
            id={submission.id}
            arePiecesDraggable={false}
            boardOrientation={'white'}
            boardWidth={chessboardSize}
            customDarkSquareStyle={theme?.darkSquareStyle}
            customLightSquareStyle={theme?.lightSquareStyle}
            customPieces={customPieces}
            position={game?.fen()}
          />
        </div>
      </div>
    </Link>
  );
}
