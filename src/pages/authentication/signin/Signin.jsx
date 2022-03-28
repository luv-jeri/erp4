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
        <TextField id='email' required label='Email' variant='filled' inputRef={email} />
        <TextField
          required
          label='Password'
          type='password'
          variant='filled'
          inputRef={password}
        />
        <Button
          variant='text'
          onClick={() => {
            navigate('/join');
          }}
          style={{
            justifyContent: 'flex-start',
          }}
        >
          New to the app?
        </Button>
        <Button
          variant='contained'
          endIcon={<SendIcon />}
          onClick={async () => {
            await signin(email.current.value, password.current.value);
          }}
        >
          Login
        </Button>
      </Stack>
    </Container>
  );
}
