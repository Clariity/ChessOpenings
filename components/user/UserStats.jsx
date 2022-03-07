import VisibilitySensor from 'react-visibility-sensor';

import { useStats, useWindowSize } from '../../functions/hooks';
import { CountUp } from '../utils/CountUp';
import { ProgressBar } from '../utils/ProgressBar';
import { ProgressCircle } from '../utils/ProgressCircle';

export function UserStats({ stats }) {
  const {
    noOfOpenings,
    noOfOpeningsMastered,
    noOfOpeningVariationsMastered,
    noOfVariations,
    noOfVariationsAttempted,
    noOfVariationsPassed,
    trainStats
  } = useStats({
    stats
  });
  const { windowSize } = useWindowSize();

  let progressSize = 200;
  if (windowSize >= 768) {
    progressSize = 250;
  }

  return (
    <div className="">
      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
          <div className="flex flex-wrap items-center w-full 2xl:w-2/5 mb-8">
            <div className="flex flex-col items-center w-full xs:w-1/2">
              <h4 className="text-md md:text-xl my-4">Openings Mastered</h4>
              <ProgressCircle
                progress={isVisible ? (noOfOpeningsMastered / noOfOpenings) * 100 : 0}
                showMastery
                strokeWidth={8}
                text={`${noOfOpeningsMastered} / ${noOfOpenings}`}
                width={progressSize}
              />
            </div>
            <div className="flex flex-col items-center w-full xs:w-1/2">
              <h4 className="text-md md:text-xl my-4">Variations Mastered</h4>
              <ProgressCircle
                progress={isVisible ? (noOfOpeningVariationsMastered / noOfVariations) * 100 : 0}
                showMastery
                strokeWidth={8}
                text={`${noOfOpeningVariationsMastered} / ${noOfVariations}`}
                width={progressSize}
              />
            </div>
          </div>
        )}
      </VisibilitySensor>

      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
          <div className="flex mb-8 w-full">
            <CountUp duration={0.5} label="Variations Attempted" value={isVisible ? noOfVariationsAttempted : 0} />
            <CountUp duration={0.5} label="Variations Passed" value={isVisible ? noOfVariationsPassed : 0} />
          </div>
        )}
      </VisibilitySensor>

      <VisibilitySensor partialVisibility>
        {({ isVisible }) => (
          <>
            <h4 className="text-md md:text-xl text-center mb-4">Closest Milestones</h4>
            {trainStats.length === 0 && (
              <p className="text-center">Train some opening variations for your milestones to show here.</p>
            )}
            {trainStats
              ?.filter((t) => t.distanceToNextGrade > 0)
              ?.map((t, i) => i < 3 && <ProgressBar key={i} isVisible={isVisible} stats={t} />)}
          </>
        )}
      </VisibilitySensor>
    </div>
  );
}
