import Styles from './SignUp.module.css';
import { useRef } from 'react';
import { useAuth } from '../../../context/AuthContext';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SignIn() {
  const email = useRef('');
  const password = useRef('');
  const passwordConfirm = useRef('');

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
        <Typography
          variant='h3'
          gutterBottom={true}
        >
          {' '}
          Sing Up !
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
          <Button
            variant='contained'
            endIcon={<SendIcon />}
            onClick={async () => {
              await signup(
                email.current.value,
                password.current.value
              );
            }}
          >
            Sing In
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
