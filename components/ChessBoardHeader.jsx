import React from 'react';

export default function ChessBoardHeader({ path, opening }) {
  return (
    <>
      {opening && <p className="chessboard-header">{opening.label}</p>}
      {!opening &&
        (path === '/train' ? (
          <p className="chessboard-header">Select Opening to Train and Press Start to Begin</p>
        ) : (
          <p className="chessboard-header">Select Opening to Begin</p>
        ))}
    </>
  );
}
