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
import ReactLoading from 'react-loading';

function VerifyServiceEmploye() {

  const [user,setUser]=useState('')
  const navigate=useNavigate()
    useEffect(() => {
    userJobHistory()
    }, [])
    

     // user datas
     const userJobHistory=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
 
     await axios.get('job/verify_day_employee/',{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
          setUser(res.data)
          
      })
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id,number) => {
    setOpen(true);
    userSingleJobHistory(id)
    VerifyData(number)

  };

  const handleClose = () => {
    setOpen(false);
  };


  // showing counter
  const [count,setCount]=useState(false)

  const handleSubmit=(id,number)=>{
    console.log(id)
    otpSenting(number)
    setCount(true)
   

    setTimeout(()=>{
      setCount(false);
      setView(false)
  }, 100000);
  
  }



  const endSubmit=(id,number)=>{
    console.log(id)
    endOtp(number)
    setCount(true)
   

    setTimeout(()=>{
      setCount(false);
      setView(false)
  }, 100000);
  
  }


  // id getting

  const [single,setSingle]=useState('')
  
   // user datas
   const userSingleJobHistory=async(id)=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  

   await axios.get(`job/singlejob/${id}/`,{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      setSingle(res.data)
        console.log(res.data,'evide work ann')
    })
}

// verifications datas
const VerifyData=async(number)=>{   
  let request=(JSON.parse(localStorage.getItem('token')))  

await axios.get(`job/verifydata/${number}/`,{
      headers: {
          Authorization:'Bearer '+ request
        }
  }).then((res)=>{
      console.log(res.data,'verify ane')
      setVerify(res.data)
      
      
  })
}

  const [verify,setVerify]=useState('')
  const [view,setView]=useState(false)
// sent otp
const otpSenting=async(number)=>{   
  let request=(JSON.parse(localStorage.getItem('token')))  

await axios.post('job/start_verify/',{number:number},{
      headers: {
          Authorization:'Bearer '+ request
        }
  }).then((res)=>{
      console.log(res.data,'verify ')
     setCount(false)
      VerifyData(number)
      setView(true)
      
  })
}


// sent otp
const endOtp=async(number)=>{   
  let request=(JSON.parse(localStorage.getItem('token')))  

await axios.post('job/end_verify/',{number:number},{
      headers: {
          Authorization:'Bearer '+ request
        }
  }).then((res)=>{
      console.log(res.data,'verify ')
     setCount(false)
      VerifyData(number)
      setView(false)
      
  })
}
const Example = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);

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
          <td style={{color:'blue',cursor:'pointer'}} onClick={()=>handleClickOpen(obj.id,obj.ordernumber)}><TouchAppIcon /></td> 
          
     
        </tr> 

         )}       
      </tbody>
    </Table>
        {single &&  <Dialog      
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
              
             
               { verify.start_otp ? 
                <div align='center'>   
                { verify.start_verify ? <div> 
                  {verify.end_otp ? <div>
                    {/* <Button variant="contained"  onClick={()=>handleSubmit(single.mobile,single.ordernumber)} color='success'>Complete job sent OTP</Button>  */}
                    <div>
                      { verify.end_verify ?
                      <div>
                        { verify.job_end ?<span style={{color:'green'}}> Money will credit your account Success fully </span> :
                        <span>Congragulations !!!! you are completed this Service Money will credit your account </span>
                         }
                      </div>
                    :
                    <span>waiting for employer response </span> }
                    </div>
                 
                  </div>:
                  <div>
                  <span>Start the job  Successfully , finish the job enter the button for verifications </span>                  
                 
                  {count ?   <Example  type='bars' color='red'/>
          :  <Button variant="contained"  onClick={()=>endSubmit(single.mobile,single.ordernumber)} color='success'>End of job </Button> }        
                  </div>}
                  </div>  :
                  <span>OTP sent Successfully , your employer is waiting for response </span>
                }
                </div> :
               <div align='center'>                    
                  <h5>Please Make sure that this verification OTP sent to employer and OTP verified by employer in 5 min   </h5>          
               {count ?   <Example  type='bars' color='red'/>
          :  <Button variant="contained"  onClick={()=>handleSubmit(single.mobile,single.ordernumber)} color='success'>sent OTP</Button> }                  
                </div> 
                }
                <div align='center'>
                { view   ?  <Chip label={<Countdown date={Date.now() + 100000} />} color="error" variant="contained" ></Chip> :''}
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