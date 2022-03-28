import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Snackbar, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { useAuth } from './../../context/AuthContext';

export default function Layout() {
  const [open, setOpen] = useState(true);

  const { signout } = useAuth();
  return (
    <div>
      Layout
      <Outlet />
      <Button onClick={signout} variant='contained'>
        Logout
      </Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={6000}
        message='helloQ@gmaolc.om'
      ></Snackbar>
    </div>
  );
}
