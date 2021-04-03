import ChessBoard from '../../components/ChessBoard';
import SEO from '../../components/SEO';

export default function Submission() {
  return (
    <div>
      <SEO description="Community Submission to ChessOpenings.co.uk" title="submission" path="/submission" />
      <ChessBoard path="/submission" />
    </div>
  );
}
