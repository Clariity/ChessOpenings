import { Chessboard } from '../components/chessboard/Chessboard';
import { ChessboardProvider } from '../context/board-context';
import { DebugSidePanel } from '../components/sidepanels/DebugSidePanel';
import { SEO } from '../components/utils/SEO';

export default function Debug() {
  return (
    <>
      <SEO description="Move pieces in debug mode to log out the moves and game history" title="debug" path="/debug" />
      <div className="board-panel-container">
        <ChessboardProvider>
          <Chessboard id="debugChessboard" />
          <DebugSidePanel />
        </ChessboardProvider>
      </div>
    </>
  );
}
