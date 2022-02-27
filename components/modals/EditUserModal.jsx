import { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Cookies from 'js-cookie';
import Filter from 'bad-words';

import { storage } from '../../firebase';
import { uploadPhoto } from '../../data/icons';
import { useData } from '../../context/data-context';
import { Button, WarningButton } from '../utils/Button';
import { ErrorMessage } from '../utils/ErrorMessage';
import { Input } from '../utils/Input';
import { Modal } from '../utils/Modal';
import { SVG } from '../utils/SVG';
import { UserLoading } from '../user/UserLoading';

export function EditUserModal({ loadedUser, setLoadedUser, setShowModal }) {
  const { setUserData, user, userData } = useData();
  const [displayName, setDisplayName] = useState(loadedUser.displayName);
  const [displayPictureURL, setDisplayPictureURL] = useState(loadedUser.displayPictureURL);
  const [selectedFile, setSelectedFile] = useState();
  const [uploadStatus, setUploadStatus] = useState();
  const [uploadError, setUploadError] = useState();
  const MAX_FILE_SIZE = 2621440;
  const MB_IN_BYTES = 1048576;
  const wordFilter = new Filter();
  const submitDisabled =
    displayName === loadedUser.displayName ||
    displayName.length < 3 ||
    displayName.toLowerCase().includes('admin') ||
    wordFilter.isProfane(displayName);

  // TODO: security, don't allow malicious files that masquerade as images
  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      if (
        e.target.files[0].type.toString().indexOf('image/') !== 0 ||
        e.target.files[0].type.toString().includes('image/gif')
      ) {
        setUploadError(`Incorrect file type: ${e.target.files[0].type}. Please upload an image.`);
        return;
      } else if (e.target.files[0].size > MAX_FILE_SIZE) {
        setUploadError(
          `File size too large: ${(e.target.files[0].size / MB_IN_BYTES).toFixed(
            1
          )}MB. Please upload an image less than 2.5MB in size.`
        );
        return;
      } else {
        setSelectedFile(e.target.files[0]);
        setDisplayPictureURL(URL.createObjectURL(e.target.files[0]));
        setUploadError(null);
      }
    }
  }

  // upload selected file to firebase
  function uploadDisplayPicture() {
    // show upload progress
    function handleUploadProgress(snapshot) {
      const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setUploadStatus(`Uploading File: ${progress}%`);
    }

    // handle upload error
    function handleUploadError(error) {
      setUploadError(`Oops, something went wrong: ${JSON.stringify(error)}. Please try again later.`);
    }

    // add remote URL to user object
    async function handleUploadCompletion(uploadTask) {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      updateUser(downloadURL);
    }

    const uploadTask = uploadBytesResumable(ref(storage, `displayPictures/${loadedUser.uid}`), selectedFile);
    uploadTask.on('state_changed', handleUploadProgress, handleUploadError, () => handleUploadCompletion(uploadTask));
  }

  async function updateUser(newURL) {
    setUploadStatus('Updating User');

    // update user object
    const updatedUserObject = {
      ...loadedUser,
      displayName,
      displayPictureURL: newURL || displayPictureURL
    };

    try {
      // send updated file
      const token = await user.getIdToken();
      Cookies.set('idToken', JSON.stringify(token));
      const response = await fetch(`/api/user`, {
        method: 'PUT',
        body: JSON.stringify({
          ...updatedUserObject
        })
      });
      if (response?.ok) {
        // set locally so not to use an unnecessary fetch
        setLoadedUser(updatedUserObject);
        setUserData({ ...userData, displayPictureURL: newURL || displayPictureURL });
      } else {
        setUploadError(`Oops, something went wrong. We were unable to update the user. Please try again later.`);
      }
    } catch (error) {
      setUploadError(`Oops, something went wrong: ${JSON.stringify(error)}. Please try again later.`);
    }

    setShowModal(false);
  }

  function handleSubmit() {
    setUploadStatus('Starting Upload');
    if (selectedFile) {
      uploadDisplayPicture();
    } else {
      updateUser();
    }
  }

  return (
    <Modal title="Edit User" onClose={() => setShowModal(false)}>
      {uploadStatus ? (
        <div className="my-10">
          <UserLoading text={uploadStatus} />
        </div>
      ) : (
        <>
          <h2 className="text-xl mb-4">Change Display Picture</h2>

          {uploadError && <ErrorMessage message={uploadError} />}

          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col items-center mb-4 w-full">
              <h3 className="text-lg">Current/Preview</h3>
              <img
                className="rounded-lg object-cover"
                src={displayPictureURL || '/media/images/default.png'}
                alt="selected profile picture"
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col items-center mb-4 w-full">
              <h2 className="text-lg">Upload New</h2>
              <label className="cursor-pointer hover:scale-105" htmlFor="file-upload">
                <SVG icon={uploadPhoto} size={200} />
              </label>
              <input className="hidden" id="file-upload" type="file" onChange={handleFileChange} accept="image/*" />
            </div>
          </div>

          <div className="flex flex-col my-4 w-full">
            <h2 className="text-xl mb-4">Change Display Name</h2>
            <Input
              id="edit-display-name"
              label="Display Name (up to 15 characters)"
              placeholder="Please enter a display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={15}
            />
          </div>

          <div className="flex">
            <div className="mr-2 w-full">
              <WarningButton fill onClick={() => setShowModal(false)}>
                Cancel
              </WarningButton>
            </div>
            <div className="ml-2 w-full">
              <Button fill onClick={handleSubmit} disabled={submitDisabled}>
                Submit
              </Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}
