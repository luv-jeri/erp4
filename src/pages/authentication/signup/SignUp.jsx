import Styles from './SignUp.module.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useError } from '../../../context/ErrorContext';
import { useAuth } from '../../../context/AuthContext';
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
  const { setError } = useError();
  const { signup } = useAuth();
  const steps = ['Persona Details 😧', 'Business Details', 'Delivery Details'];

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
    if (step === 2) {
      navigate('/join/delivery');
    }
  }, [step, navigate]);

  // ` Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [DPURL, setDPURL] = useState(null);

  // Bussiness Details
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [logoURL, setLogoURL] = useState(null);

  // Delivery Details
  const [deliveryName, setDeliveryName] = useState('');
  const [city, setCity] = useState('');

  const moveAhead = async () => {
    if (step < 3) {
      if (step === 0) {
        if (!name || !email || !password || !passwordConfirm || !DPURL) {
          setError('Please fill all the fields');
          return;
        }
        if (password !== passwordConfirm) {
          setError('Passwords do not match');
          return;
        }
      }
      if (step === 1) {
        if (
          !businessName ||
          !businessEmail ||
          !address ||
          !phone ||
          !businessType ||
          !logoURL
        ) {
          setError('Please fill all the fields');
          return;
        }
      }
      if (step === 2) {
        if (!deliveryName || !city) {
          setError('Please fill all the fields');
          return;
        }
      }
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (!deliveryName || !city) {
      setError('Please fill all the fields');
      return;
    }
    signup({
      name,
      email,
      password,
      DPURL,
      logoURL,
      businessName,
      businessEmail,
      address,
      phone,
      businessType,
      deliveryName,
      city,
    });
  }, [city]);

  return (
    <div className={Styles.wrap}>
      <Typography variant='h4'>Let's take our first step..😀'</Typography>
      <Container
        style={{
          marginBottom: '2rem',
        }}
      >
        <Outlet
          context={{
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
            businessName,
            setBusinessName,
            businessEmail,
            setBusinessEmail,
            address,
            setAddress,
            phone,
            setPhone,
            businessType,
            setBusinessType,
            deliveryName,
            setDeliveryName,
            city,
            setCity,
            logoURL,
            setLogoURL,
          }}
        />
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
            alignItems: 'center',
            justifyContent: 'center',
            display: step === 3 ? 'none' : 'block',
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
