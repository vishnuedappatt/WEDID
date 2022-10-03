import React,{useState,useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Link  } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../../../axios';
import Button from '@mui/material/Button';
// for badge
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail'

function SideBar() {
   
    const [single,setSingle]=useState('')
    const [leng,setLen]=useState('')
    const [lengz,setLengz]=useState('')
    useEffect(() => {
    userSingleJobHistory()
    userSingle()
    }, [])
    
     // user datas
     const userSingleJobHistory=async(id)=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
      console.log(id,'ddd')
     await axios.get(`job/verify_day_employee/`,{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
        setSingle(res.data)
          console.log(res.data,'count')
          console.log(res.data.length,'jkjkj')
          setLengz(res.data.length)
        
      })
  }

  // / user datas
     const userSingle=async(id)=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
      console.log(id,'ddd')
     await axios.get(`job/verify_day_user/`,{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
        setSingle(res.data)
          console.log(res.data,'count')
          console.log(res.data.length,'jkjkj')
          setLen(res.data.length)
        
      })
  }
 


  return (
    <div>
         <ListGroup className='p-5' style={{'height':'90vh','backgroundColor':'black'}}>
         <Link style={{'backgroundColor':'black' ,'color':'red','textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-2'  to="/admin">   <Button  variant="contained" color='warning' fullWidth >Dashboard </Button></Link>
         <Link style={{'backgroundColor':'black' ,'color':'red','textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-2'  to="/admin/userView">   <Button  variant="contained" color='warning' fullWidth >user details</Button></Link>
      
        <Link style={{'backgroundColor':'black' ,'color':'red','textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/admin/job"><Button  variant="contained" style={{backgroundColor:'white',color:'black',width:'100%'}} fullWidth >Job Details</Button></Link>
                    
        <Link style={{'backgroundColor':'black' ,'color':'red','textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/admin/rent"><Button  variant="contained" style={{backgroundColor:'white',color:'black'}} fullWidth > Rent Details </Button></Link>
        <Link style={{'backgroundColor':'black' ,'color':'red','textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/admin/complete"><Button  variant="contained" style={{backgroundColor:'white',color:'black'}} fullWidth > Completed job Service </Button></Link>
        <Link style={{'backgroundColor':'black' ,'color':'red','textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/admin/profit"><Button  variant="contained" style={{backgroundColor:'white',color:'black'}} fullWidth > Profit Details </Button></Link>      
        <Link style={{'backgroundColor':'black' ,'color':'red','textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/admin/complaint"><Button  variant="contained" style={{backgroundColor:'white',color:'black'}} fullWidth > Complaints Details </Button></Link>    
        <Link style={{'backgroundColor':'black' ,'color':'red','textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/admin/payment"><Button  variant="contained" style={{backgroundColor:'white',color:'black'}} fullWidth > Pending Payment </Button></Link>            
    
                 
      </ListGroup>
    </div>
  )
}
  
export default SideBar