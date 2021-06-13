import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Chess from 'chess.js';

import Badge from '../utils/Badge';
import { chessPieces } from '../../data/consts';
import { useChessboardSize } from '../../functions/hooks';
import { useStoreContext } from '../Store';

const Board = dynamic(import('chessboardjsx'), { ssr: false });

export default function SubmissionCard({ submission }) {
  const { state } = useStoreContext();
  const chessboardSize = useChessboardSize();
  const [showBoard, setShowBoard] = useState(true);

  useEffect(() => {
    setShowBoard(false);
    setTimeout(() => {
      setShowBoard(true);
    }, 10);
  }, [state.theme]);

  const game = new Chess();
  submission.data.value.forEach((move) => {
    game.move({ from: move.from, to: move.to });
  });

  return (
    <Link href={`/admin/submissions/${submission.id}`}>
      <div className="margin-20-b pad-10 submission-card">
        <div className="submission-card-data">
          <Badge status={submission.status} customStyles={{ margin: '10px 10px auto 0px' }} />
          <h3>{submission.data.label}</h3>
          <p>Type: {submission.type}</p>
          <p>Submitted: {new Date(submission.timestamp._seconds * 1000).toDateString()}</p>
          {submission.updated && <p>Updated: {new Date(submission.updated._seconds * 1000).toDateString()}</p>}
          <p>Contributor: {submission.contributor}</p>
        </div>
        <div className="chessboard-header submission-card-board">
          {game && showBoard && (
            <Board
              id="board"
              draggable={false}
              position={game.fen()}
              orientation={submission.data.colour || 'white'}
              darkSquareStyle={state.theme.darkSquareStyle}
              lightSquareStyle={state.theme.lightSquareStyle}
              dropSquareStyle={{
                boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)'
              }}
              width={chessboardSize}
              pieces={chessPieces(state.theme.value)}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
