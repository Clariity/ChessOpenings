import Link from 'next/link';

export default function LearnDisplay({ history, opening }) {
  return opening ? (
    <>
      <h2 className="text-align-center completed">{opening.label}</h2>
      <div>
        {opening.value.map(
          (move, i) =>
            i % 2 === 0 && (
              <div
                key={i}
                className={`pad-5-tb font-size-20 ${(history.length - 1 === i || history.length === i) && 'current'}`}
              >{`${i / 2 + 1}. ${move.san}, ${opening.value[i + 1] ? opening.value[i + 1].san : ''}`}</div>
            )
        )}
      </div>
      <div className="pad-20-t font-size-20">{opening.description}</div>
    </>
  ) : (
    <>
      <p className="chessboard-header pad-20-b">
        <span className="chessboard-header-special">Select Opening</span> above to Learn
      </p>
      <p className="chessboard-header pad-20-b">Step through the opening moves and learn how each opening is played.</p>
      <p className="chessboard-header pad-20-b">
        Want to test your opening knowledge?{' '}
        <Link href="/train">
          <span className="chessboard-header-special hover">Click here</span>
        </Link>{' '}
      </p>
    </>
  );
}
