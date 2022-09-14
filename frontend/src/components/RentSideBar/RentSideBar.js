import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form';
import './Rentsidebar.css'
import axios from '../../axios'
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };
  
function RentSideBar() {

  return (
    <div  className='main'>
   
     <h2 className='wedid' align='center'>WEDID</h2>
     <Form align='center'>
                  <Form.Control 
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button className='submit-btn m-4' variant="outline-success">Search</Button>
                </Form>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">    
            <Accordion className= 'accordion bg-dark mt-3'>
              <AccordionSummary      
              expandIcon={<ExpandMoreIcon />}          
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{color:'white'}} >Filter by district </Typography>
              </AccordionSummary>              
              <AccordionDetails>
                <Typography>
                <Accordion>
              <AccordionDetails>
          <Typography>               
            <Box sx={{ minWidth: 120 }}>
            <Form >

            
          <FormControl  className='mt-2' fullWidth>
        <InputLabel id="demo-simple-select-label">District</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={fil_dis}
          label="district"
        //   onChange={handler}
        >
          {/* { dist ? dist.map((obj)=> */}
          <MenuItem   >hghgh</MenuItem> 
        </Select>   
        <Button className='mt-5 mb-3' type='submit' variant="outline-dark" >FILTER</Button>
      </FormControl>
      </Form>
     </Box>
        </Typography>
        </AccordionDetails>
            </Accordion>   
                </Typography>
              </AccordionDetails>
            </Accordion> 
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">                  
            
              <Accordion className='bg-dark mt-3'>
                <AccordionSummary       
                expandIcon={<ExpandMoreIcon />}          
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{color:'white'}} >Filter by place and category</Typography>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Typography>
                  <Accordion>
                <AccordionDetails>
            <Typography>               
              <Box sx={{ minWidth: 120 }}>

            <Form >
            <FormControl className='mt-2' fullWidth>
          <InputLabel id="demo-simple-select-label">category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={fil_cat}
            label="category"
            // onChange={categoryHandler}
          > 
          {/* { catege ? catege.map((obj)=> */}
            <MenuItem >hh</MenuItem>
           
          </Select>
        </FormControl>
        <FormControl className='mt-2' fullWidth>
          <InputLabel id="demo-simple-select-label">District</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={fil_dis}
            label="district" 
            // onChange={handler}
          >
           {/* { dist ? dist.map((obj)=> */}
          <MenuItem>ghgfdh</MenuItem> 
          
          </Select>
        </FormControl>
        <FormControl className='mt-2' fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={fil_city}
            label="city"
            // onChange={cityHandler}
          >
             {/* { city ? city.map((obj)=> */}
          <MenuItem >jkiuk  </MenuItem> 
           
          </Select>
          <Button className='mt-5 mb-3' type='submit' variant="outline-dark" >FILTER</Button>
        </FormControl>
        </Form>
       </Box>
          </Typography>
          </AccordionDetails>
              </Accordion>   
                  </Typography>
                </AccordionDetails>
              </Accordion> 
            </Typography>
        </Box>
     

    </div>
  )
}

export default RentSideBar