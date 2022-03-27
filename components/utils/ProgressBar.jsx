import { trainFilled } from '../../data/icons';
import { OPENING_GRADES, TROPHY_COLOURS } from '../../data/consts';

export function ProgressBar({ isVisible, stats }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="flex items-center text-sm md:text-base">{stats.opening}</div>
        <div className="flex ml-auto text-sm md:text-base">
          <p className="text-theme">{`${stats.distanceToNextGrade} ${
            stats.distanceToNextGrade === 1 ? 'pass' : 'passes'
          } until ${Object.keys(OPENING_GRADES)[stats.gradeAchievedIndex + 1]}`}</p>
          <svg
            fill={Object.values(TROPHY_COLOURS)[stats.gradeAchievedIndex + 1].colour}
            className="h-full mx-1"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            {trainFilled}
          </svg>
        </div>
      </div>
      <div className="flex h-6 bg-primaryhover rounded-md">
        <div
          className="bg-theme text-white h-full mr-auto px-4 rounded-md transition-all duration-1000 flex justify-end"
          style={{
            width: isVisible
              ? `${
                  stats.whiteSuccesses !== undefined
                    ? (stats.whiteSuccesses / (stats.whiteSuccesses + stats.distanceToNextGrade)) * 100
                    : (stats.blackSuccesses / (stats.blackSuccesses + stats.distanceToNextGrade)) * 100
                }%`
              : '0%'
          }}
        >
          {stats.whiteSuccesses !== undefined ? stats.whiteSuccesses : stats.blackSuccesses}
        </div>
      </div>
    </div>
  );
}
