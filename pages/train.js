import ChessBoard from '../components/ChessBoard';
import SEO from '../components/SEO';

export default function Train() {
  return (
    <>
      <SEO description="Practise and be tested on your Chess Opening knowledge" title="train" path="/train" />
      <ChessBoard path="/train" />
    </>
  );
}
