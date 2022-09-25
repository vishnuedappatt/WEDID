import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const VerifyForm=({save,cancel,data1,set1,savebtn})=>{
    return(
        <div style={{margin:'2rem',paddingTop:'2rem'}}>
      
         <TextField 
            error
            id="outlined-error"
            label="Enter the otp "
            fullWidth
            value={data1}
            onChange={(e)=>set1(e.target.value)}
            />
          
                  <Button style={{float:'right',marginTop:'30px'}} onClick={save} variant="contained" color='success'>{savebtn}</Button>
          <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={cancel} variant="contained" color='error' >Cancel </Button>

          
        </div>

    )
}


export default VerifyForm