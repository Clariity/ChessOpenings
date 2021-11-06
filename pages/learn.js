import OpeningsList from '../components/learn/OpeningsList';
import { useData } from '../context/data-context';
import { LoadingSpinner } from '../components/utils/LoadingSpinner';
import { SEO } from '../components/utils/SEO';

export default function Learn() {
  const { openingGroups, loadingError } = useData();

  // TODO: Make error component
  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex-column container">
      <SEO
        description="Learn variations for Chess openings and be prepared for whatever your opponent may throw at you. Learn a completely new Chess opening today and try it out when you next play some games."
        title="learn"
        path="/learn"
      />
      <h1 className="page-title pad-10-lr flex-row flex-align">
        <i className="las la-graduation-cap learn-title-icon" />
        Learn Chess Openings
      </h1>
      {openingGroups ? (
        <OpeningsList groups={openingGroups} type="learn" />
      ) : (
        <LoadingSpinner
          img={
            <img
              className="navbar-logo-image"
              src="/media/images/logo2.png"
              alt="Chess Openings Logo"
              width={100}
              height={100}
            />
          }
          text="Loading..."
        />
      )}
    </div>
  );
}
