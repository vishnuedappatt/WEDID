import React,{useState,useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link  } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from '../../axios';
// for badge
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail'

function ListSideBar({val}) {
    const [color,setColor]=useState('white')
    const [color1,setColor1]=useState('white')
    const [color2,setColor2]=useState('white')
    const [color3,setColor3]=useState('white')
    const [color4,setColor4]=useState('white')
    const [color5,setColor5]=useState('white')

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
     await axios.get(`job/verify_day_user/`,{
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
     await axios.get(`job/verify_day_employee/`,{
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
 



    useEffect(() => {
        console.log('bobo')
         if (val===1){
            setColor('red')
            setColor1('white')
            setColor2('white')
            setColor3('white')
            setColor4('white')
            setColor5('white')
        }else if(val===2){
            setColor1('red')
            setColor('white')
            setColor2('white')
            setColor3('white')
            setColor4('white')
            setColor5('white')
        }else if(val===3){
            setColor2('red')
            setColor('white')
            setColor1('white')
            setColor3('white')
            setColor4('white')
            setColor5('white')
        } else if(val===4){
          setColor3('red')
          setColor('white')
          setColor1('white')
          setColor2('white')
          setColor4('white')
          setColor5('white')
      }else if(val===5){
        setColor4('red')
        setColor('white')
        setColor1('white')
        setColor2('white')
        setColor3('white')
        setColor5('white')
      }
        else {
          setColor5('red')
          setColor('white')
          setColor1('white')
          setColor2('white')
          setColor3('white')
          setColor4('white')    
        }
    }, [val])
    
   


  return (
    <div>
         <ListGroup className='p-5' style={{'height':'60vh','backgroundColor':'black'}}>
         <Link style={{'backgroundColor':'black' ,'color':color,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'  to="/profile">Profile</Link>
         <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontWeight:'900'}}>JOB HISTORY</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Link style={{'backgroundColor':'black' ,'color':color1,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'  to="/givenjobs">Given Jobs</Link>       
          </Typography>
          <Typography>
          <Link style={{'backgroundColor':'black' ,'color':color2,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'  to="/takenjobs">Taked Jobs</Link>
            
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className='mt-5'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{fontWeight:'900'}}>RENT HISTORY</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <Link style={{'backgroundColor':'black' ,'color':color3,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'  to="/givenrents">Given Rents</Link>       
          </Typography>
          <Typography>
          <Link style={{'backgroundColor':'black' ,'color':color4,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'  to="/takenrents">Taked Rents</Link>
            
          </Typography>
          <Typography>
         
                </Typography>
        </AccordionDetails>
      </Accordion>
      <Stack spacing={2} direction="row">
        <Link style={{'backgroundColor':'black' ,'color':color1,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/profile/verify">Today Service Manager</Link>
    
        {leng &&  <Badge className='mt-5' badgeContent={leng} color="secondary">
            <MailIcon color="primary" />
          </Badge>   }     
        </Stack>
        <Stack spacing={2} direction="row">
        <Link style={{'backgroundColor':'black' ,'color':color1,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/profile/verifier">Today Task Provider </Link>
    
          <Badge className='mt-5' badgeContent={lengz} color="secondary">
            <MailIcon color="primary" />
          </Badge>           
        </Stack>      
     
    </ListGroup>
    </div>
  )
}
  
export default ListSideBar