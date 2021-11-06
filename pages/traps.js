import { useData } from '../context/data-context';
import { LoadingSpinner } from '../components/utils/LoadingSpinner';
import { SEO } from '../components/utils/SEO';
import OpeningsList from '../components/learn/OpeningsList';

export default function Traps() {
  const { traps, loadingError } = useData();

  // TODO: Make error component
  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex-column container">
      <SEO
        description="Learn tricky opening traps that may catch your opponent off guard if they don't know how to correctly respond. Make sure you don't get caught out by them either."
        title="traps"
        path="/traps"
      />
      <h1 className="page-title pad-10-lr flex-row flex-align">
        <i className="las la-compress-arrows-alt learn-title-icon" />
        Learn Opening Traps
      </h1>
      {traps ? (
        <OpeningsList groups={traps} type="traps" />
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
