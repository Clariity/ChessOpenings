import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../utils/Button';

export default function NavbarDisplayLinks({ setMenuOpen, setShowModal, showModal, window }) {
  const { pathname } = useRouter();

  return (
    <>
      <div className="navbar-menu-links">
        {window < 700 && (
          <Link href="/sign-in">
            <Button text="Sign In" customStyles={{ marginTop: '10px', width: '90%' }} />
          </Link>
        )}

        <Link href="/">
          <div
            className={`navbar-menu-link ${pathname === '/' && 'navbar-menu-link-selected'}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="las la-home navbar-menu-link-icon" />
            <p className="navbar-menu-link-text">Home</p>
          </div>
        </Link>

        <Link href="/learn">
          <div
            className={`navbar-menu-link ${pathname.includes('/learn') && 'navbar-menu-link-selected'}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="las la-graduation-cap navbar-menu-link-icon" />
            <p className="navbar-menu-link-text">Learn</p>
          </div>
        </Link>

        <Link href="/train">
          <div
            className={`navbar-menu-link ${pathname.includes('/train') && 'navbar-menu-link-selected'}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="las la-dumbbell navbar-menu-link-icon" />
            <p className="navbar-menu-link-text">Train</p>
          </div>
        </Link>

        <Link href="/traps">
          <div
            className={`navbar-menu-link ${pathname.includes('/traps') && 'navbar-menu-link-selected'}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="las la-compress-arrows-alt navbar-menu-link-icon" />
            <p className="navbar-menu-link-text">Traps</p>
          </div>
        </Link>

        <Link href="/contribute">
          <div
            className={`navbar-menu-link ${pathname.includes('/contribute') && 'navbar-menu-link-selected'}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="las la-plus navbar-menu-link-icon" />
            <p className="navbar-menu-link-text">Contribute</p>
          </div>
        </Link>

        <Link href="/help">
          <div
            className={`navbar-menu-link ${pathname.includes('/help') && 'navbar-menu-link-selected'}`}
            onClick={() => setMenuOpen(false)}
          >
            <i className="las la-question-circle navbar-menu-link-icon" />
            <p className="navbar-menu-link-text">Help & Contact</p>
          </div>
        </Link>

        <div
          className={`navbar-menu-link ${showModal && 'navbar-menu-link-selected'}`}
          onClick={() => {
            setShowModal(true);
            setMenuOpen(false);
          }}
        >
          <i className="las la-cog navbar-menu-link-icon" />
          <p className="navbar-menu-link-text">Settings</p>
        </div>
      </div>
    </>
  );
}
