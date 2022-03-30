import Styles from './SignIn.module.css';
import { useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { TextField, Button, Stack, Container, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const email = useRef('');
  const password = useRef('');
  const navigate = useNavigate();

  const { signin } = useAuth();

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
      }}
    >
      <Typography variant='h4'>" Let's Start 🛍️ "</Typography>
      <Stack
        spacing={2}
        style={{
          width: '50%',
        }}
      >
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
          size='small'
          inputRef={password}
        />

        <Button
          variant='contained'
          endIcon={<SendIcon />}
          onClick={async () => {
            await signin(email.current.value, password.current.value);
          }}
        >
          Login
        </Button>
        <Button
          variant='text'
          onClick={() => {
            navigate('/join');
          }}
          style={{
            justifyContent: 'flex-start',
            width: '50%',
            fontSize: '0.8rem',
          }}
        >
          New to the app?
        </Button>
      </Stack>
    </Container>
  );
}
