import React,{useState,useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link  } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function ListSideBar({val}) {
    const [color,setColor]=useState('white')
    const [color1,setColor1]=useState('white')
    const [color2,setColor2]=useState('white')
    const [color3,setColor3]=useState('white')
    const [color4,setColor4]=useState('white')
    const [color5,setColor5]=useState('white')


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
        </AccordionDetails>
      </Accordion>
       
        {/* <Link style={{'backgroundColor':'black' ,'color':color1,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/jobhistory">Job History</Link> */}
        {/* <Link style={{'backgroundColor':'black' ,'color':color2,'textDecoration':'none','textAlign':'center','fontSize':'22px'}}className='mt-5'   to="/renthistory">Rent History</Link> */}
        {/* <Link style={{'backgroundColor':'black' ,'color':color5,'textDecoration':'none','textAlign':'center','fontSize':'22px'}} className='mt-5'   to="/editprofile">ProfilEdit </Link>              */}
    </ListGroup>
    </div>
  )
}
  
export default ListSideBar