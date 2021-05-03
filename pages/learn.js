import ChessBoard from '../components/ChessBoard';
import SEO from '../components/SEO';

export default function Learn() {
  return (
    <>
      <SEO description="Learn Chess Openings" title="learn" path="/learn" />
      <ChessBoard path="/learn" />
    </>
  );
}
