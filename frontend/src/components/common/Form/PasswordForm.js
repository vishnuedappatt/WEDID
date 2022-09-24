import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const PasswordForm=({save,cancel,data1,data2,data3,set1,set2,set3,error})=>{
    return(
        <div style={{margin:'2rem',paddingTop:'2rem'}}>
           
         <TextField 
            error
            id="outlined"
            label="current password"
            fullWidth
            value={data1}
            onChange={(e)=>set1(e.target.value)}
            />

            <TextField style={{marginTop:'2rem'}}
            error
            id="outlined"
            label="new password"
            value={data2}
            onChange={(e)=>set2(e.target.value)}
            fullWidth
            // helperText="Incorrect entry."
            />
              <TextField style={{marginTop:'2rem'}}
            error
            id="outlined"
            label="confirm password"
            value={data3}
            onChange={(e)=>set3(e.target.value)}
            fullWidth
            // helperText="Incorrect entry."
            />
         {error &&   <h4 style={{color:'red'}}> * {error}</h4> }
                  <Button style={{float:'right',marginTop:'30px'}} onClick={save} variant="contained" color='success'>Save</Button>
          <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={cancel} variant="contained" color='error' >Cancel </Button>
  
            

    {/* </Box> */}

          
        </div>

    )
}


export default PasswordForm