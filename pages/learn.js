import ChessBoard from '../components/ChessBoard';
import SEO from '../components/SEO';

export default function Learn() {
  return (
    <>
      <SEO
        description="Learn variations for Chess openings and be prepared for whatever your opponent may throw at you. Learn a completely new Chess opening today and try it out when you next play some games."
        title="learn"
        path="/learn"
      />
      <ChessBoard path="/learn" />
    </>
  );
}
