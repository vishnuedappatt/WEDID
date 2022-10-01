import React, { useState ,useEffect} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
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
import Switch from '@mui/material/Switch';
import SideBar from '../SideBar/SideBar';

const label = { inputProps: { 'aria-label': 'Switch demo' } };




function Complaint() {

  const [user,setUser]=useState('')
 
    useEffect(() => {

        allComplaint()
        
    }, [])
    

     // user datas
    const allComplaint=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
 
     await axios.get('adminz/complaint/',{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
        setUser(res.data)
          console.log(res.data,'evide work ann')
      })
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);


  };

  const handleClose = () => {
    setOpen(false);
  };


const [show,setShow]=useState(false)
const [view,setView]=useState('job')

const handler=()=>{
    if (show){
        setShow(false)
        setView('job')
    }else{
        setShow(true)
        setView('rent')
    }
}



  return (
    <div>
    <Row>
    <Col lg={4}>
      <SideBar val={4}/>
    </Col>
    <Col className='mt-5' lg={8}>
    <div align='center'>
      <h3 style={{textAlign:'center',color:'white'}}>COMPLAINT PORTAL</h3>
      </div>
      <div style={{'height':'60vh','backgroundColor':'black'}}>  

      <div style={{'height':'60vh','backgroundColor':'white '}}>
          <Card sx={{ minWidth:'30%', maxWidth:'100%' ,padding:'50px'}}> 
          <div align='center'>
              <Button onClick={handler} variant="contained">{view}</Button>
          </div>
           
      <Card>
    
      <Table striped>
      <thead>
        <tr>
          <th>id</th>
          <th> Name of applicant</th>
          <th>Complaint</th>
          <th>Create</th>
        
        </tr>
      </thead>
      { show ?
      <tbody> 
       {user && user.rent.map((obj,index)=>     
       <tr>
          <td >{index+1}</td>
          <td>{obj.user.first_name} {obj.user.last_name}</td>
          <td>{obj.complaint }</td>
          <td>{String(obj.create_at).slice(0,10).split("-").reverse().join("-")}</td>     
        </tr> 
         )}       
      </tbody> : 
         <tbody> 
         {user && user.job.map((obj,index)=>     
         <tr>
            <td >{index+1}</td>
            <td>{obj.user.first_name} {obj.user.last_name}</td>
            <td>{obj.complaint }</td>
            <td>{String(obj.create_at).slice(0,10).split("-").reverse().join("-")}</td>     
          </tr> 
           )}       
        </tbody>
      
      }
    </Table>      
      </Card>
    </Card>
        </div>

      </div>
    </Col>
    </Row>
    </div>
  )
}

export default Complaint