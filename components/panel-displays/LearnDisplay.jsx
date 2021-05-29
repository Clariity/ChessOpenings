import { useState } from 'react';
import Link from 'next/link';

import Chess from 'chess.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function LearnDisplay({ history, opening }) {
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);

  function handlePGN() {
    const chess = new Chess();
    chess.header('White', 'White', 'Black', 'Black');
    opening.value.forEach((move) => {
      chess.move({ from: move.from, to: move.to });
    });
    return chess.pgn();
  }

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
      <CopyToClipboard
        text={'https://chessopenings.co.uk/learn?openingLink=' + opening.label}
        onCopy={() => {
          setCopied(true);
          setExported(false);
        }}
      >
        <div className="margin-10-t pad-10-tb flex-row flex-justify panel-summary-opening-link">
          <i
            className="las la-link navbar-display-link-icon navbar-display-link-selected"
            style={{ fontSize: '32px' }}
          />
          {`Share Link - ${copied ? 'Copied' : 'Click to Copy'}`}
        </div>
      </CopyToClipboard>
      <CopyToClipboard
        text={handlePGN()}
        onCopy={() => {
          setCopied(false);
          setExported(true);
        }}
      >
        <div className="margin-10-t pad-10-tb flex-row flex-justify panel-summary-opening-link">
          <i
            className="las la-chess-board navbar-display-link-icon navbar-display-link-selected"
            style={{ fontSize: '32px' }}
          />
          {`Export to PGN - ${exported ? 'Copied' : 'Click to Copy'}`}
        </div>
      </CopyToClipboard>
    </>
  ) : (
    <>
      <p className="chessboard-header pad-20-b">
        <span className="link">Select Opening</span> above to Learn
      </p>
      <p className="chessboard-header pad-20-b">Step through the opening moves and learn how each opening is played.</p>
      <p className="chessboard-header pad-20-b">
        Want to test your opening knowledge?{' '}
        <Link href="/train">
          <span className="link hover">Click here</span>
        </Link>{' '}
      </p>
    </>
  );
}
