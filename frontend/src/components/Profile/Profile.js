import React,{useEffect,useState} from 'react'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import ListSideBar from '../ListSideBar/ListSideBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from '../../axios';
import Button from '@mui/material/Button';


function Profile() {


  const navigate=useNavigate()
 useEffect(() => {
  userData()
   }, [])


   const [user,setUser]=useState([])

     // user datas
  const userData=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
   await axios.get('user/profile/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        setUser(res.data)
        console.log(res.data,'evide work ann')
         
    })
}

  return (
    <div>
      <Row>
        <Col lg={4}>
          <ListSideBar val={1}/>
        </Col>
        <Col  lg={8}>
          <div style={{'height':'60vh','backgroundColor':'black'}}>
          <Card sx={{ maxWidth: 930 ,maxHeight:1000,height:'550px',padding:'50px'}}>
      <CardActionArea>
        <CardMedia style={{height:'200px',width:'200px'}} 
          component="img"
          height="50"
          width="50"
          image="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h4"  component="div">
            {user.first_name +' '+ user.last_name}
          </Typography>
          <Typography gutterBottom variant="h6"  component="div">
            <span>Email :</span> {user.email} 
          </Typography>
          <Typography gutterBottom variant="h6"  component="div">
            <span>Phone No :</span> { '+91' +  user.mobile} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
          
          </Typography>
        </CardContent>
        
      </CardActionArea>
      <Button onClick={()=>navigate('/editprofile')} variant="contained">Edit Profile</Button>
    
    </Card>
          </div>
        </Col>  

        </Row>
        {/* <Row className='justify-content-center mt-1 pt-5'>
        
            <Col lg={5}>
            <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
             
            </Col>
        </Row>  */}
    </div>
  )
}

export default Profile