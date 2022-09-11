import React,{useState} from 'react'
import Snackbar from '@mui/material/Snackbar';


const CommonSnackbar=({transition,open,onClose,values,message})=> {
  console.log(message,'tesdsfk')
  console.log(open,'opee')
  return (
    <div>
      <Snackbar
      
      anchorOrigin={{
        vertical:'top',
        horizontal:'center'
      }}
      // style={{marginTop:val+'rem'}}
        open={open}
        autoHideDuration={4000}
        onClose={onClose}
        TransitionComponent={transition}
        message=' are you sure '
        key={transition ? transition.name : ''}
      />
    </div>
  );
}


export default CommonSnackbar;