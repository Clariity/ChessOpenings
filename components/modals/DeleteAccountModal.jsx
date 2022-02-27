import { useState } from 'react';
import { deleteObject, ref } from '@firebase/storage';
import Cookies from 'js-cookie';
import Router from 'next/router';

import { storage } from '../../firebase';
import { useData } from '../../context/data-context';
import { Button, WarningButton } from '../utils/Button';
import { ErrorMessage } from '../utils/ErrorMessage';
import { Input } from '../utils/Input';
import { Modal } from '../utils/Modal';

export function DeleteAccountModal({ setShowModal }) {
  const { clearUser, user } = useData();
  const [confirmation, setConfirmation] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [requestError, setRequestError] = useState();

  async function handleSubmit() {
    setDeleting(true);
    try {
      // delete user and userData
      const uid = user.uid;
      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
      const res = await fetch('/api/user', {
        method: 'DELETE'
      });
      if (res.ok) {
        // attempt display picture deletion
        await deleteObject(ref(storage, `displayPictures/${uid}`));
        // delete locally stored data
        clearUser();
        Router.push('/');
      } else {
        const resJson = await res.json();
        setRequestError(resJson.error);
      }
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        clearUser();
        Router.push('/');
      } else setRequestError(error.message);
    }
  }

  return (
    <Modal title="Delete Account" onClose={() => setShowModal(false)}>
      <>
        {requestError && <ErrorMessage message={requestError} />}

        <h2 className="text-xl mb-2">Warning - This action is irreversible.</h2>
        <p className="mb-2">
          Deleting your account will result in all information and statistics about you being deleted. This data cannot
          be recovered once deleted.
        </p>
        <p className="mb-2">To continue with account deletion, please type &apos;delete&apos; in the input below.</p>

        <Input
          id="confirm-account-deletion"
          label="Confirm Account Deletion"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          maxLength={15}
        />

        <div className="flex">
          <div className="mr-2 w-full">
            <Button fill onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
          <div className="ml-2 w-full">
            <WarningButton fill onClick={handleSubmit} disabled={confirmation !== 'delete' || deleting}>
              {deleting ? 'Deleting' : 'Delete Account'}
            </WarningButton>
          </div>
        </div>
      </>
    </Modal>
  );
}
