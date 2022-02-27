import { auth } from '../../../firebaseAdmin';
import { Chessboard } from '../../../components/chessboard/Chessboard';
import { ChessboardWrapper } from '../../../components/chessboard/ChessboardWrapper';
import { SubmissionSidePanel } from '../../../components/submission/SubmissionSidePanel';
import { SEO } from '../../../components/utils/SEO';

export default function Submission() {
  return (
    <>
      <SEO description="Community Submission to ChessOpenings.co.uk" title="submission" path="/submissions" />
      <ChessboardWrapper>
        <Chessboard id="adminSubmissionChessboard" />
        <SubmissionSidePanel />
      </ChessboardWrapper>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const idToken = ctx.req.cookies?.idToken;
  const redirect = {
    redirect: {
      permanent: false,
      destination: '/404'
    }
  };

  if (!idToken) return redirect;
  try {
    const parsedToken = JSON.parse(ctx.req.cookies?.idToken);
    const decodedToken = await auth.verifyIdToken(parsedToken);
    const uid = decodedToken.uid;
    if (uid === process.env.ADMIN_UID) {
      return {
        props: {}
      };
    }
    return redirect;
  } catch (error) {
    return redirect;
  }
}
