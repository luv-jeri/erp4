import { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Snackbar, Button, Drawer, Box, Container, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from './../../context/AuthContext';

import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import firebase from '../../firebase';
const { storage } = firebase;

export default function Layout() {
  const file = useRef(null);

  const uploadFile = async (file) => {
    const fileRef = ref(storage, `images/${file.current.files[0].name}`);

    const uploadedFile = await uploadBytes(fileRef, file.current.files[0]);

    const URL = await getDownloadURL(fileRef);

    // uploadedFile.on(
    //   'state_change',
    //   (val) => {
    //     const progress = Math.round((val.bytesTransferred / val.totalBytes) * 100);
    //     console.log(progress);
    //   },
    //   (err) => {
    //     console.log(err);
    //   },
    //   async () => {
    //     const URL = await getDownloadURL(uploadedFile.snapshot.ref);
    //     console.log(URL);
    //   }
    // );
  };

  const upload = async (file) => {
    const ref_ = ref(storage, `images/${file.current.files[0].name}`);
    const uploadTask = uploadBytesResumable(ref_, file.current.files[0]);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };
  const { signout } = useAuth();
  return (
    <div>
      <Outlet />
      <TextField type='file' inputRef={file} />
      <Button
        onClick={() => {
          signout();
        }}
        variant='contained'
      >
        Upload
      </Button>
    </div>
  );
}
