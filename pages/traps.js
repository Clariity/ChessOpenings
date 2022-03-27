import { trapsOutlined } from '../data/icons';
import { useData } from '../context/data-context';
import { Header } from '../components/utils/Header';
import { LoadingSpinner } from '../components/utils/LoadingSpinner';
import { OpeningsList } from '../components/learn/OpeningsList';
import { SEO } from '../components/utils/SEO';
import { Logo } from '../components/utils/Logo';

export default function Traps() {
  const { traps, loadingError } = useData();

  // TODO: Make error component
  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <div className="container flex flex-col">
      <SEO
        description="Learn tricky opening traps that may catch your opponent off guard if they don't know how to correctly respond. Make sure you don't get caught out by them either."
        title="traps"
        path="/traps"
      />
      <Header icon={trapsOutlined} heading="Learn Opening Traps" />
      {traps ? (
        <OpeningsList groups={traps} type="traps" />
      ) : (
        <div className="flex justify-center h-full">
          <LoadingSpinner
            img={
              <div className="w-24">
                <Logo />
              </div>
            }
            text="Loading..."
          />
        </div>
      )}
    </div>
  );
}
