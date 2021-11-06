import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Chess from 'chess.js';

import { useChessboard } from '../../context/board-context';
import { useWindowSize } from '../../functions/hooks';
import { Collapsible } from '../utils/Collapsible';

export default function LearnDisplay({ openings }) {
  const window = useWindowSize();
  const { game, opening, reset, setOpening, setUserColor, setBoardOrientation } = useChessboard();
  const [openingLabelToCopy, setOpeningLabelToCopy] = useState();
  const [openingPGNToCopy, setOpeningPGNToCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);
  const {
    query: { group }
  } = useRouter();

  const history = game?.history({ verbose: true });

  useEffect(() => {
    if (window > 1599 && opening) {
      document
        .getElementById(`opening-collapsible-${opening.label}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }, [opening, window]);

  useEffect(() => {
    if (openingLabelToCopy) {
      navigator.clipboard.writeText(
        `https://chessopenings.co.uk/learn/${encodeURIComponent(group)}?openingLink=${encodeURIComponent(
          openingLabelToCopy
        )}`
      );
      setCopied(true);
      setExported(false);
      setOpeningLabelToCopy('');
    }
  }, [openingLabelToCopy, group]);

  useEffect(() => {
    function handlePGN() {
      const chess = new Chess();
      chess.header('White', 'White', 'Black', 'Black');
      opening?.value.forEach((move) => {
        chess.move({ from: move.from, to: move.to });
      });
      return chess.pgn();
    }

    if (openingPGNToCopy) {
      navigator.clipboard.writeText(handlePGN());
      setCopied(false);
      setExported(true);
      setOpeningPGNToCopy(false);
    }
  }, [openingPGNToCopy, opening]);

  function handleLearnOpeningChange(o) {
    setOpening(o);
    if (o.colour) {
      setUserColor(o.colour);
      setBoardOrientation(o.colour);
    }
    reset(true);
  }

  if (!openings) {
    return <div>Loading</div>;
  }

  return (
    <>
      <h2 className="text-align-center completed">{group}</h2>
      {openings.map((o) => (
        <Collapsible
          id={`opening-collapsible-${o.label}`}
          key={o.label}
          text={o.label.split(':')[1]}
          open={opening?.label === o.label}
          onClick={() => handleLearnOpeningChange(o)}
        >
          <div>
            {o.value.map(
              (move, i) =>
                i % 2 === 0 && (
                  <div
                    key={i}
                    className={`pad-5-tb font-size-20 ${
                      (history.length - 1 === i || history.length === i) && 'current'
                    }`}
                  >{`${i / 2 + 1}. ${move.san}, ${o.value[i + 1] ? o.value[i + 1].san : ''}`}</div>
                )
            )}
          </div>
          <div className="pad-20-t font-size-20">{o.description}</div>
          <div
            className="margin-10-t pad-10-tb flex-row flex-justify panel-summary-opening-link"
            onClick={() => setOpeningLabelToCopy(o.label)}
          >
            <i
              className="las la-link navbar-display-link-icon navbar-display-link-selected"
              style={{ fontSize: '32px' }}
            />
            {`Share Link - ${copied ? 'Copied' : 'Click to Copy'}`}
          </div>

          <div
            className="margin-10-t pad-10-tb flex-row flex-justify panel-summary-opening-link"
            onClick={() => setOpeningPGNToCopy(true)}
          >
            <i
              className="las la-chess-board navbar-display-link-icon navbar-display-link-selected"
              style={{ fontSize: '32px' }}
            />
            {`Export to PGN - ${exported ? 'Copied' : 'Click to Copy'}`}
          </div>
        </Collapsible>
      ))}
    </>
  );
}
