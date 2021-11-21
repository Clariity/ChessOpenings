import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SmoothCollapse from 'react-smooth-collapse';

import SettingsModal from '../modals/SettingsModal';
import MenuButton from './MenuButton';
import NavbarDisplayLinks from './NavbarDisplayLinks';
import NavbarMenuLinks from './NavbarMenuLinks';
import { useWindowSize } from '../../functions/hooks';
import { NavbarAuthButton } from './NavbarAuthButton';

export default function Navbar() {
  const window = useWindowSize();
  const { pathname } = useRouter();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  function getSubTitle() {
    return <span className="navbar-logo-text-subtitle">{pathname.split('/')?.[1] || 'home'}</span>;
  }

  return (
    <div className="navbar">
      {window && (
        <div className="navbar-display">
          <div className="navbar-logo-container">
            <Link href="/">
              <div className="navbar-logo">
                <Image
                  priority={true}
                  className="navbar-logo-image"
                  src="/media/images/logo2.png"
                  alt="Chess Openings Logo"
                  width={window <= 550 ? 30 : 60}
                  height={window <= 550 ? 30 : 60}
                />
                <h1 className="navbar-logo-text">ChessOpenings • {getSubTitle()}</h1>
              </div>
            </Link>
          </div>

          {window <= 1600 ? (
            <div className="flex-row navbar-menu-button">
              {window >= 700 && <NavbarAuthButton />}
              <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          ) : (
            <NavbarDisplayLinks setMenuOpen={setMenuOpen} setShowModal={setShowModal} showModal={showModal} />
          )}
        </div>
      )}

      <SmoothCollapse expanded={menuOpen}>
        <NavbarMenuLinks setMenuOpen={setMenuOpen} setShowModal={setShowModal} showModal={showModal} window={window} />
      </SmoothCollapse>

      {showModal && <SettingsModal setShowModal={setShowModal} />}
    </div>
  );
}
