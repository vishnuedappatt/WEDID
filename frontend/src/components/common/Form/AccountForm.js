import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AccountForm=({save,cancel,data1,data2,data3,set1,set2,set3,error})=>{
    return(
        <div style={{margin:'2rem',paddingTop:'2rem'}}>

        <Accordion className='mt-4'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontWeight:'900'}}>JOB HISTORY</Typography>
        </AccordionSummary>
        <AccordionDetails>
                 
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
        
        </AccordionDetails>
      </Accordion>
          
        </div>

    )
}


export default AccountForm