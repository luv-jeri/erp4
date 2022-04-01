import React from 'react';
import Styles from './DeliveryDetails.module.css';
import { useState, useEffect } from 'react';

import {
  TextField,
  Button,
  Stack,
  Container,
  Box,
  Select,
  MenuItem,
} from '@mui/material';

import { useOutletContext } from 'react-router-dom';

export default function DeliveryDetails() {
  const { deliveryName, setDeliveryName, city, setCity } = useOutletContext();

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
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
            value={deliveryName}
            onChange={(e) => {
              setDeliveryName(e.target.value);
            }}
          />

          <Select
            label='Business Type'
            size='small'
            variant='outlined'
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          >
            <MenuItem value={'Indore'}>Indore</MenuItem>
            <MenuItem value={'Delhi'}>Delhi</MenuItem>
          </Select>
        </Stack>
      </Box>
    </Container>
  );
}
