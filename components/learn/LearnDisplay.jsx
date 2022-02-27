import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Chess from 'chess.js';

import { download, share } from '../../data/icons';
import { scrollIntoView } from '../../functions/helpers';
import { useChessboard } from '../../context/board-context';
import { useWindowSize } from '../../functions/hooks';
import { Collapsible } from '../utils/Collapsible';
import { SVG } from '../utils/SVG';
import { PGN } from '../utils/PGN';

export function LearnDisplay({ openings }) {
  const { windowSize } = useWindowSize();
  const { game, opening, reset, setOpening, setUserColor, setBoardOrientation } = useChessboard();
  const [openingLabelToCopy, setOpeningLabelToCopy] = useState();
  const [openingPGNToCopy, setOpeningPGNToCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);
  const {
    pathname,
    query: { group }
  } = useRouter();

  const history = game?.history({ verbose: true });

  useEffect(() => {
    if (windowSize > 1599 && opening) {
      scrollIntoView(
        document.getElementById('panel-scroll-display'),
        document.getElementById(`opening-collapsible-${opening.label}`),
        true
      );
    }
  }, [opening, windowSize]);

  useEffect(() => {
    if (openingLabelToCopy) {
      navigator.clipboard.writeText(
        `https://chessopenings.co.uk/${pathname.split('/')[1]}/${encodeURIComponent(
          group
        )}?openingLink=${encodeURIComponent(openingLabelToCopy)}`
      );
      setCopied(true);
      setExported(false);
      setOpeningLabelToCopy('');
    }
  }, [openingLabelToCopy, group, pathname]);

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
    if (opening?.label === o.label) {
      setOpening(null);
      reset();
    } else {
      setOpening(o);
      if (o.colour) {
        setUserColor(o.colour);
        setBoardOrientation(o.colour);
      }
      reset(true);
    }
  }

  if (!openings) {
    return <div>Loading</div>;
  }

  return (
    <>
      <h2 className="text-theme text-xl text-center">{group}</h2>
      {openings.map((o) => (
        <Collapsible
          id={`opening-collapsible-${o.label}`}
          key={o.label}
          text={o.label.split(':')[1]}
          open={opening?.label === o.label}
          onClick={() => handleLearnOpeningChange(o)}
        >
          <PGN opening={o} history={history} />
          <div className="my-4 text-lg">{o.description}</div>
          <div
            className="my-2 py-2 flex justify-center rounded-md cursor-pointer hover:bg-darkest"
            onClick={() => setOpeningLabelToCopy(o.label)}
          >
            <SVG icon={share} marginRight={2} size={24} />
            {`Share Link - ${copied ? 'Copied' : 'Click to Copy'}`}
          </div>

          <div
            className="my-2 py-2 flex justify-center rounded-md cursor-pointer hover:bg-darkest"
            onClick={() => setOpeningPGNToCopy(true)}
          >
            <SVG icon={download} marginRight={2} size={24} />
            {`Export to PGN - ${exported ? 'Copied' : 'Click to Copy'}`}
          </div>
        </Collapsible>
      ))}
    </>
  );
}
