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
import SideBar from '../SideBar/SideBar';
import Slide from '@mui/material/Slide';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  


function PaymentGiven() {

  const [user,setUser]=useState('')
 
    useEffect(() => {

        pendingPayment()
        
    }, [])
    

     // user datas
    const pendingPayment=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
 
     await axios.get(`adminz/pay/`,{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
        setUser(res.data.results)
          console.log(res.data.results,'evide work ann')
      })
  }



  const PaymentDone=async(id)=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  

   await axios.patch(`adminz/pay/${verifyId}/`,{
    job_end:'True',
   },{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      setUser(res.data.results)
      pendingPayment()
      handleClose()
        console.log(res.data.results,'evide work ann')
    })
}


  const [open, setOpen] = React.useState(false);
const [verifyId,setVerifyId]=useState(' ')

  const handleClickOpen = (id) => {
    setOpen(true);
    setVerifyId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
    <Row>
    <Col lg={4}>
      <SideBar val={4}/>
    </Col>
    <Col lg={8}>
      <div style={{'height':'60vh','backgroundColor':'black'}}>  
      <div align='center'>
      <h3 style={{textAlign:'center',color:'white'}}>PAYMENT GIVING ACTION TO EMPLOYEE</h3>
      </div>


    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you confirm to pay ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={PaymentDone}>Agree</Button>
        </DialogActions>
      </Dialog>
      <div style={{'height':'60vh','backgroundColor':'white '}}>
          <Card sx={{ minWidth:'30%', maxWidth:'100%' ,padding:'50px'}}> 

           
      <Card>
     {(user.length==0) ?
     <div align='center'>
     <h3>No match found</h3>
   </div> :
      <Table striped>
      <thead>
        <tr>
          <th>id</th>
          <th> Order no</th>
          <th>name</th>
       
          <th>pay</th>
        </tr>
      </thead>
    
      <tbody> 
       {user && user.map((obj,index)=>     
       <tr>
          <td >{index+1}</td>
          <td>{obj.order_number} </td>
          <td>{obj.name }</td>
         
          <td><Button variant="contained" onClick={()=>handleClickOpen(obj.id)}>Pay</Button></td> 
        </tr> 
         )}       
        </tbody>
    </Table>      }
      </Card>
    </Card>
        </div>

      </div>
    </Col>
    </Row>
    </div>
  )
}

export default PaymentGiven