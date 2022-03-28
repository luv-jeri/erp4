import Styles from './SignUp.module.css';
import { useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { TextField, Button, Stack, Typography, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import Snack from '../../../components/snack'

export default function SignIn() {
  const name = useRef('');
  const email = useRef('');
  const password = useRef('');
  const passwordConfirm = useRef('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

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
              const status = await signup(
                email.current.value,
                password.current.value,
                name.current.value,
                passwordConfirm.current.value
              );

              setError(status);
            }}
          >
            Join us !
          </Button>
        </Stack>
        <Snack open={error} setOpen={setError} message={error} />
      </Container>
    </div>
  );
}
