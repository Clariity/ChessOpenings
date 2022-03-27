import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

import {
  contributeFilled,
  contributeOutlined,
  helpFilled,
  helpOutlined,
  homeFilled,
  homeOutlined,
  learnFilled,
  learnOutlined,
  trainFilled,
  trainOutlined,
  settingsOutlined,
  trapsFilled,
  trapsOutlined
} from '../../data/icons';
import { useData } from '../../context/data-context';
import { useWindowSize } from '../../functions/hooks';
import { Button } from '../utils/Button';
import { Logo } from '../utils/Logo';

export function NavbarLogo() {
  const { pathname } = useRouter();
  const path = pathname.split('/')?.[1];

  return (
    <div className="flex p-2 pr-0 sm:p-2 w-1/2 md:w-1/3">
      <Link href="/">
        <a className="flex text-fg-primary hover:text-theme">
          <div className="flex justify-center">
            <div className="w-8 sm:w-14">
              <Logo />
            </div>
          </div>
          <h1 className="text-md xl:text-2xl my-auto ml-2 sm:mx-2">ChessOpenings</h1>
        </a>
      </Link>
      {pathname !== '/' && (
        <div className="hidden lg:flex ">
          <span className="text-md xl:text-3xl my-auto text-fg-primary">•</span>
          <Link href={`/${path}`}>
            <a className="flex justify-center text-fg-primary hover:text-theme">
              <h2 className="text-md xl:text-2xl my-auto mx-2">{path}</h2>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

function NavbarLink({ icon, path, tooltip, isEndLink }) {
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();
  const onPage = path === '/' ? pathname === path : pathname.includes(path);
  let size = 30;
  if (windowSize >= 1024) size = 36;

  return (
    <Link href={path}>
      <a
        aria-label={`Link to ${tooltip}`}
        className={`${onPage ? 'fill-theme' : 'fill-fg-primary'} hover:fill-theme mx-2 ${isEndLink ? '' : 'w-1/5'}`}
      >
        <ReactTooltip
          id={`navbar-link-${tooltip}`}
          place="bottom"
          effect="solid"
          backgroundColor="black"
          offset={{ top: 20 }}
        />
        <div
          className={`mx-auto h-14 md:h-20 border-t-4 border-b-4 border-t-secondary ${
            onPage ? 'border-b-theme' : 'border-b-secondary'
          }`}
          data-for={`navbar-link-${tooltip}`}
          data-tip={tooltip}
        >
          <svg
            className="mx-auto h-full"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            {icon}
          </svg>
        </div>
      </a>
    </Link>
  );
}

function NavbarBurgerLink({ icon, label, onClick, path }) {
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();
  const onPage = path === '/' ? pathname === path : pathname.includes(path);
  let size = 30;
  if (windowSize >= 1024) size = 36;

  return (
    <Link href={path}>
      <a
        className={`flex justify-center items-center hover:fill-theme hover:text-theme py-4 ${
          onPage ? 'fill-theme text-theme' : 'fill-fg-primary text-fg-primary'
        } `}
        onClick={onClick}
      >
        <svg className="h-full mr-4" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
          {icon}
        </svg>
        <p className="text-2xl">{label}</p>
      </a>
    </Link>
  );
}

export function NavbarCenterLinks() {
  const { pathname } = useRouter();

  return (
    <div className="hidden md:flex just w-1/3 h-full">
      <NavbarLink icon={pathname === '/' ? homeFilled : homeOutlined} path="/" tooltip="Home" />
      <NavbarLink icon={pathname === '/learn' ? learnFilled : learnOutlined} path="/learn" tooltip="Learn" />
      <NavbarLink icon={pathname === '/train' ? trainFilled : trainOutlined} path="/train" tooltip="Train" />
      <NavbarLink
        icon={pathname === '/traps' ? trapsFilled : trapsOutlined}
        path="/traps"
        tooltip="Traps and Mistakes"
      />
      <NavbarLink
        icon={pathname === '/contribute' ? contributeFilled : contributeOutlined}
        path="/contribute"
        tooltip="Contribute"
      />
    </div>
  );
}

export function NavbarEndLinks({ menuOpen, setMenuOpen, setShowSettingsModal }) {
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();

  let size = 30;
  if (windowSize >= 1024) size = 36;

  return (
    <div className="flex justify-end items-center w-1/2 md:w-1/3 mr-2 md:mr-0">
      <NavbarAuthButton />
      <div className="hidden sm:flex items-center">
        <NavbarLink icon={pathname === '/help' ? helpFilled : helpOutlined} path="/help" tooltip="Help" isEndLink />
        <ReactTooltip
          id="navbar-link-settings"
          place="bottom"
          effect="solid"
          backgroundColor="black"
          offset={{ top: 20 }}
        />
        <div
          className="fill-fg-primary hover:fill-theme cursor-pointer mx-2 h-14 md:h-20"
          data-tip="Settings"
          data-for="navbar-link-settings"
          onClick={() => {
            setShowSettingsModal(true);
            setMenuOpen(false);
          }}
        >
          <svg
            className="mx-auto h-full"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            {settingsOutlined}
          </svg>
        </div>
      </div>
      <NavbarBurgerMenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
}

function NavbarAuthButton() {
  const { userData } = useData();
  const { pathname } = useRouter();
  const onPage = pathname.includes('/user');

  // currently loading user
  if (userData === undefined) {
    return null;
  }

  return userData ? (
    <Link href={`/user/${userData.uid}`}>
      <a className="mx-2">
        <ReactTooltip
          id="navbar-link-profile"
          place="bottom"
          effect="solid"
          backgroundColor="black"
          offset={{ top: 20 }}
        />
        <div
          className={`flex items-center mx-auto h-14 md:h-20 border-t-4 border-b-4 border-t-secondary ${
            onPage ? 'border-b-theme' : 'border-b-secondary'
          }`}
          data-for="navbar-link-profile"
          data-tip="Profile"
        >
          <img
            className="rounded-full object-cover border-4 border-secondary hover:border-2"
            src={userData?.displayPictureURL || '/media/images/default.png'}
            alt="default user"
            width={40}
            height={40}
          />
        </div>
      </a>
    </Link>
  ) : (
    pathname !== '/sign-in' && (
      <Link href="/sign-in">
        <a className="mr-2">
          <Button>Sign In</Button>
        </a>
      </Link>
    )
  );
}

export function NavbarBurgerMenuButton({ menuOpen, setMenuOpen }) {
  const [hover, setHover] = useState(false);
  const baseClasses =
    'block absolute h-0.5 w-full rounded-lg opacity-100 left-0 rotate-0 transition-all duration-200 ease-in-out';

  return (
    <button
      className="w-7 h-6 relative flex md:hidden cursor-pointer mx-2 mt-2"
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        className={`top-0 ${baseClasses} ${hover ? 'bg-theme-hover' : 'bg-fg-primary'} ${menuOpen ? 'hidden' : ''}`}
      />
      <span
        className={`top-2 ${baseClasses} ${hover ? 'bg-theme-hover' : 'bg-fg-primary'} ${menuOpen ? 'rotate-45' : ''}`}
      />
      <span
        className={`top-2 ${baseClasses} ${hover ? 'bg-theme-hover' : 'bg-fg-primary'} ${menuOpen ? '-rotate-45' : ''}`}
      />
      <span
        className={`top-4 ${baseClasses} ${hover ? 'bg-theme-hover' : 'bg-fg-primary'} ${menuOpen ? 'hidden' : ''}`}
      />
    </button>
  );
}

export function NavbarBurgerMenu({ menuOpen, setMenuOpen, setShowSettingsModal }) {
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();

  let size = 30;
  if (windowSize >= 768) setMenuOpen(false);

  return (
    <>
      <div
        className={`overflow-hidden absolute w-full bg-secondary transition-[max-height] ${
          menuOpen ? 'duration-500 max-h-full' : 'duration-200 max-h-0'
        }`}
      >
        <NavbarBurgerLink
          icon={pathname === '/' ? homeFilled : homeOutlined}
          path="/"
          label="Home"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/learn' ? learnFilled : learnOutlined}
          path="/learn"
          label="Learn"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/train' ? trainFilled : trainOutlined}
          path="/train"
          label="Train"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/traps' ? trapsFilled : trapsOutlined}
          path="/traps"
          label="Traps & Mistakes"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/contribute' ? contributeFilled : contributeOutlined}
          path="/contribute"
          label="Contribute"
          onClick={() => setMenuOpen(false)}
        />
        <NavbarBurgerLink
          icon={pathname === '/help' ? helpFilled : helpOutlined}
          path="/help"
          label="Help"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className="flex justify-center items-center fill-fg-primary hover:fill-theme hover:text-theme cursor-pointer py-4"
          onClick={() => {
            setShowSettingsModal(true);
            setMenuOpen(false);
          }}
        >
          <svg
            className="h-full mr-4"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
          >
            {settingsOutlined}
          </svg>
          <p className="text-2xl">Settings</p>
        </div>
      </div>
    </>
  );
}
