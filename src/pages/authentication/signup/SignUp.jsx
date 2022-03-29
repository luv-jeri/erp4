import Styles from './SignUp.module.css';
import { useRef, useState, useEffect, isValidElement } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { TextField, Button, Stack, Typography, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import firebase from '../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const { storage } = firebase;

export default function SignIn() {
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
        {' '}
        <Typography variant='h3' gutterBottom={true}>
          {' '}
          Sing Up !
        </Typography>
        <Typography variant='h3' gutterBottom={true}>
          {progress}
        </Typography>
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
          <TextField id='text' required label='Name' variant='filled' inputRef={name} />
          <TextField
            id='email'
            required
            label='Email'
            variant='filled'
            inputRef={email}
          />
          <TextField
            required
            label='Password'
            type='password'
            variant='filled'
            inputRef={password}
          />
          <TextField
            required
            label='Password'
            type='password'
            variant='filled'
            inputRef={passwordConfirm}
          />
          <TextField
            type='file'
            variant='standard'
            onChange={(e) => {
              setDP(e.target.files[0]);
            }}
          />
          <Button
            variant='text'
            onClick={() => {
              navigate('/');
            }}
            style={{
              justifyContent: 'flex-start',
            }}
          >
            Already have an account?
          </Button>
          <Button
            variant='contained'
            endIcon={<SendIcon />}
            onClick={async () => {
              await signup(
                email.current.value,
                password.current.value,
                name.current.value,
                passwordConfirm.current.value,
                DPURL
              );
            }}
          >
            Join us !
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
