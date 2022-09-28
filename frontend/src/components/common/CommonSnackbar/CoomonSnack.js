import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={12} ref={ref} variant="filled" {...props} />;
});

function ComonSnack({open,onClose,handleClick,message}) {
  return (
    <div>
         <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        {/* <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        
        </Alert> */}
      </Snackbar>
      <Alert severity="error">{message}</Alert>
    
    </Stack>
    </div>
  )
}

export default ComonSnack