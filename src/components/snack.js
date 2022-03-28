import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
export default function Snack(props) {
  const { open, setOpen, message } = props;
  return (
    <Snackbar
      open={open ? true : false}
      onClose={() => setOpen(false)}
      autoHideDuration={6000}
    >
      <MuiAlert
        elevation={12}
        variant='filled'
        onClose={() => setOpen(false)}
        severity='error'
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
