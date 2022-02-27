import { useData } from '../../context/data-context';
import { useWindowSize } from '../../functions/hooks';
import { LinkButton } from '../utils/Button';

export function HomeTitle() {
  const { user } = useData();
  const { windowSize } = useWindowSize();

  let size = 40;
  if (windowSize >= 768) size = 80;

  return (
    <div className="relative">
      <div className="bg-hero bg-center bg-cover blur-sm py-32 md:py-60" />
      <div className="flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
        <div className="flex items-center">
          <img
            className="rounded-lg my-auto"
            src="/media/images/logo.png"
            alt="Chess Openings Logo"
            width={size}
            height={size}
          />
          <h1 className="text-2xl sm:text-4xl md:text-6xl ml-4">ChessOpenings.co.uk</h1>
        </div>
        <h2 className="text-sm sm:text-md md:text-lg text-center mt-2">
          Learn and Train Chess Openings, completely for FREE
        </h2>
        {!user && (
          <div className="flex w-full mt-4 justify-center">
            <div className="flex justify-end mr-4 w-full">
              <LinkButton link="/register">Register</LinkButton>
            </div>
            <div className="flex justify-start ml-4 w-full">
              <LinkButton link="sign-in">Sign In</LinkButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
