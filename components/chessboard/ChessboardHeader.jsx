import React from 'react';
import { useRouter } from 'next/router';

export function ChessboardHeader({ opening }) {
  const { pathname } = useRouter();

  return (
    <>
      {opening ? (
        <p className="chessboard-header">{opening.label}</p>
      ) : (
        <p className="chessboard-header">
          {pathname === '/train' ? 'Select Opening to Train and Press Start to Begin' : 'Select Opening to Begin'}
        </p>
      )}
    </>
  );
}
