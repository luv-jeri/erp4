import React from 'react';
import Styles from './BusinessDetails.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import firebase from '../../../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useOutletContext } from 'react-router-dom';
const { storage } = firebase;
export default function BusinessDetails() {
  const {
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
    logoURL,
    setLogoURL,
  } = useOutletContext();

  const [progress, setProgress] = useState(0);
  const [logo, setLogo] = useState(null);

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
        setLogoURL(URL);
      }
    );
  };

  useEffect(() => {
    uploadFile(logo);
  }, [logo]);

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundImage: `url(${logoURL || 'https://source.unsplash.com/random'})`,
          }}
          className={Styles.imageContainer}
        >
          <input
            type='file'
            variant='outlined'
            placeholder='Upload DP'
            onChange={(e) => {
              setLogo(e.target.files[0]);
            }}
            className={Styles.imagePicker}
          />
        </div>
      </Box>
      <Box
        style={{
          flex: 1,
        }}
      >
        <Stack spacing={2}>
          <TextField
            id='text'
            size='small'
            variant='outlined'
            placeholder='Shop Name'
            value={businessName}
            onChange={(e) => {
              setBusinessName(e.target.value);
            }}
          />
          <TextField
            placeholder='Email'
            size='small'
            variant='outlined'
            value={businessEmail}
            onChange={(e) => {
              setBusinessEmail(e.target.value);
            }}
          />
          <TextField
            placeholder='Address'
            size='small'
            variant='outlined'
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <TextField
            placeholder='Phone'
            size='small'
            type='number'
            variant='outlined'
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Select
            label='Business Type'
            size='small'
            variant='outlined'
            onChange={(e) => {
              setBusinessType(e.target.value);
            }}
            value={businessType}
          >
            <MenuItem value={'Seller'}>Seller</MenuItem>
            <MenuItem value={'Retailer'}>Retailer</MenuItem>
          </Select>
        </Stack>
      </Box>
    </Container>
  );
}
