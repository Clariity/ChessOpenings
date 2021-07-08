import ChessBoard from '../components/ChessBoard';
import SEO from '../components/SEO';

export default function Train() {
  return (
    <>
      <SEO
        description="Test your Chess openings knowledge and train to remember the moves to make for different variations. Try to get as many correct as possible and if you forget any, a handy link will be provided to brush up on the forgotten moves."
        title="train"
        path="/train"
      />
      <ChessBoard path="/train" />
    </>
  );
}
