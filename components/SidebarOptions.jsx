import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SidebarOptions({ setMenuOpen, setShowModal }) {
  const { pathname } = useRouter();

  return (
    <>
      <div className="sidebar-spacer-800" />

      <Link href="/learn">
        <div
          className={`pad-10 margin-5-tb flex-row sidebar-link ${pathname === '/learn' && 'sidebar-selected'}`}
          onClick={() => setMenuOpen(false)}
        >
          <img src="/media/images/learn.png" alt="learn" width={30} height={30} />
          <div className="pad-10-l sidebar-label">Learn</div>
        </div>
      </Link>

      <Link href="/train">
        <div
          className={`pad-10 margin-5-tb flex-row sidebar-link ${pathname === '/train' && 'sidebar-selected'}`}
          onClick={() => setMenuOpen(false)}
        >
          <img src="/media/images/train.png" alt="learn" width={30} height={30} />
          <div className="pad-10-l sidebar-label">Train</div>
        </div>
      </Link>

      <Link href="/traps">
        <div
          className={`pad-10 margin-5-tb flex-row sidebar-link ${pathname === '/traps' && 'sidebar-selected'}`}
          onClick={() => setMenuOpen(false)}
        >
          <img src="/media/images/traps.png" alt="learn" width={30} height={30} />
          <div className="pad-10-l sidebar-label">Traps</div>
        </div>
      </Link>

      <div className="sidebar-spacer" />

      <Link href="/debug">
        <div
          className={`pad-10 margin-5-tb flex-row sidebar-link ${pathname === '/debug' && 'sidebar-selected'}`}
          onClick={() => setMenuOpen(false)}
        >
          <img src="/media/images/contribute.png" alt="learn" width={30} height={30} />
          <div className="pad-10-l sidebar-label">Contribute</div>
        </div>
      </Link>

      <div
        className="pad-10 margin-5-tb flex-row sidebar-link"
        onClick={() => {
          setShowModal(true);
          setMenuOpen(false);
        }}
      >
        <button className="material-icons sidebar-button">settings</button>
        <div className="pad-10-l sidebar-label">Settings</div>
      </div>
    </>
  );
}
