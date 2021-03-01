import React from 'react';
import Image from 'next/image';
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
      {window && (
        <div className="sidebar-display">
          <Link href="/train">
            <div className="pad-5 hover sidebar-logo">
              {window < 1600 ? (
                <Image src="/media/images/logoThin.png" alt="Chess Openings Logo" width={230} height={75} />
              ) : (
                <Image src="/media/images/logoSmall.png" alt="Chess Openings Logo" width={140} height={100} />
              )}
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
      )}

      <SmoothCollapse expanded={menuOpen}>
        <SidebarOptions setMenuOpen={setMenuOpen} setShowModal={setShowModal} />
      </SmoothCollapse>

      <SettingsModal showModal={showModal} setShowModal={setShowModal} />
      <div className={`modal-background ${!showModal && 'fade-background'}`} onClick={() => setShowModal(false)} />
    </div>
  );
}
