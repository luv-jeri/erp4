import React from 'react';
import Styles from './BusinessDetails.module.css';
import { useRef, useState, useEffect, isValidElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import firebase from '../../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useOutletContext } from 'react-router-dom';
const { storage } = firebase;
export default function BusinessDetails() {
  const [count, setCount] = useOutletContext();
  const increment = () => setCount((c) => c + 1);
  const name = useRef('');
  const email = useRef('');
  const password = useRef('');
  const passwordConfirm = useRef('');
  const [DP, setDP] = useState(null);
  const [progress, setProgress] = useState(0);
  const [DPURL, setDPURL] = useState(null);

  const navigate = useNavigate();
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

  const { signup } = useAuth();
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {count}
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
            placeholder='Shop Name'
            inputRef={name}
          />
          <TextField
            id='email'
            placeholder='Email'
            size='small'
            variant='outlined'
            inputRef={email}
          />
          <TextField
            placeholder='Password'
            type='password'
            variant='outlined'
            inputRef={password}
            size='small'
          />
          <TextField
            placeholder='Password'
            type='password'
            variant='outlined'
            size='small'
            inputRef={passwordConfirm}
          />
        </Stack>
      </Box>
    </Container>
  );
}
