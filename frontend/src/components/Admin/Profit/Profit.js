import React, { useState ,useEffect} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListSideBar from '../../ListSideBar/ListSideBar'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';
import axios from '../../../axios';
import {useNavigate} from 'react-router-dom'
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SideBar from '../SideBar/SideBar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';



function Profit() {

  useEffect(() => {
    JobProfit()
    jobAll()
    RentProfit()
    rentAll()

  }, [])
  
  const [proJob,setProJob]=useState([])
   const JobProfit=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
 
     await axios.get('adminz/profit/',{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
        setProJob(res.data)
        console.log(res.data)        
      })
  }

  const [proRent,setRentJob]=useState([])
  const RentProfit=async()=>{   
     let request=(JSON.parse(localStorage.getItem('token')))  

    await axios.get('adminz/rentprofit/',{
         headers: {
             Authorization:'Bearer '+ request
           }
     }).then((res)=>{
       setRentJob(res.data)        
     })
 }
 


const [profJob,setProfJob]=useState([])
 const jobAll=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  

   await axios.get('adminz/profitjob/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        setProfJob(res.data)   
      console.log(res.data)     
    })
}


const [profRent,setProfRent]=useState([])
const rentAll=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  

   await axios.get('adminz/profitrent/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        setProfRent(res.data)   
      console.log(res.data)     
    })
}






// for instant change in the job details
const [sample,setSample]=useState(true)
// for instant change in the rent details
const [samplez,setSamplez]=useState(true)
// for rent changing to job
const [show,setShow]=useState(true)


const handleChange=()=>{
    if (sample){
        setSample(false)
    }
    else{
        setSample(true)
    }
}

const handleChanger=()=>{
    if (show){
        setShow(false)
        console.log('false')
    }else{
        setShow(true)
        console.log('true')
    }
}

  return (
    <div>
    <Row>
    <Col lg={4}>
      <SideBar />
    </Col>
    <Col lg={8}>
      <div style={{'backgroundColor':'black',marginTop:'40px'}}>
        <h4 align='center' style={{paddingTop:'30px',color:'white'}}>Profit Details</h4>
      <Box 
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 5,
          width: 496,
          height: 150,
        },
      }}
    >
      <Paper elevation={3} >
        <div align='center' style={{marginTop:'30px'}}>
        <h4>Profit from Job Service</h4>
        
        <Button variant="contained" color="error" disableTouchRipple style={{borderRadius:'20px'}} ><CurrencyRupeeIcon /><h5>{proJob.total}  /-</h5></Button><br></br>
        <Button onClick={handleChanger} variant='black'><TouchAppIcon  /></Button>
        </div>
   
      </Paper>
      <Paper elevation={3}>
      <div align='center' style={{marginTop:'30px'}}>
        <h4>Profit from Rent Service</h4>        
            <Button variant="contained" color="error" disableTouchRipple style={{borderRadius:'20px'}} ><CurrencyRupeeIcon /><h5>{proRent.sum}  /-</h5></Button><br></br>      
            <Button onClick={handleChanger} ><TouchAppIcon  /></Button>
        </div>
      </Paper>
    
    </Box>
    
    </div>
    <Card sx={{ minWidth:'30%', maxWidth:'100%' ,padding:'50px'}}>
    <Card>
   
    <div align='center'>
        <h6>{show ? <h5>JOB</h5> : <h5>RENT</h5>} </h6>
    <Button onClick={handleChange} ><TouchAppIcon  />{sample ? 'Buyer' : 'Employer' }</Button>
    </div>
    <Table striped bordered hover>
    
      <thead>
        <tr>
            <th>No.s</th>
          <th>ordernumber</th>
          <th>Pay id</th>
          <th>Price</th>
          <th>order_date</th>
        </tr>
      </thead>
{show ?
<>
     { sample ? 
     <tbody>
      { profJob.employer  && profJob.employer.map((obj,index)=>  
        <tr>
          <td>{index+1}</td>
          <td>{obj.order_product}</td>
          <td>{obj.order_payment_id} {obj.order_amount}</td>
          <td>{(obj.order_amount >500 )? ( Math.round(parseInt(obj.order_amount)*0.10)) :(Math.round(parseInt( obj.order_amount)*0.05))  }</td>
          <td>{obj.order_date}</td>
        </tr>
            )}          
      </tbody> :
       <tbody>
       { profJob.buyer  && profJob.buyer.map((obj,index)=>
   
         <tr>
           <td>{index+1}</td>
           <td>{obj.order_product}</td>
           <td>{obj.order_payment_id}</td>
           <td>{obj.order_amount}</td>
           <td>{obj.order_date}</td>
         </tr>
             )}
        
       </tbody> } 
       </> : 
       <>
       { sample ? 
       <tbody>
        { profRent  && profRent.map((obj,index)=>  
          <tr>
            {obj.buyer ? ' ':
            <>
            <td>{index+1}</td>
            <td>{obj.order_product}</td>
            <td>{obj.order_payment_id} {obj.order_amount}</td>
            <td>{(obj.order_amount >500 )? ( Math.round(parseInt(obj.order_amount)*0.10)) :(Math.round(parseInt( obj.order_amount)*0.05))  }</td>
            <td>{obj.order_date}</td>
            </> }
          </tr>
              )}          
        </tbody> :
         <tbody>
         { profRent  && profRent.map((obj,index)=>
     
           <tr>
            {obj.buyer &&
            <>
             <td>{index+1}</td>
             <td>{obj.order_product}</td>
             <td>{obj.order_payment_id}</td>
             <td>{obj.order_amount}</td>
             <td>{obj.order_date}</td>
             </>
            }
           </tr>
               )}
          
         </tbody> } 
         </>
       }
    </Table>    

    </Card>
        </Card>       
     </Col>
     </Row>
    </div>
  )
}

export default Profit