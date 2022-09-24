import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Form=({save,cancel,data1,data2,set1,set2,savebtn})=>{
    return(
        <div style={{margin:'2rem',paddingTop:'2rem'}}>
      
         <TextField 
            error
            id="outlined-error"
            label="First Name"
            fullWidth
            value={data1}
            onChange={(e)=>set1(e.target.value)}
            />

            <TextField style={{marginTop:'2rem'}}
            error
            id="outlined-error-helper-text"
            label="Last Name"
            value={data2}
            onChange={(e)=>set2(e.target.value)}
            fullWidth
            // helperText="Incorrect entry."
            />
                  <Button style={{float:'right',marginTop:'30px'}} onClick={save} variant="contained" color='success'>{savebtn}</Button>
          <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={cancel} variant="contained" color='error' >Cancel </Button>
  


    {/* </Box> */}

          
        </div>

    )
}


export default Form