import SEO from '../components/SEO';

import ChessBoard from '../components/ChessBoard';

export default function Debug() {
  return (
    <>
      <SEO description="Move pieces in debug mode to log out the moves and game history" title="debug" path="/debug" />
      <ChessBoard path="/debug" isDebug={true} />
    </>
  );
}
