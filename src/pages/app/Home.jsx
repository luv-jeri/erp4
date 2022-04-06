import React, { useState } from 'react';
import Styles from './Home.module.css';

import {
  Stepper,
  Container,
  TextField,
  Divider,
  Stack,
  Radio,
  Select,
  MenuItem,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
} from '@mui/material';

import UploadImage from '../../components/UploadImage/UploadImage';
import { useError } from '../../context/ErrorContext';
import create from '../../functions/create';

import CLOTHING from '../../constants/clothing';

export default function Home() {
  const { setError } = useError();
  const { sizes } = CLOTHING;
  const { brands } = CLOTHING;
  const { colors } = CLOTHING;

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

  const [images, setImages] = useState([]);

  const handleImage = (url) => {
    setImages((current) => [...current, url]);
  };

  console.log(images);
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

  const complete = async () => {
    try {
      await create('clothes', {
        name,
        type,
        size,
        price,
        gender,
        images,
      });
    } catch (e) {
      setError(e);
    }
  };

  const [count, setCount] = useState(1);

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
              {[...Array(count)].map(() => {
                return <UploadImage handleImage={handleImage} />;
              })}

              <Button
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                Add more
              </Button>
              {/* {[...Array(5)].map(() => {
                return ;
              })} */}
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
            <Button onClick={complete}>Done !</Button>
          </StepContent>
        </Step>
      </Stepper>
    </Container>
  );
}

// const handImages = (value) => {
//   setArr([...arr, value]);

//   console.log(arr);
// };

// handImages("www.fireabe/asdinfs");
