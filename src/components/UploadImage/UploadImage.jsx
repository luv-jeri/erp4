import { useState, useEffect, useRef } from 'react';
import Styles from './UploadImage.module.css';
import CircularProgressWithLabel from '../CircularProgressWithLabel/CircularProgressWithLabel';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import firebase from '../../firebase';
const { storage } = firebase;

export default function UploadImage({ handleImage }) {
  const [file, setFile] = useState(null); //  picked file

  const [logoURL, setLogoURL] = useState(''); //url of the image after upload

  const [progress, setProgress] = useState(0); // progress during upload

  const uploadFile = async () => {

    const fileRef = ref(storage, `/images/${file.name}`);

    const uploading = uploadBytesResumable(fileRef, file);

    uploading.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const URL = await getDownloadURL(fileRef);
        setLogoURL(URL);
        handleImage(URL);
        setProgress(0);
      }
    );
  };

  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  return (
    <div
      style={{
        backgroundImage: `url(${
          progress === 0 && (logoURL || 'https://source.unsplash.com/random')
        })`,
      }}
      className={Styles.imageContainer}
    >
      {progress > 0 ? (
        <div className={Styles.loadingWrap}>
          <CircularProgressWithLabel value={progress} />
        </div>
      ) : (
        <input
          type='file'

          variant='outlined'
          placeholder='Upload DP'

          onChange={(e) => {
            setFile(e.target.files[0]);
          }}


          className={Styles.imagePicker}
        />
      )}
    </div>
  );
}
