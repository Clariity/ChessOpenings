import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';

import { edit } from '../../data/icons';
import { useData } from '../../context/data-context';
import { Button } from '../../components/utils/Button';
import { EditUserModal } from '../../components/modals/EditUserModal';
import { UserBaseStats } from '../../components/user/UserBaseStats';
import { SVG } from '../utils/SVG';

export function UserProfileHeader({ contributions, loadedUser, setLoadedUser, submissionsByUser }) {
  const { user } = useData();
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const {
    query: { uid }
  } = useRouter();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [user]);

  return (
    <>
      <ReactTooltip id="user-tooltip" place="left" effect="solid" backgroundColor="black" />
      <div className="flex flex-col items-center sm:flex-row">
        <img
          className="rounded-lg sm:mr-8 object-cover"
          src={loadedUser.displayPictureURL || '/media/images/logo.png'}
          alt="user profile picture"
          width={200}
          height={200}
        />
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center">
            <h1 className="text-xl xs:text-2xl sm:text-4xl my-4">{loadedUser.displayName || 'User Profile'}</h1>
            {user?.uid === uid && (
              <div data-tip="Edit Profile" data-for="user-tooltip">
                <Button onClick={() => setShowEditUserModal(true)}>
                  <SVG icon={edit} size={24} />
                </Button>
              </div>
            )}
          </div>

          <h2 className="text-lg xs:text-xl md:text-2xl mb-4 text-secondary">User ID: {uid}</h2>
          <div className="hidden md:block">
            <UserBaseStats
              contributions={contributions}
              loadedUser={loadedUser}
              submissionsByUser={submissionsByUser}
            />
          </div>
        </div>
      </div>
      {showEditUserModal && (
        <EditUserModal setShowModal={setShowEditUserModal} loadedUser={loadedUser} setLoadedUser={setLoadedUser} />
      )}
    </>
  );
}
