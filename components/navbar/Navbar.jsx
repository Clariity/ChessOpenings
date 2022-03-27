import { useState } from 'react';

import { NavbarBurgerMenu, NavbarCenterLinks, NavbarEndLinks, NavbarLogo } from './NavbarComponents';
import { SettingsModal } from '../modals/SettingsModal';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center bg-secondary z-20 shadow-md">
        <div className="mx-auto container flex items-center w-full">
          <NavbarLogo />
          <NavbarCenterLinks />
          <NavbarEndLinks
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setShowSettingsModal={setShowSettingsModal}
            showSettingsModal={showSettingsModal}
          />
        </div>
        <div className="w-full">
          <NavbarBurgerMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setShowSettingsModal={setShowSettingsModal}
            showSettingsModal={showSettingsModal}
          />
        </div>

        {showSettingsModal && <SettingsModal setShowSettingsModal={setShowSettingsModal} />}
      </div>
      {menuOpen && (
        <div
          className="w-full h-full fixed top-0 left-0 z-10 bg-tertiary opacity-90"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
