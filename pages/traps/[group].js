import { Chessboard } from '../../components/chessboard/Chessboard';
import { ChessboardProvider } from '../../context/board-context';
import { TrapsSidePanel } from '../../components/sidepanels/TrapsSidePanel';
import { SEO } from '../../components/utils/SEO';

// TODO: custom SEO for each group (custom SEO image too?)

export default function Group() {
  return (
    <>
      <SEO
        description="Learn tricky opening traps that may catch your opponent off guard if they don't know how to correctly respond. Make sure you don't get caught out by them either."
        title="traps"
        path="/traps"
      />
      <div className="board-panel-container">
        <ChessboardProvider>
          <Chessboard id="trapsChessboard" />
          <TrapsSidePanel />
        </ChessboardProvider>
      </div>
    </>
  );
}
