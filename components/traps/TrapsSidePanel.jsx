import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { LearnDisplay } from '../learn/LearnDisplay';
import { SidePanel } from '../chessboard/SidePanel';

export function TrapsSidePanel() {
  const { opening, setOpening } = useChessboard();
  const { traps, loadingError, setLoadingError } = useData();
  const {
    pathname,
    query: { group, openingLink }
  } = useRouter();
  const [openings, setOpenings] = useState();

  useEffect(() => {
    if (traps) {
      document.getElementById('panel-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [traps, pathname]);

  // Set openings list
  useEffect(() => {
    if (traps && !openings) {
      const openingGroup = traps.find((o) => o.label === group);
      if (openingGroup) {
        setOpenings(openingGroup.options);
      } else setLoadingError('Opening Group Not Found');
    }
  }, [group, traps, openings, setOpenings, setLoadingError]);

  // Set opening on load with URL param
  useEffect(() => {
    if (traps && openingLink && !opening) {
      const o = traps.flatMap((o) => o.options).filter((o) => o.label === openingLink)[0];
      setOpening(o);
    }
  }, [openingLink, traps, opening, setOpening]);

  // Scroll chessboard into view when opening is selected
  useEffect(() => {
    if (opening) {
      document.getElementById('board').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [opening]);

  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <SidePanel title="Learn Opening Traps">
      <LearnDisplay openings={openings} />
    </SidePanel>
  );
}
