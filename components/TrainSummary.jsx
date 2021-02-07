import React from 'react';
import Link from 'next/link';

export default function TrainSummary({ openingsCompleted, openingsFailed }) {
  React.useEffect(() => {
    document.getElementById('summary').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  return (
    <div>
      <h1 id="summary" className="text-align-center">
        Summary
      </h1>
      <h2 className="text-align-center completed">Openings Completed: {openingsCompleted.length}</h2>
      {openingsCompleted.map((openingName) => (
        <div key={openingName} className="panel-scroll-display-opening">
          {openingName}
        </div>
      ))}
      <h2 className="text-align-center failed">Openings Failed: {openingsFailed.length}</h2>
      {openingsFailed.map((openingName) => (
        <div key={openingName} className="panel-scroll-display-opening">
          <div className="panel-summary-opening">{openingName}</div>
          <Link href={{ pathname: '/learn', query: { openingLink: openingName } }}>
            <div className="pad-10 flex-row panel-summary-opening-link">
              <img src="/media/images/learn.png" alt="learn" width={30} height={30} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
