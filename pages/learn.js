import { learnOutlined } from '../data/icons';
import { useData } from '../context/data-context';
import { Header } from '../components/utils/Header';
import { LoadingSpinner } from '../components/utils/LoadingSpinner';
import { OpeningsList } from '../components/learn/OpeningsList';
import { SEO } from '../components/utils/SEO';

export default function Learn() {
  const { openingGroups, loadingError } = useData();

  // TODO: Make error component
  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <div className="container flex flex-col">
      <SEO
        description="Learn variations for Chess openings and be prepared for whatever your opponent may throw at you. Learn a completely new Chess opening today and try it out when you next play some games."
        title="learn"
        path="/learn"
      />
      <Header icon={learnOutlined} heading="Learn Chess Openings" />
      {openingGroups ? (
        <OpeningsList groups={openingGroups} type="learn" />
      ) : (
        <div className="flex justify-center h-full">
          <LoadingSpinner
            img={
              <img
                className="rounded-md"
                src="/media/images/logo.png"
                alt="Chess Openings Logo"
                width={100}
                height={100}
              />
            }
            text="Loading..."
          />
        </div>
      )}
    </div>
  );
}
