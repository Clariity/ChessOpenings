import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SmoothCollapse from 'react-smooth-collapse';

import SettingsModal from '../SettingsModal';
import NavbarDisplayLinks from './NavbarDisplayLinks';
import NavbarMenuLinks from './NavbarMenuLinks';
import { useWindowSize } from '../../functions/hooks';
import MenuButton from './MenuButton';

export default function Navbar() {
  const window = useWindowSize();
  const { pathname } = useRouter();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  function getSubTitle() {
    return <span className="navbar-logo-text-subtitle">{pathname.split('/')[1]}</span>;
  }

  return (
    <div className="navbar">
      {window && (
        <div className="navbar-display">
          <div className="navbar-logo-container">
            <Link href="/learn">
              <div className="navbar-logo">
                <Image
                  className="navbar-logo-image"
                  src="/media/images/logo.png"
                  alt="Chess Openings Logo"
                  width={60}
                  height={60}
                />
                <h1 className="navbar-logo-text">ChessOpenings • {getSubTitle()}</h1>
              </div>
            </Link>
          </div>

          {window <= 1600 ? (
            <div className="navbar-menu-button">
              <MenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
          ) : (
            <NavbarDisplayLinks setMenuOpen={setMenuOpen} setShowModal={setShowModal} showModal={showModal} />
          )}
        </div>
      )}

      <SmoothCollapse expanded={menuOpen}>
        <NavbarMenuLinks setMenuOpen={setMenuOpen} setShowModal={setShowModal} showModal={showModal} />
      </SmoothCollapse>

      <SettingsModal showModal={showModal} setShowModal={setShowModal} />
      <div className={`modal-background ${!showModal && 'fade-background'}`} onClick={() => setShowModal(false)} />
    </div>
  );
}
