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
    <div className="flex flex-col bg-secondary mt-6 p-4 md:p-8 rounded-lg shadow-md">
      <div className={`flex items-center mb-4 mx-2 lg:mx-4 ${alignRight ? 'flex-row-reverse' : ''} `}>
        <Link href={link}>
          <a className={`flex items-center fill-theme text-theme ${alignRight ? 'ml-auto lg:justify-end' : 'mr-auto'}`}>
            <svg
              className="h-full mr-4"
              xmlns="http://www.w3.org/2000/svg"
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
            >
              {iconPrimary}
            </svg>
            <h2 className="text-lg hover:underline underline-offset-2 sm:text-xl md:text-3xl">{titlePrimary}</h2>
          </a>
        </Link>
        <div className="hidden lg:flex min-w-max">
          <LinkButton link={link}>{linkText}</LinkButton>
        </div>
      </div>
      <p className={`flex items-center fill-fg-primary mx-2 lg:mx-4 mb-4 ${alignRight ? 'justify-end' : ''}`}>{text}</p>
      <div className="flex items-center fill-fg-primary mx-2 lg:mx-4">
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
  return (
    <div className="w-full xl:w-1/2 xl:first-of-type:pr-2 xl:last-of-type:pl-2 mt-6 ">
      <div className="flex flex-col bg-secondary p-4 md:p-8 rounded-lg shadow-md h-full">{children}</div>
    </div>
  );
}

export function HomeCardSmallMax({ children }) {
  return (
    <div className="w-full mb-6 break-inside-avoid">
      <div className="flex flex-col bg-secondary p-4 md:p-8 rounded-lg shadow-md h-full">{children}</div>
    </div>
  );
}
