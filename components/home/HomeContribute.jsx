import { contributeOutlined, popular } from '../../data/icons';
import { useData } from '../../context/data-context';
import { ErrorMessage } from '../utils/ErrorMessage';
import { HomeCard } from './HomeCard';
import { LinkButton } from '../utils/Button';

export function HomeContribute() {
  const { contributorData, loadingError } = useData();

  return (
    <HomeCard
      alignRight
      iconPrimary={contributeOutlined}
      iconSecondary={popular}
      link="/contribute"
      linkText="Contribute To The Site"
      text="Become a part of ChessOpenings history. Contribute your opening knowledge and help other ChessOpenings
              users to learn valuable openings."
      titlePrimary="Contribute To ChessOpenings"
      titleSecondary="Wall Of Contributors"
    >
      {loadingError && (
        <ErrorMessage>There was an error when loading website data. Please try again later.</ErrorMessage>
      )}
      <div className="flex flex-wrap mt-2 mx-2 lg:mx-4">
        {contributorData?.map(({ displayName, link, contributions }) => {
          return (
            <div key={link} className="mr-2 mb-2">
              <LinkButton link={`/user/${link}`}>
                {displayName} - {contributions}
              </LinkButton>
            </div>
          );
        })}
      </div>
    </HomeCard>
  );
}
