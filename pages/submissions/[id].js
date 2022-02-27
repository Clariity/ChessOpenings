import { Chessboard } from '../../components/chessboard/Chessboard';
import { ChessboardWrapper } from '../../components/chessboard/ChessboardWrapper';
import { SubmissionSidePanel } from '../../components/submission/SubmissionSidePanel';
import { SEO } from '../../components/utils/SEO';

export default function Submission() {
  return (
    <div>
      <SEO description="Community Submission to ChessOpenings.co.uk" title="submission" path="/submissions" />
      <ChessboardWrapper>
        <Chessboard id="normalSubmissionChessboard" />
        <SubmissionSidePanel />
      </ChessboardWrapper>
    </div>
  );
}
