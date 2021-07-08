import ChessBoard from '../components/ChessBoard';
import SEO from '../components/SEO';

export default function Traps() {
  return (
    <>
      <SEO
        description="Learn tricky opening traps that may catch your opponent off guard if they don't know how to correctly respond. Make sure you don't get caught out by them either."
        title="traps"
        path="/traps"
      />
      <ChessBoard path="/traps" />
    </>
  );
}
