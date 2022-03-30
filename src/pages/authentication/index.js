import Styles from './index.module.css';
import { useState } from 'react';
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
  const steps = ['Persona Details 😧', 'Business Details', 'Delivery Details'];

  return ( 
    <div className={Styles.wrap}>
      <Paper
        elevation={12}
        style={{
          padding: '3rem',
          maxWidth: '900px',
          minWidth: '900px',
          minHeight: '60%',
          maxHeight: '60%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >  
        <Outlet />
      </Paper>
    </div>
  );
}
