import { useEffect } from 'react';
import ChessBoard from '../components/ChessBoard';
import SEO from '../components/SEO';

export default function Learn() {
  // attempt at focusing on an element for mobile compatibility
  useEffect(() => {
    const checkExist = setInterval(() => {
      if (document.querySelectorAll("img[alt='wP']")[0]) {
        document.querySelectorAll("img[alt='wP']")[0].click();
        clearInterval(checkExist);
      }
    }, 100);
  });

  return (
    <>
      <SEO description="Learn Chess Openings" title="learn" path="/learn" />
      <ChessBoard path="/learn" />
    </>
  );
}
