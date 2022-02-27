import { LinkButton } from '../components/utils/Button';
import { SEO } from '../components/utils/SEO';

export default function NotFound() {
  return (
    <div className="flex flex-col max-w-[512px] mb-10 w-full">
      <SEO description="Page Not Found" title="404" path="/" />

      <div className="flex flex-col items-center my-8">
        <img className="rounded-lg" src="/media/images/logo.png" alt="Chess Openings Logo" width={80} height={80} />
        <h1 className="text-xl xs:text-2xl sm:text-3xl mt-4">404</h1>
      </div>

      <p className="text-lg mb-4">
        Looks like the page you tried to access doesn&apos;t exist. Try your luck with the Home page.
      </p>

      <LinkButton fill link="/">
        Home Page
      </LinkButton>
    </div>
  );
}
