import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Styles from './Login.module.css';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import {
  addDoc,
  collection,
  getFirestore,
} from 'firebase/firestore';

import firebase from '../../../firebase/index';
// const db = getFirestore()
// import { db } from '../../../firebase/index';

const auth = getAuth();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // createUserWithEmailAndPassword(
  //   auth,
  //   'ok@ok.com',
  //   '12345678'
  // )
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user);
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //   });

  const { db } = firebase;

  const createDoc = async () => {
    const doc = await addDoc(
      collection(db, 'myCollection'),
      {
        email,
        password,
        date : new Date(),
      }
    );
    console.log(doc);
  };

  return (
    <div className={Styles.container}>
      <Container
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AccountCircleIcon
          style={{
            fontSize: '100px',
            marginRight: '10px',
          }}
          color='primary'
        />
        <Stack
          spacing={2}
          style={{
            width: '50%',
          }}
        >
          <TextField
            id='email'
            required
            label='Email'
            variant='filled'
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
          <TextField
            required
            label='Password'
            type='password'
            variant='filled'
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
          <Button
            variant='contained'
            endIcon={<SendIcon />}
            onClick={createDoc}
          >
            Login
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
