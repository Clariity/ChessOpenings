import { popular, trapsOutlined } from '../../data/icons';
import { useData } from '../../context/data-context';
import { ErrorMessage } from '../utils/ErrorMessage';
import { HomeCard } from './HomeCard';
import { OpeningGroup } from '../learn/OpeningGroup';

export function HomeTraps() {
  const { traps, loadingError } = useData();

  let filteredTraps;
  if (traps) {
    filteredTraps = [...traps]?.sort((a, b) => -(a.options.length - b.options.length))?.slice(0, 4);
  }

  return (
    <HomeCard
      iconPrimary={trapsOutlined}
      iconSecondary={popular}
      link="/traps"
      linkText="Show All Traps"
      text="Learn tricky opening traps that may catch your opponent off guard if they don't know how to correctly
          respond."
      titlePrimary="Learn Chess Opening Traps"
      titleSecondary="Most Popular"
    >
      {loadingError && (
        <ErrorMessage>There was an error when loading website data. Please try again later.</ErrorMessage>
      )}
      <div className="flex flex-wrap">
        {filteredTraps?.map((g) => (
          <OpeningGroup key={g.label} group={g} type="traps" />
        ))}
      </div>
    </HomeCard>
  );
}
