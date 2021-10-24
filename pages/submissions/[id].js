import { Chessboard } from '../../components/chessboard/Chessboard';
import { ChessboardProvider } from '../../context/board-context';
import { SubmissionSidePanel } from '../../components/sidepanels/SubmissionSidePanel';
import { SEO } from '../../components/utils/SEO';

export default function Submission() {
  return (
    <div>
      <SEO description="Community Submission to ChessOpenings.co.uk" title="submission" path="/submissions" />
      <div className="board-panel-container">
        <ChessboardProvider>
          <Chessboard id="normalSubmissionChessboard" />
          <SubmissionSidePanel />
        </ChessboardProvider>
      </div>
    </div>
  );
}
