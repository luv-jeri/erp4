import React, { useState } from 'react';
import Box from '@mui/material/Box';

import {
  Stepper,
  Container,
  TextField,
  Divider,
  Stack,
  Radio,
  Select,
  MenuItem,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import create from '../../functions/create';

export default function Home() {
  // ------
  // Upload Images 5 images -> as an array
  // Brand ? -> as a string
  // color ? -> as a string
  // top wear ? - Shirt ,  jacket , sweater , sweater with hood
  // bottom wear ? - Trousers , shorts , skirt , skirt with hood
  // gender women ? -  top wear , dresser , sari , etc...
  // ------

  // ~ Upload images function -> parameter (file) -> return URL

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('');

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    console.log(activeStep);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

  return (
    <Container>
      <Stepper activeStep={activeStep} orientation='vertical'>
        <Step>
          <StepLabel>
            <Typography variant='h5'>About the Dress...</Typography>
          </StepLabel>
          <StepContent>
            <Divider />
            <Stack>
              <TextField
                placeholder='Name'
                size='small'
                variant='outlined'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                placeholder='Price'
                size='small'
                variant='outlined'
                value={price}
                type='number'
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Stack>

            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography variant='h5'>For whom ?</Typography>
          </StepLabel>
          <StepContent>
            <Divider />
            <div>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <h4>men</h4>
                <Radio
                  checked={gender === 'men'}
                  onChange={handleChange}
                  value='men'
                  name='radio-buttons'
                />
              </div>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <h4>women</h4>
                <Radio
                  checked={gender === 'women'}
                  onChange={handleChange}
                  value='women'
                  name='radio-buttons'
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <h4>top</h4>
                <Radio
                  checked={type === 'top'}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  value='top'
                  name='radio-buttons'
                />
              </div>
              <div
                style={{
                  display: 'flex',
                }}
              >
                <h4>bottom</h4>
                <Radio
                  checked={type === 'bottom'}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  value='bottom'
                  name='radio-buttons'
                />
              </div>
            </div>
            <Button onClick={handleBack}>Back</Button>
            <Button onClick={handleNext}>Next</Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography variant='h5'>Size Details</Typography>
          </StepLabel>
          <StepContent>
            <Divider />
            <Select
              value={size}
              label='Size'
              size='small'
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {sizes.map((size) => (
                <MenuItem value={size}>{size}</MenuItem>
              ))}
            </Select>
            <Button onClick={handleBack}>Back</Button>
            <Button
              onClick={() => {
                create('clothes', {
                  name,
                  type,
                  size,
                  price,
                  gender,
                });
              }}
            >
              Done !
            </Button>
          </StepContent>
        </Step>
      </Stepper>
    </Container>
  );
}
