import React from 'react';

export function useChessboardSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [chessboardSize, setChessboardSize] = React.useState(undefined);

  React.useEffect(() => {
    function handleResize() {
      const display = document.getElementsByClassName('chessboard-header')[0];
      setChessboardSize(display.offsetWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return chessboardSize;
}
