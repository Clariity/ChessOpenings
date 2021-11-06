import { Chessboard } from '../../components/chessboard/Chessboard';
import { ChessboardProvider } from '../../context/board-context';
import { LearnSidePanel } from '../../components/sidepanels/LearnSidePanel';
import { SEO } from '../../components/utils/SEO';

// TODO: custom SEO for each group (custom SEO image too?)

export default function Group() {
  return (
    <>
      <SEO
        description="Learn variations for Chess openings and be prepared for whatever your opponent may throw at you. Learn a completely new Chess opening today and try it out when you next play some games."
        title="learn"
        path="/learn"
      />
      <div className="board-panel-container">
        <ChessboardProvider>
          <Chessboard id="learnChessboard" />
          <LearnSidePanel />
        </ChessboardProvider>
      </div>
    </>
  );
}
