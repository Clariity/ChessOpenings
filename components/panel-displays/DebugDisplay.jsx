export default function DebugDisplay({ history }) {
  return (
    <>
      <p className="chessboard-header pad-20-b">
        Step through the moves you wish to submit and click the{' '}
        <span className="chessboard-header-special">Add Moves to Form</span> button to return to the contribute page
        with the entered moves.
      </p>
      {history?.length > 0 && <h2 className="text-align-center completed">Moves</h2>}
      <div>
        {history?.map(
          (move, i) =>
            i % 2 === 0 && (
              <div
                key={i}
                className={`pad-5-tb font-size-20 ${
                  (history.length - 2 === i || history.length - 1 === i) && 'current'
                }`}
              >{`${i / 2 + 1}. ${move.san}, ${history[i + 1] ? history[i + 1].san : ''}`}</div>
            )
        )}
      </div>
    </>
  );
}
