import React, { useState ,useEffect} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';
import axios from '../../../axios';
import {useNavigate} from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// for switch
import Switch from '@mui/material/Switch';
import SideBar from '../SideBar/SideBar';
import './userview.css'

const label = { inputProps: { 'aria-label': 'Switch demo' } };


function UserView() {
 
  const navigate=useNavigate()
    useEffect(() => {
    userList()
    }, [])
    
    const [user,setUser]=useState([])
     // user datas
     const userList=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
 
     await axios.get('adminz/user/',{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
          setUser(res.data.results)
          console.log(res.data)
          console.log(res.data.results,'evide work ann')
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



const handleAvailable=async(id,name)=>{
  let request=(JSON.parse(localStorage.getItem('token'))) 
  if (name){
    await axios.patch(`adminz/user/${id}/`,{
      is_active:'False'
    },{
      headers: {
          Authorization:'Bearer  '+ request
      }
  }).then((res)=>{
     console.log(res.data)
     userList()
    })
  }else{
    await axios.patch(`adminz/user/${id}/`,{
      is_active:'True'
    },{
      headers: {
          Authorization:'Bearer  '+ request
      }
  }).then((res)=>{
     console.log(res.data)
     userList()
    })
  }

}

  return (
    <div>
    <Row>
    <Col lg={4}>
      <SideBar />
    </Col>
    <Col lg={8}>
      <div style={{'height':'60vh','backgroundColor':'black'}}>
      <div style={{'height':'60vh','backgroundColor':'white '}}>
      <Card sx={{ minWidth:'30%', maxWidth:'100%' ,padding:'50px'}}>          
      <Card>
        {(user.length==0)?
      <div align='center'>
      <h3>No match found</h3>
    </div> :
      <Table striped>
      <thead>
        <tr>
          <th className='vanish'>No.s</th>
          <th className='vanish'>user id</th>
          <th>Full Name</th>
          <th className='vanish'>Email</th>
          <th>Mobile</th>
          <th>Block/Active</th>
        
        </tr>
      </thead>
      <tbody> 
       {user && user.map((obj,index)=>     
       <tr>
          <td  className='vanish'>{index+1}</td>
          <td  className='vanish'>{obj.id}</td>
          <td>{obj.first_name + obj.last_name}</td>
          <td  className='vanish'>{obj.email}</td>
          <td>{obj.mobile}</td>        
          <td> <Switch
              checked={obj.is_active}
              onClick={()=>handleAvailable(obj.id,obj.is_active)}
              inputProps={{ 'aria-label': 'controlled' }}
            /></td>
          {/* <td style={{color:'blue',cursor:'pointer'}} onClick={()=>handleClickOpen(obj.id)}><TouchAppIcon /></td>  */}
             
     
        </tr> 

         )}       
      </tbody>
    </Table> }
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
            <h5 style={{color:'blue',fontWeight:800}}> Title :<span style={{color:'black'}}>{single.title} </span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> Category :<span style={{color:'black'}}>{single.category.name}</span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> District :<span style={{color:'black'}}>{single.district.district} </span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> City :<span style={{color:'black'}}>{single.city.city}</span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}>  discription  :<span style={{color:'black',fontWeight:100,fontSize:'16px'}}>{single.discriptions}</span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> Posted on :<span style={{color:'black'}}>{String(single.created_at).slice(0,10).split("-").reverse().join("-")}</span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> Valid on :<span style={{color:'black'}}> {String(single.valid_at).split("-").reverse().join("-")} </span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> Rate :<span style={{color:'black'}}>{single.rate}</span></h5><br></br>
           { single.booked ?  
           <div><h5>Booked Person</h5>
                Name :  {single.booked_person.first_name} {single.booked_person.last_name}<br></br>
                Eamil :{single.booked_person.email}<br></br>
                Mobile :{single.booked_person.mobile}<br></br> </div> :' ' }          
              
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
          {single.booked ?  '':  <Button onClick={()=>navigate(`edit/${single.id}/`)} autoFocus>
              Edit
              </Button> }
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

export default UserView