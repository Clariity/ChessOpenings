import React from 'react';
import Link from 'next/link';

import TrainSummaryDisplay from './TrainSummaryDisplay';
import { useWindowSize } from '../../functions/hooks';

export default function TrainDisplay({ openingsCompleted, opening, openingsFailed, selectedOpenings, started }) {
  const window = useWindowSize();
  const endReached = openingsCompleted.length || openingsFailed.length;

  React.useEffect(() => {
    if (window > 1599 && opening) {
      document.getElementById(`${opening.label}-panel`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (opening) {
      document.getElementById('panel-scroll-display').scrollBy({ top: 34, behavior: 'smooth', block: 'center' });
    }
  }, [opening]);

  function getIcon(label) {
    if (openingsCompleted.includes(label)) return <i className="material-icons pad-5-r">done</i>;
    if (openingsFailed.includes(label)) return <i className="material-icons pad-5-r">clear</i>;
    return <i className="material-icons pad-5-r">horizontal_rule</i>;
  }

  return (
    <>
      {started ? (
        selectedOpenings.map((o) => (
          <div
            key={o.label}
            id={`${o.label}-panel`}
            className={`
                panel-scroll-display-opening
                ${openingsCompleted.includes(o.label) && 'completed'} 
                ${openingsFailed.includes(o.label) && 'failed'}
                ${opening.label === o.label && 'current'}
              `}
          >
            {getIcon(o.label)}
            {o.label}
          </div>
        ))
      ) : endReached ? (
        <TrainSummaryDisplay openingsCompleted={openingsCompleted} openingsFailed={openingsFailed} />
      ) : (
        <>
          <p className="chessboard-header pad-20-b">
            <span className="chessboard-header-special">Select Opening</span> to Train and{' '}
            <span className="chessboard-header-special">Press Start</span> to Begin
          </p>
          <p className="chessboard-header pad-20-b">
            Test your openings knowledge and see how many openings you can complete without making a mistake.
          </p>
          <p className="chessboard-header pad-20-b">
            Want to learn some more openings?{' '}
            <Link href="/learn">
              <span className="link hover">Click here</span>
            </Link>{' '}
            to learn some.
          </p>
        </>
      )}
    </>
  );
}
