import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ReactTooltip from 'react-tooltip';

export default function NavbarDisplayLinks({ setMenuOpen, setShowModal, showModal }) {
  const { pathname } = useRouter();

  return (
    <>
      <ReactTooltip place="bottom" effect="solid" />
      <div className="navbar-display-links">
        <Link href="/">
          <div className={`navbar-display-link ${pathname === '/' && 'navbar-display-link-selected'}`} data-tip="Home">
            <i className="las la-home navbar-display-link-icon" />
          </div>
        </Link>

        <Link href="/learn">
          <div
            className={`navbar-display-link ${pathname === '/learn' && 'navbar-display-link-selected'}`}
            data-tip="Learn"
          >
            <i className="las la-graduation-cap navbar-display-link-icon" />
          </div>
        </Link>

        <Link href="/train">
          <div
            className={`navbar-display-link ${pathname === '/train' && 'navbar-display-link-selected'}`}
            data-tip="Train"
          >
            <i className="las la-dumbbell navbar-display-link-icon" />
          </div>
        </Link>

        <Link href="/traps">
          <div
            className={`navbar-display-link ${pathname === '/traps' && 'navbar-display-link-selected'}`}
            data-tip="Traps"
          >
            <i className="las la-compress-arrows-alt navbar-display-link-icon" />
          </div>
        </Link>
        <Link href="/contribute">
          <div
            className={`navbar-display-link ${
              (pathname === '/contribute' || pathname === '/debug') && 'navbar-display-link-selected'
            }`}
            data-tip="Contribute"
          >
            <i className="las la-plus navbar-display-link-icon" />
          </div>
        </Link>
      </div>
      <div className="navbar-display-settings">
        <Link href="/help">
          <div
            className={`navbar-display-link ${pathname === '/help' && 'navbar-display-link-selected'}`}
            style={{ marginRight: '20px' }}
            data-tip="Help & Contact"
          >
            <i className="las la-question-circle navbar-display-link-icon" />
          </div>
        </Link>
        <div
          className={`navbar-display-link ${showModal && 'navbar-display-link-selected'}`}
          data-tip="Settings"
          onClick={() => {
            setShowModal(true);
            setMenuOpen(false);
          }}
        >
          <i className="las la-cog navbar-display-link-icon" />
        </div>
      </div>
    </>
  );
}
