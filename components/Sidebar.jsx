import React from 'react';
import Link from 'next/link';

import SmoothCollapse from 'react-smooth-collapse';

import SettingsModal from './SettingsModal';
import SidebarOptions from './SidebarOptions';
import { useWindowSize } from '../functions/hooks';

export default function Sidebar() {
  const window = useWindowSize();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-display">
        <Link href="/train">
          <div className="pad-5 hover sidebar-logo">
            <img
              src={`/media/images/logo${window < 1600 ? 'Thin' : 'Small'}.png`}
              alt="Chess Openings Logo"
              width={window <= 1600 ? 230 : 140}
              height={window <= 1600 ? 75 : 100}
            />
          </div>
        </Link>

        {window <= 840 ? (
          <button
            className={`hamburger hamburger--collapse ${menuOpen && 'is-active'}`}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        ) : (
          <SidebarOptions setMenuOpen={setMenuOpen} setShowModal={setShowModal} />
        )}
      </div>

      <SmoothCollapse expanded={menuOpen}>
        <SidebarOptions setMenuOpen={setMenuOpen} setShowModal={setShowModal} />
      </SmoothCollapse>

      <SettingsModal showModal={showModal} setShowModal={setShowModal} />
      <div className={`modal-background ${!showModal && 'fade-background'}`} onClick={() => setShowModal(false)} />
    </div>
  );
}
