import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import Router, { useRouter } from 'next/router';

import { auth } from '../../firebase';
import { useData } from '../../context/data-context';
import { Button, WarningButton } from '../../components/utils/Button';
import { ChangePasswordModal } from '../../components/modals/ChangePasswordModal';
import { DeleteAccountModal } from '../../components/modals/DeleteAccountModal';
import { SEO } from '../../components/utils/SEO';
import { UserBaseStats } from '../../components/user/UserBaseStats';
import { UserLoading } from '../../components/user/UserLoading';
import { UserProfileHeader } from '../../components/user/UserProfileHeader';
import { VerifyEmailModal } from '../../components/modals/VerifyEmailModal';
import { UserContributions } from '../../components/user/UserContributions';
import { UserStats } from '../../components/user/UserStats';

export default function User() {
  // user is the auth data of signed in user, loadedUser is any user data
  const { loadingError, submissions, setLoadingError, user, userData } = useData();
  const [loadedUser, setLoadedUser] = useState();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {
    query: { uid }
  } = useRouter();

  const submissionsByUser = submissions?.filter((s) => s.contributor === uid) || [];
  const contributions = submissionsByUser.filter((s) => s.status === 'MERGED');

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/user/${uid}`);
        const resJson = await response.json();
        if (response?.ok) {
          setLoadedUser(resJson.body);
        } else {
          // can't find user
          Router.push('/');
        }
      } catch (error) {
        setLoadingError(
          `Oops, something went wrong fetching user information: ${JSON.stringify(error)}. Please try again later.`
        );
      }
    }

    // only fetch user if we don't already have that data
    if (uid) {
      if (userData?.uid === uid) setLoadedUser(userData);
      else fetchUserData();
    }
  }, [setLoadingError, uid, userData]);

  async function handleSignOut() {
    await signOut(auth);
    Router.push('/sign-in');
  }

  if (!loadedUser) {
    return <UserLoading />;
  }

  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <div className="container flex flex-col">
      <SEO
        description={`ChessOpenings.co.uk user profile for ${loadedUser.displayName}.`}
        title={loadedUser.displayName || 'user profile'}
        path="/user"
      />

      <div className="my-8 bg-secondary rounded-lg p-4 md:p-8">
        <UserProfileHeader
          contributions={contributions}
          loadedUser={loadedUser}
          setLoadedUser={setLoadedUser}
          submissionsByUser={submissionsByUser}
        />
      </div>

      <div className="mb-8 bg-secondary rounded-lg p-4 md:hidden">
        <UserBaseStats contributions={contributions} loadedUser={loadedUser} submissionsByUser={submissionsByUser} />
      </div>

      {/* {user?.uid !== loadedUser.uid && (
        <Button onClick={() => {}}>
          {user?.following?.includes(loadedUser.uid) ? 'Unfollow User' : 'Follow User'}
        </Button>
      )} */}

      {contributions.length > 0 && (
        <div className="mb-8 bg-secondary rounded-lg p-4 md:p-8">
          <h3 className="text-lg sm:text-xl md:text-2xl my-2">Latest Contributions</h3>
          <UserContributions contributions={contributions} />
        </div>
      )}

      <div className="mb-8 bg-secondary rounded-lg p-4 md:p-8">
        <h3 className="text-lg sm:text-xl md:text-2xl my-2">Statistics</h3>
        <UserStats stats={loadedUser.stats} />
      </div>

      <div className="mb-8 bg-secondary rounded-lg p-4 md:p-8">
        <h3 className="text-lg sm:text-xl md:text-2xl my-2">Achievements</h3>
        <p>
          Coming Soon - Don&apos;t worry, you won&apos;t miss any achievements as they will be automatically added when
          introduced.
        </p>
      </div>

      {/* achievements */}
      {/* 
        ## learning overall
        - Learn an opening
        - Learn 10 openings
        - Learn 50 openings
        - Learn 100 openings
        ## learning individual
        - Learn an opening in the Italian game
        - Learn all openings in the Italian game
        ## variation individual
        - Play through variation 5 times
        - Play through variation 10 times
        ## same for traps
        ## same for mistakes
        ## train overall
        - Complete an opening
        - Complete 10 separate openings
        - Complete 50 separate openings
        - Complete 100 separate openings
        - Flawless run with over 10 openings (I know my stuff)
        - Flawless run with all openings (You must be cheating)
        ## train individual
        - Complete an opening in the Italian Game
        - Complete all openings in the Italian Game
        - Complete all openings at once in the Italian Game 
        ## login
        - create an account
        - login on 2 consecutive days
        - login on 5 consecutive days
        - login on 7 consecutive days
        - login 10 times
        - login 50 times
        - login 100 times
        ## miscellaneous
        - share site to a friend with referral link
        - submit an opening contribution
        - submit a trap contribution
        - submit a mistake contribution
        - submit an alteration request
        - successfully have content merged
      */}

      <div className="mb-8 bg-secondary rounded-lg p-4 md:p-8">
        <h3 className="text-lg sm:text-xl md:text-2xl my-2">Following</h3>
        <p>Coming Soon - Follow Users to see their repertoires.</p>
      </div>

      {user?.uid === uid && (
        <div className="mb-8 bg-secondary rounded-lg p-4 md:p-8">
          <h3 className="text-lg sm:text-xl md:text-2xl my-2">Account Management</h3>
          <div className="flex flex-wrap">
            <div className="mb-4 md:pr-2 w-full md:w-1/2 xl:w-1/4">
              <Button fill onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
            {user.providerData[0].providerId === 'password' && (
              <div className="mb-4 md:pl-2 xl:px-2 w-full md:w-1/2 xl:w-1/4">
                <Button fill onClick={() => setShowPasswordModal(true)}>
                  Change Password
                </Button>
              </div>
            )}
            {!user.emailVerified && (
              <div className="mb-4 md:pl-2 xl:px-2 w-full md:w-1/2 xl:w-1/4">
                <Button fill onClick={() => setShowVerifyModal(true)}>
                  Verify Email Address
                </Button>
              </div>
            )}
            <div className="mb-4 md:pl-2 w-full md:w-1/2 xl:w-1/4">
              <WarningButton fill onClick={() => setShowDeleteModal(true)}>
                Delete Account
              </WarningButton>
            </div>
          </div>
        </div>
      )}

      {showPasswordModal && <ChangePasswordModal setShowModal={setShowPasswordModal} />}
      {showVerifyModal && <VerifyEmailModal setShowModal={setShowVerifyModal} />}
      {showDeleteModal && <DeleteAccountModal setShowModal={setShowDeleteModal} />}
    </div>
  );
}
