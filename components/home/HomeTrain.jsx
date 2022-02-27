import VisibilitySensor from 'react-visibility-sensor';

import { medal, trainOutlined } from '../../data/icons';
import { useData } from '../../context/data-context';
import { useStats, useWindowSize } from '../../functions/hooks';
import { CountUp } from '../utils/CountUp';
import { HomeCard } from './HomeCard';
import { LinkButton } from '../utils/Button';
import { ProgressBar } from '../utils/ProgressBar';
import { ProgressCircle } from '../utils/ProgressCircle';

export function HomeTrain() {
  const { userData } = useData();

  // maybe just add number of openings with a success too?

  // Don't need to show these on train section, these can be left for stats page/section
  // openings trained
  // opening variations trained

  // display specific display stats on peoples profiles (e.g. total learns, total passes, favorite opening --> most passes), with button to view more in detail, show pass rate, show somewhere the global average pass rate

  return (
    <HomeCard
      alignRight
      iconPrimary={trainOutlined}
      iconSecondary={medal}
      link="/train"
      linkText="Start Training"
      text="Test your Chess openings knowledge and see if you can remember the moves without hints. Become an openings
        master."
      titlePrimary="Train Chess Openings"
      titleSecondary="Opening Mastery"
    >
      <VisibilitySensor partialVisibility>
        {({ isVisible }) =>
          userData ? (
            <div key="visible" className="flex flex-wrap mx-2 lg:mx-4">
              <HomeTrainMastery isVisible={isVisible} userData={userData} />
              <div className="flex flex-col w-full 2xl:w-3/5">
                <HomeTrainNumbers isVisible={isVisible} userData={userData} />
                <HomeTrainMilestones isVisible={isVisible} userData={userData} />
              </div>
            </div>
          ) : (
            <HomeTrainBlurred />
          )
        }
      </VisibilitySensor>
      {userData && (
        <div className="flex lg:hidden m-2">
          <LinkButton link={`/user/${userData.uid}`} fill>
            View All Stats
          </LinkButton>
        </div>
      )}
    </HomeCard>
  );
}

function HomeTrainMastery({ isVisible, userData }) {
  const { noOfOpenings, noOfOpeningsMastered, noOfOpeningVariationsMastered, noOfVariations } = useStats({
    stats: userData.stats
  });
  const { windowSize } = useWindowSize();

  let progressSize = 200;
  if (windowSize >= 768) {
    progressSize = 250;
  }

  return (
    <div className="flex flex-wrap items-center w-full 2xl:w-2/5 mb-8">
      <div className="flex flex-col items-center w-full xs:w-1/2">
        <h4 className="text-md md:text-xl my-4">Openings Mastered</h4>
        <ProgressCircle
          progress={isVisible ? noOfOpeningsMastered / noOfOpenings : 0}
          showMastery
          strokeWidth={8}
          text={`${noOfOpeningsMastered} / ${noOfOpenings}`}
          width={progressSize}
        />
      </div>

      <div className="flex flex-col items-center w-full xs:w-1/2">
        <h4 className="text-md md:text-xl my-4">Variations Mastered</h4>
        <ProgressCircle
          progress={isVisible ? noOfOpeningVariationsMastered / noOfVariations : 0}
          showMastery
          strokeWidth={8}
          text={`${noOfOpeningVariationsMastered} / ${noOfVariations}`}
          width={progressSize}
        />
      </div>
    </div>
  );
}

function HomeTrainNumbers({ isVisible, userData }) {
  const { noOfVariationsAttempted, noOfVariationsPassed } = useStats({
    stats: userData.stats
  });

  return (
    <div className="flex mb-8 w-full">
      <CountUp duration={0.5} label="Variations Attempted" value={isVisible ? noOfVariationsAttempted : 0} />
      <CountUp duration={0.5} label="Variations Passed" value={isVisible ? noOfVariationsPassed : 0} />
    </div>
  );
}

function HomeTrainMilestones({ isVisible, userData }) {
  const { trainStats } = useStats({
    stats: userData.stats
  });

  return (
    <div>
      <h4 className="text-md md:text-xl text-center mb-4">Closest Milestones</h4>
      {trainStats.length === 0 && (
        <p className="text-center">Train some opening variations for your milestones to show here.</p>
      )}
      {trainStats?.map((t, i) => i < 3 && <ProgressBar key={i} isVisible={isVisible} stats={t} />)}
    </div>
  );
}

function HomeTrainBlurred() {
  return (
    <div className="relative">
      <img className="blur-md" src="/media/images/stats.png" alt="Chess Openings Logo" />
      <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="hidden xs:flex items-center">
          <h1 className="text-xl sm:text-4xl md:text-5xl">Want to track your stats?</h1>
        </div>
        <h2 className="text-sm sm:text-md md:text-lg text-center xs:mt-2">
          Register or Sign In to gain access to stats, achievements and more
        </h2>
        <div className="flex w-full mt-2 xs:mt-4 justify-center">
          <div className="flex justify-end mr-4 w-full">
            <LinkButton link="/register">Register</LinkButton>
          </div>
          <div className="flex justify-start ml-4 w-full">
            <LinkButton link="sign-in">Sign In</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
