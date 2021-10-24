import { useMemo } from 'react';
import { Chessboard as Board } from 'react-chessboard';
import Link from 'next/link';
import Chess from 'chess.js';

import Badge from '../utils/Badge';
import { chessPieces } from '../../data/consts';
import { useChessboardSize } from '../../functions/hooks';
import { useSettings } from '../../context/settings-context';

export default function SubmissionCard({ submission, index }) {
  const { chessboardSize } = useChessboardSize();
  const { theme } = useSettings();
  const customPieces = useMemo(() => chessPieces(theme?.value), [theme]);

  const game = new Chess();
  submission.data.value.forEach((move) => {
    game.move({ from: move.from, to: move.to });
  });

  return (
    <Link href={`/admin/submissions/${submission.id}`}>
      <div className="margin-20-b pad-10 submission-card">
        <div className="submission-card-data">
          {`#${index}`}
          <Badge status={submission.status} customStyles={{ margin: '10px 10px auto 0px' }} />
          <h3>{submission.data.label}</h3>
          <p>Type: {submission.type}</p>
          <p>Submitted: {new Date(submission.timestamp._seconds * 1000).toDateString()}</p>
          {submission.updated && <p>Updated: {new Date(submission.updated._seconds * 1000).toDateString()}</p>}
          <p>Contributor: {submission.contributor}</p>
        </div>
        <div className="chessboard-header submission-card-board">
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
