import { LoadingSpinner } from '../../components/utils/LoadingSpinner';
import { SEO } from '../../components/utils/SEO';

export function UserLoading({ text }) {
  return (
    <div className="flex flex-col container">
      <SEO
        description="View user profile information, achievements and statistics."
        title="user profile"
        path="/profile"
      />
      <LoadingSpinner
        img={
          <img
            className="navbar-logo-image"
            src="/media/images/logo.png"
            alt="Chess Openings Logo"
            width={100}
            height={100}
          />
        }
        text={text || 'Loading User Data...'}
      />
    </div>
  );
}
