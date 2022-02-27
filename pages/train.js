import { Chessboard } from '../components/chessboard/Chessboard';
import { ChessboardWrapper } from '../components/chessboard/ChessboardWrapper';
import { TrainSidePanel } from '../components/train/TrainSidePanel';
import { SEO } from '../components/utils/SEO';

export default function Train() {
  return (
    <>
      <SEO
        description="Test your Chess openings knowledge and train to remember the moves to make for different variations. Try to get as many correct as possible and if you forget any, a handy link will be provided to brush up on the forgotten moves."
        title="train"
        path="/train"
      />
      <ChessboardWrapper>
        <Chessboard id="trainChessboard" />
        <TrainSidePanel />
      </ChessboardWrapper>
    </>
  );
}
