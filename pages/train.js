import SEO from '../components/SEO';

import ChessBoard from '../components/ChessBoard';

export default function Train() {
  return (
    <>
      <SEO
        description="Practise and be tested on your Chess Opening knowledge"
        title="train"
        path="/train"
      />
      <ChessBoard path="/train" />
    </>
  );
}
