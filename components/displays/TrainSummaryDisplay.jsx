import { useEffect } from 'react';
import Link from 'next/link';

export default function TrainSummaryDisplay({ openingsCompleted, openingsFailed }) {
  useEffect(() => {
    document.getElementById('summary').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div>
      <h1 id="summary" className="text-align-center">
        Summary
      </h1>
      <h2 className="completed">Openings Completed: {openingsCompleted.length}</h2>
      {openingsCompleted.map((opening) => (
        <div key={opening.label} className="panel-scroll-display-opening">
          {opening.label}
        </div>
      ))}
      <h2 className="failed">Openings Failed: {openingsFailed.length}</h2>
      {openingsFailed.map((opening) => (
        <div key={opening.label} className="panel-scroll-display-opening">
          <div className="panel-summary-opening">{opening.label}</div>
          <Link
            href={{
              pathname: `/learn/${encodeURIComponent(opening.label.split(':')[0])}`,
              query: { openingLink: opening.label }
            }}
          >
            <div className="pad-10 flex-row panel-summary-opening-link">
              <i
                className="las la-graduation-cap navbar-display-link-icon navbar-display-link-selected"
                style={{ fontSize: '32px' }}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
