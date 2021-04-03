import ChessBoard from '../components/ChessBoard';
import SEO from '../components/SEO';

export default function Debug() {
  return (
    <>
      <SEO description="Move pieces in debug mode to log out the moves and game history" title="debug" path="/debug" />
      <ChessBoard path="/debug" isDebug={true} />
    </>
  );
}
