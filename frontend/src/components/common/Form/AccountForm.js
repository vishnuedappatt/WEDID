import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';

const AccountForm=({save,save1,cancel,data1,data2,data3,data4,data5,data6,
  set1,set2,set3,set4,set5,set6,result1,delete1,delete2,result2,
  error1,error2,error3,error4,error5,error6})=>{

  
    return(
        <div style={{margin:'2rem',paddingTop:'2rem'}}>
          <div fullWidth>
          <h6>Bank</h6>
          { result1 && result1.map((obj)=>
            <Accordion>
            
             <AccordionSummary>            
              <>
              <h6 style={{color:'red'}}>{obj.name}</h6>
                <h6 style={{color:'red',marginLeft:'50px'}}>{obj.account_no}</h6>
                <h6 style={{color:'red',marginLeft:'50px'}}>{obj.ifsc}</h6>
                <Chip onClick={()=>delete1(obj.id)} icon={<CancelIcon />}/>

              </>
             </AccordionSummary>
            </Accordion> )}
          </div>

        <Accordion className='mt-4'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontWeight:'900'}}>Account Details</Typography>
        </AccordionSummary>
        <AccordionDetails>                 
         <TextField 
          
            id="outlined"
            label="name of account holder"
            fullWidth
            value={data1}
            onChange={(e)=>set1(e.target.value)}
            />
           {error1 &&   <>   {Object.keys(error1).map((key)=>{
                                 return <div style={{color:'red'}} >{error1[key]}</div> })} </>}
         <TextField 
         
            id="outlined"
            label=" Account Number"
            fullWidth
            value={data2}
            onChange={(e)=>set2(e.target.value)}
            />
        {error2 &&   <> {Object.keys(error2).map((key)=>{
                                 return <div style={{color:'red'}} >{error2[key]}</div> })} </>}
            <TextField 
           
            id="outlined"
            label="confirm Account Number"
            value={data3}
            onChange={(e)=>set3(e.target.value)}
            fullWidth
         
            />
        {error3 &&   <> {Object.keys(error3).map((key)=>{
                                 return <div style={{color:'red'}} >{error3[key]}</div> })} </>}
              <TextField 
          
            id="outlined"
            label="IFSC code"
            value={data4}
            onChange={(e)=>set4(e.target.value)}
            fullWidth
            // helperText="Incorrect entry."
            />    
          { error4 &&   <>   {Object.keys(error4).map((key)=>{
                                 return <div style={{color:'red'}} >{error4[key]}</div> })}    </>} 

               <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={save} variant="contained" color='success' >Save </Button>
              <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={cancel} variant="contained" color='error' >Cancel </Button>
            </AccordionDetails>
          </Accordion>

          <div fullWidth>
          <h6>Upi</h6>
          { result2 && result2.map((obj)=>
            <Accordion>
            
             <AccordionSummary>            
              <>
              <h6 style={{color:'red'}}>{obj.name}</h6>
                <h6 style={{color:'red',marginLeft:'50px'}}>{obj.upi}</h6>
                <h6 style={{color:'red',marginLeft:'50px'}}>{obj.mobile}</h6>
                <Chip onClick={()=>delete2(obj.id)} icon={<CancelIcon />}/>

              </>
             </AccordionSummary>
            </Accordion> )}
          </div>

      <Accordion className='mt-4'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontWeight:'900'}}>UPI Details</Typography>
        </AccordionSummary>
        <AccordionDetails>                 
         <TextField 
          
            id="outlined"
            label="upi address"
            fullWidth
            value={data5}
            onChange={(e)=>set5(e.target.value)}
            />
             {error5 &&   <>     {Object.keys(error5).map((key)=>{
                                 return <div style={{color:'red'}} >{error5[key]}</div> })} </>}
         <TextField 
            primary
            id="outlined"
            label="mobile number"
            fullWidth
            value={data6}
            onChange={(e)=>set6(e.target.value)}
            />
             {error6 &&   <>     {Object.keys(error6).map((key)=>{
                                 return <div style={{color:'red'}} >{error6[key]}</div> })} </>}
            <TextField 
           
            id="outlined"
            label="name of account holder "
            value={data1}
            onChange={(e)=>set1(e.target.value)}
            fullWidth
            // helperText="Incorrect entry."
            />
             {error1 &&   <>     {Object.keys(error1).map((key)=>{
                                 return <div style={{color:'red'}} >{error1[key]}</div> })} </>}
                  <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={save1} variant="contained" color='success' >Save </Button>
              <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={cancel} variant="contained" color='error' >Cancel </Button>

        </AccordionDetails>
      </Accordion>
          
          
        </div>

    )
}


export default AccountForm