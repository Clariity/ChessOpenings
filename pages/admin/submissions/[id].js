import ChessBoard from '../../../components/ChessBoard';
import firebase from '../../../firebaseConfig';
import SEO from '../../../components/SEO';

export default function Submission() {
  return (
    <div>
      <SEO description="Community Submission to ChessOpenings.co.uk" title="submission" path="/submission" />
      <ChessBoard path="/submission" />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const adminToken = ctx.req.cookies?.adminToken;
  const redirect = {
    redirect: {
      permanent: false,
      destination: '/admin/login'
    }
  };

  // allow session if token provided and update stored tokens
  if (adminToken) {
    // get all tokens from firebase
    const querySnapshot = await firebase.collection('tokens').get();
    // for each token, if they have expired delete them
    const validTokens = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().expires < Date.now()) {
        firebase.collection('tokens').doc(doc.id).delete();
      } else validTokens.push(doc.id);
    });
    // check if adminToken remains
    if (validTokens.includes(JSON.parse(adminToken).id)) {
      return {
        props: {}
      };
    }
  }

  return redirect;
}
