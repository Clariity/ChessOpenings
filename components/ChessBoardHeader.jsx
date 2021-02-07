import React from 'react';

export default function ChessBoardHeader({ path, opening }) {
  return (
    <>
      {opening && <p className="chessboard-header">{opening.label}</p>}
      {!opening &&
        (path === '/train' ? (
          <p className="chessboard-header">
            <span className="chessboard-header-special">Select Opening</span> to Train and{' '}
            <span className="chessboard-header-special">Press Start</span> to Begin
          </p>
        ) : (
          <p className="chessboard-header">
            <span className="chessboard-header-special">Select Opening</span> to Learn to Begin
          </p>
        ))}
    </>
  );
}
