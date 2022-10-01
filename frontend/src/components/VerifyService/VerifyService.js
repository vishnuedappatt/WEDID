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
import VerifyForm from '../common/Form/VerifyForm';
import ReactLoading from 'react-loading';
import ComonSnack from '../common/CommonSnackbar/CoomonSnack';

function VerifyService() {

  const [user,setUser]=useState('')



    useEffect(() => {

      EmployerVerify()

    }, [])
    

     // user datas
     const EmployerVerify=async()=>{   
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

  const handleClickOpen = (id,number) => {
    setOpen(true);
    userSingleJobHistory(id)
    VerifyData(number)
    setOrder(number)

  };

  const handleClose = () => {
    setOpen(false);
  };



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



const [verify,setVerify]=useState('')
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

const [startVerified,setStartVerified]=useState(false)

const [code,setCode]=useState('')
const [order,setOrder]=useState('')
const [error,setError]=useState('')
// sent otp
const otpVerify=async(number)=>{   
  let request=(JSON.parse(localStorage.getItem('token')))  
  setStartVerified(true)
await axios.post('job/start_otp_check/',{number:order,otp:code},{
      headers: {
          Authorization:'Bearer '+ request
        }
  }).then((res)=>{
      console.log(res.data,'verify ') 
      console.log(res.data)  
      VerifyData(order)
      setStartVerified(false)

  }).catch((err)=>{
    setError(err.response.data.error)
    handleClickze()
  })
}
// sent otp
const endOtpVerify=async()=>{   
  let request=(JSON.parse(localStorage.getItem('token')))  
  setStartVerified(true)
await axios.post('job/end_otp_check/',{number:order,otp:code},{
      headers: {
          Authorization:'Bearer '+ request
        }
  }).then((res)=>{
      console.log(res.data,'verify ') 
      console.log(res.data)  
      VerifyData(order)
      setStartVerified(false)
  }).catch((err)=>{
    setError(err.response.data.error)
    handleClickze()
  })
}

const [openze, setOpenze] = React.useState(false);

const handleClickze = () => {
  setOpenze(true);
};

const handleCloseze = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenze(false);
};

// bar loading
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
          <th className='vanish'>posted on</th>
          <th className='vanish'>valid</th>
          <th>view </th>
        </tr>
      </thead>
      <tbody> 
       {user && user.map((obj)=>     
       <tr>
          <td >{obj.id}</td>
          <td>{obj.title}</td>
          <td>{obj.category.name }</td>
          <td className='vanish'>{String(obj.created_at).slice(0,10).split("-").reverse().join("-")}</td>
          <td className='vanish'>{String(obj.valid_at).split("-").reverse().join("-")}</td>
          <td style={{color:'blue',cursor:'pointer'}} onClick={()=>handleClickOpen(obj.id,obj.ordernumber)}><TouchAppIcon /></td> 
        </tr> 

         )}       
      </tbody>
    </Table>
        {single && 
         <Dialog
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
              <div>             
                 {/* {(verify.start_otp && verify.end_otp) && <span>employee waiting of your response</span> } */}
                  {/* {(verify.start_verify || !verify.end_otp ) ? <span>Job started  ,waiting of Employer response</span> :' '}  */}
                </div> 

               {(verify.start_otp  )?
                 <div>     
                             
                  {(verify.start_verify ) ?
                  <div>{
                    verify.end_verify ?   
                    <div>
                      {verify.job_end ?  <span style={{color:'green'}}> Money will credit to Employee account Successfully  !!</span> :
                           <span>Job Completed successfully !! Money will credit to Employee account  with in few hours</span> 
                      }
                          
                    </div>                  
                     :    <span>Job started !!!! You are waiting for employer confirmation </span> 
                    }
                     
                  </div>
                 :
                    <div>
                       <span>Please enter the otp you get</span> 
                        <VerifyForm  save={otpVerify} set1={setCode} data1={code}  savebtn='Verify'/>
                        { startVerified &&   <Example  type='bars' color='red'/> }
                     {openze && <ComonSnack onClose={handleCloseze}  message={error} open={openze} /> }
                    </div>
                       } 

                </div> 
                : <span>waiting for  employer response  !!!</span>} 
                      {(verify.end_otp  )?
                 <div>
                  {(!verify.end_verify ) ?
                  <VerifyForm  save={endOtpVerify} set1={setCode} data1={code}  savebtn='job complete Verify'/> :'' } 
                     { startVerified &&   <Example  type='bars' color='red'/> }
                     {openze && <ComonSnack onClose={handleCloseze} message={error} open={openze} /> }

                </div> 
                : ''} 
                
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
      
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

export default VerifyService