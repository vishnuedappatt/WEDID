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
import ImageUrl from '../common/Image/Image';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


function RentGivingHistory() {
  const [user,setUser]=useState('')
  const navigate=useNavigate()
    useEffect(() => {
      userRentHistory()
    }, [])
    

     // user datas
     const userRentHistory=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
 
     await axios.get('rent/rent_giving_history/',{
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
    userSingleRentHistory(id)

  };

  const handleClose = () => {
    setOpen(false);
  };



  // id getting

  const [single,setSingle]=useState('')
  
   // user datas
   const userSingleRentHistory=async(id)=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
   await axios.get(`rent/singleview/${id}/`,{
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
    await axios.patch(`rent/rents/${id}/`,{
      available:'False'
    },{
      headers: {
          Authorization:'Bearer  '+ request
      }
  }).then((res)=>{
     console.log(res.data)
     userRentHistory()
    })
  }else{
    await axios.patch(`rent/rents/${id}/`,{
      available:'True'
    },{
      headers: {
          Authorization:'Bearer  '+ request
      }
  }).then((res)=>{
     console.log(res.data)
     userRentHistory()
    })
  }

}


  return (
    <div>
    <Row>
    <Col lg={4}>
      <ListSideBar val={4}/>
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
          <th>Available</th>
          <th>view </th>
        </tr>
      </thead>
      <tbody> 
       {user && user.map((obj,index)=>     
       <tr>
          <td >{index+1}</td>
          <td>{obj.title}</td>
          <td>{obj.category.name }</td>
          <td>{String(obj.created_at).slice(0,10).split("-").reverse().join("-")}</td>
          <td>{String(obj.valid_at).split("-").reverse().join("-")}</td>
          <td> <Switch
              checked={obj.available}
              onClick={()=>handleAvailable(obj.id,obj.available)}
              inputProps={{ 'aria-label': 'controlled' }}
            /></td>
    
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
            <h5 style={{color:'blue',fontWeight:800}}> Title :<span style={{color:'black'}}>{single.title} </span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> Category :<span style={{color:'black'}}>{single.category.name}</span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> District :<span style={{color:'black'}}>{single.district.district} </span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> City :<span style={{color:'black'}}>{single.city.city}</span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}>  discription  :<span style={{color:'black',fontWeight:100,fontSize:'16px'}}>{single.discriptions}</span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> Posted on :<span style={{color:'black'}}>{String(single.created_at).slice(0,10).split("-").reverse().join("-")}</span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> Valid on :<span style={{color:'black'}}> {String(single.valid_at).split("-").reverse().join("-")} </span></h5><br></br>
            <h5 style={{color:'blue',fontWeight:800}}> Rate :<span style={{color:'black'}}>{single.rate}</span></h5><br></br>
            { single.image  && <div><img style={{width:'100px',height:'100px'}} src={ImageUrl+single.image} /> <img style={{width:'100px',height:'100px'}} src={ImageUrl+single.image1} /><img style={{width:'100px',height:'100px'}} src={ImageUrl+single.image2} /></div> }
            { single.booked ?  <div>
            <h5>Booked Person</h5>
                Name :  {single.booked_person.first_name} {single.booked_person.last_name}<br></br>
                Eamil :{single.booked_person.email}<br></br>
                Mobile :{single.booked_person.mobile}<br></br>  
                </div> :' '}            
              
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
           {single.booked ?' ':   <Button onClick={()=>navigate(`editz/${single.id}/`)} autoFocus>
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

export default RentGivingHistory