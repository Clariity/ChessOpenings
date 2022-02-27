import { useEffect } from 'react';

import { check, clear, line } from '../../data/icons';
import { scrollIntoView } from '../../functions/helpers';
import { useWindowSize } from '../../functions/hooks';
import { TrainSummary } from './TrainSummary';
import { SVG } from '../utils/SVG';

export function TrainDisplay({ openingsCompleted, opening, openingsFailed, selectedOpenings }) {
  const { windowSize } = useWindowSize();
  const endReached = !opening && (openingsCompleted.length || openingsFailed.length);

  useEffect(() => {
    if (opening) {
      scrollIntoView(
        document.getElementById('panel-scroll-display'),
        document.getElementById(`${opening.label}-panel`),
        windowSize < 1280
      );
    }
  }, [opening, windowSize]);

  function getIcon(label) {
    if (openingsCompleted.map((o) => o.label).includes(label))
      return <SVG fill="success" icon={check} marginRight={2} size={24} />;
    if (openingsFailed.map((o) => o.label).includes(label))
      return <SVG fill="error" icon={clear} marginRight={2} size={24} />;
    return <SVG icon={line} marginRight={2} size={24} />;
  }

  return (
    <div className="flex flex-col flex-grow mb-4">
      {endReached ? (
        <TrainSummary openingsCompleted={openingsCompleted} openingsFailed={openingsFailed} />
      ) : (
        selectedOpenings.map((o) => (
          <div
            key={o.label}
            id={`${o.label}-panel`}
            className={`flex px-1 py-1 my-1 rounded-md
                ${openingsCompleted.find((completed) => completed.label === o.label) && 'border-2 border-success'} 
                ${openingsFailed.find((failed) => failed.label === o.label) && 'border-2 border-error'}
                ${opening?.label === o.label && 'bg-darkest'}
              `}
          >
            <div className="w-1/12 flex justify-center">{getIcon(o.label)}</div>
            <div className="w-11/12">{o.label}</div>
          </div>
        ))
      )}
    </div>
  );
}
