import Styles from './SignUp.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Paper,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
export default function SignIn() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const steps = ['Persona Details 😧', 'Business Details', 'Delivery Details'];

  const moveAhead = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const moveBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    if (step === 0) {
      navigate('');
    }
    if (step === 1) {
      navigate('/join/shop');
    }
  }, [step, navigate]);
  const [count, setCount] = useState(0);

  return (
    <div className={Styles.wrap}>
      <Typography variant='h4'>Let's take our first step..😀'</Typography>
      <Container
        style={{
          marginBottom: '2rem',
        }}
      >
        <Outlet context={[count, setCount]} />
      </Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',

          width: '100%',
        }}
      >
        <Button
          onClick={moveBack}
          style={{
            borderRadius: '50%',
            height: '5rem',
            width: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          endIcon={
            <ArrowBackIosNewIcon
              style={{
                fontSize: '3rem',
              }}
            />
          }
        ></Button>
        <Stepper
          style={{
            flex: 1,
          }}
          activeStep={step}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
          {/* <Step>
          <StepLabel>Personal Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Business Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Contact Details</StepLabel>
        </Step> */}
        </Stepper>

        <Button
          onClick={moveAhead}
          style={{
            borderRadius: '50%',
            height: '5rem',
            width: '5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          endIcon={
            <ArrowForwardIosIcon
              style={{
                fontSize: '3rem',
              }}
            />
          }
        ></Button>
      </div>
    </div>
  );
}
