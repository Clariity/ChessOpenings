import { Chessboard } from '../components/chessboard/Chessboard';
import { ChessboardProvider } from '../context/board-context';
import { TrainSidePanel } from '../components/sidepanels/TrainSidePanel';
import { SEO } from '../components/utils/SEO';

export default function Train() {
  return (
    <>
      <SEO
        description="Test your Chess openings knowledge and train to remember the moves to make for different variations. Try to get as many correct as possible and if you forget any, a handy link will be provided to brush up on the forgotten moves."
        title="train"
        path="/train"
      />
      <div className="board-panel-container">
        <ChessboardProvider>
          <Chessboard id="trainChessboard" />
          <TrainSidePanel />
        </ChessboardProvider>
      </div>
    </>
  );
}
