import React, { useState ,useEffect} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListSideBar from '../ListSideBar/ListSideBar'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';
import axios from '../../axios';
import {useNavigate} from 'react-router-dom'
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Countdown from 'react-countdown';
import Chip from '@mui/material/Chip';

function VerifyServiceEmploye() {

  const [user,setUser]=useState('')
  const navigate=useNavigate()
    useEffect(() => {
    userJobHistory()
    }, [])
    

     // user datas
     const userJobHistory=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
 
     await axios.get('job/verify_day_user/',{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
          setUser(res.data)
          
      })
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
    userSingleJobHistory(id)

  };

  const handleClose = () => {
    setOpen(false);
  };

  // showing counter
  const [count,setCount]=useState(false)

  const handleSubmit=(id)=>{
    console.log(id)
    setCount(true)
    setTimeout(()=>{
      setCount(false);
  }, 100000);
  
  }


  // id getting

  const [single,setSingle]=useState('')
  
   // user datas
   const userSingleJobHistory=async(id)=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
    console.log(id,'ddd')
   await axios.get(`job/singlejob/${id}/`,{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      setSingle(res.data)
        console.log(res.data,'evide work ann')
    })
}
const Completionist = () => <span>You are good to go!</span>;

  return (
    <div>
    <Row>
    <Col lg={4}>
      <ListSideBar val={2}/>
    </Col>
    <Col lg={8}>
      <div style={{'height':'60vh','backgroundColor':'black'}}>
      <div style={{'height':'60vh','backgroundColor':'white '}}>
          <Card sx={{ minWidth:'30%', maxWidth:'100%' ,padding:'50px'}}> 
            {/* <Button onClick={()=>navigate('addUser')} variant="contained">Add User</Button> */}
      <Card>
      <Table striped>
      <thead>
        <tr>
          <th>id</th>
          <th> Title</th>
          <th>category</th>
          <th>posted on</th>
          <th>valid</th>
          <th>view </th>
        </tr>
      </thead>
      <tbody> 
       {user && user.map((obj)=>     
       <tr>
          <td >{obj.id}</td>
          <td>{obj.title}</td>
          <td>{obj.category.name }</td>
          <td>{String(obj.created_at).slice(0,10).split("-").reverse().join("-")}</td>
          <td>{String(obj.valid_at).split("-").reverse().join("-")}</td>
          <td style={{color:'blue',cursor:'pointer'}} onClick={()=>handleClickOpen(obj.id)}><TouchAppIcon /></td> 
          
     
        </tr> 

         )}       
      </tbody>
    </Table>
        {single &&  <Dialog
              // style={{width:'900px'}} 
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{width:'600px'}} id="alert-dialog-title">
              {"Details"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{color:'black'}} id="alert-dialog-description">
               <h5>Please Make sure that this verification OTP sent to employer and OTP verified by employer in 5 min</h5>
                <div align='center'>
                
               {count ?  <Chip label={<Countdown date={Date.now() + 100000} />} color="error" variant="contained" ></Chip>:  <Button variant="contained"  onClick={()=>handleSubmit(single.mobile)} color='success'>sent OTP</Button> }
                 
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
         
            </DialogActions>
          </Dialog>  }
      </Card>
    </Card>
        </div>
      </div>
    </Col>
    </Row>      
    </div>
  )
}

export default VerifyServiceEmploye