import SEO from '../components/SEO';

import ChessBoard from '../components/ChessBoard';

export default function Traps() {
  return (
    <>
      <SEO
        description="Learn Chess Opening Traps, how to take advantage of them, and how to defend against them."
        title="traps"
        path="/traps"
      />
      <ChessBoard path="/traps" />
    </>
  );
}
