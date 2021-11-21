import React from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { signOut } from 'firebase/auth';

import Button from '../utils/Button';
import { auth } from '../../firebase';
import { useData } from '../../context/data-context';

export function NavbarAuthButton() {
  const { user } = useData();
  const { pathname } = useRouter();

  async function handleSignOut() {
    await signOut(auth);
    Router.push('/');
  }

  // currently loading user
  if (user === undefined) {
    return null;
  }

  return user ? (
    <div className="navbar-display-link flex-align" style={{ marginRight: '20px' }}>
      <Button
        text="Sign Out"
        onClick={handleSignOut}
        customStyles={{
          minHeight: 'unset',
          height: '40px',
          width: 'max-content',
          webkitTextStroke: '0px',
          fontSize: '20px',
          padding: '10px'
        }}
      />
    </div>
  ) : (
    pathname !== '/sign-in' && (
      <Link href="/sign-in">
        <div className="navbar-display-link flex-align" style={{ marginRight: '20px' }}>
          <Button
            text="Sign In"
            customStyles={{
              minHeight: 'unset',
              height: '40px',
              width: 'max-content',
              webkitTextStroke: '0px',
              fontSize: '20px',
              padding: '10px'
            }}
          />
        </div>
      </Link>
    )
  );
}
