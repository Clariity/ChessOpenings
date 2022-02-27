import Link from 'next/link';

import { useWindowSize } from '../../functions/hooks';
import { LinkButton } from '../utils/Button';

export function HomeCard({
  alignRight,
  children,
  iconPrimary,
  iconSecondary,
  link,
  linkText,
  text,
  titlePrimary,
  titleSecondary
}) {
  const { windowSize } = useWindowSize();

  let iconSize = 40;
  if (windowSize >= 768) iconSize = 60;

  return (
    <div className="flex flex-col bg-darker mt-6 p-4 md:p-8 rounded-lg">
      <div className="flex items-center mb-4 mx-2 lg:mx-4">
        {alignRight && (
          <div className="hidden lg:flex min-w-max">
            <LinkButton link={link}>{linkText}</LinkButton>
          </div>
        )}
        <Link href={link}>
          <a
            className={`flex items-center fill-primary hover:fill-theme hover:text-theme w-full ${
              alignRight ? 'lg:justify-end' : ''
            }`}
          >
            <svg
              className="h-full mr-4"
              xmlns="http://www.w3.org/2000/svg"
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
            >
              {iconPrimary}
            </svg>
            <h2 className="text-lg sm:text-xl md:text-3xl">{titlePrimary}</h2>
          </a>
        </Link>
        {!alignRight && (
          <div className="hidden lg:flex min-w-max">
            <LinkButton link={link}>{linkText}</LinkButton>
          </div>
        )}
      </div>
      <p className={`flex items-center fill-primary mx-2 lg:mx-4 mb-4 ${alignRight ? 'justify-end' : ''}`}>{text}</p>
      <div className="flex items-center fill-primary mx-2 lg:mx-4">
        <svg
          className="h-full mr-2"
          xmlns="http://www.w3.org/2000/svg"
          width={(2 * iconSize) / 3}
          height={(2 * iconSize) / 3}
          viewBox="0 0 24 24"
        >
          {iconSecondary}
        </svg>
        <h3 className="text-md md:text-xl">{titleSecondary}</h3>
      </div>
      {children}
      <div className="flex lg:hidden m-2 mb-2 md:mb-0">
        <LinkButton link={link} fill>
          {linkText}
        </LinkButton>
      </div>
    </div>
  );
}

export function HomeCardSmall({ children }) {
  return <div className="flex flex-col bg-darker mt-6 p-4 md:p-8 rounded-lg">{children}</div>;
}
