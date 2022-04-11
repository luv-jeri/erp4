/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Styles from './PersonalDetails.module.css';
import { useState, useEffect } from 'react';
import { TextField, Stack, Container, Box } from '@mui/material';
import firebase from '../../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useOutletContext } from 'react-router-dom';

const { storage } = firebase;
export default function PersonalDetails() {
  
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    DPURL,
    setDPURL,
  } = useOutletContext();

  const [progress, setProgress] = useState(0);
  const [DP, setDP] = useState(null);

  const uploadFile = async (file) => {
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
        setDPURL(URL);
      }
    );
  };

  useEffect(() => {
    uploadFile(DP);
  }, [DP]);

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        style={{
          flex: 1,
        }}
      >
        <Stack spacing={2}>
          <TextField
            id='text'
            size='small'
            variant='outlined'
            placeholder='Name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id='email'
            placeholder='Email'
            size='small'
            variant='outlined'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            placeholder='Password'
            type='password'
            variant='outlined'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            size='small'
          />
          <TextField
            placeholder='Password'
            type='password'
            variant='outlined'
            size='small'
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
        </Stack>
      </Box>
      <Box
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundImage: `url(${DPURL || 'https://source.unsplash.com/random'})`,
          }}
          className={Styles.imageContainer}
        >
          <input
            type='file'
            variant='outlined'
            placeholder='Upload DP'
            onChange={(e) => {
              setDP(e.target.files[0]);
            }}
            className={Styles.imagePicker}
          />
        </div>
      </Box>
    </Container>
  );
}
