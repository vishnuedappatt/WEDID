import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useContext} from 'react'
import AuthContext from '../context/authcontext';
import axios  from '../axios'
import { Link } from 'react-router-dom';

function NavBar() {
  const {logOut,user}=useContext(AuthContext)
  const val= localStorage.getItem('token')
  const Alldata=(e)=>{
    e.preventDefault()
     axios.get('user/use/',{
      headers: {
        Authorization:'Bearer '+ user //the token is a variable which holds the token
      }
     }).then((res)=>{
            console.log(res.data)
            if (res.data){
                console.log('valuess are herer')            

            }
            // setUser(res.data)
        }
        ).catch((err)=>{
          console.log('error ann moneeeee moonjii')
          console.log(err.data)
        } ) 
    }

  return (
    
<div>
<Navbar style={{height:'100px',backgroundColor:'white'}}  expand="lg">
      <Container fluid>
        <Navbar.Brand style={{fontWeight:800}} href="#">WEDID</Navbar.Brand>
       
        <Link to='/'><Button className='ms-1' variant="outline-dark" >HOME</Button></Link>
            {val? '':<Link to='/login'><Button className='ms-1' variant="outline-dark" >LOGIN</Button></Link>}
            {val? '':<Link to='/register'><Button className='ms-1' variant="outline-dark" >REGISTER</Button></Link>}
       
            {val? <Link to='/profile'><Button className='ms-1' variant="outline-dark" >PROFILE</Button></Link>:''}
            {val? <Button variant="outline-dark" onClick={logOut}>Logout</Button>:''}
       
      </Container>
    </Navbar>
</div>
  )
}

export default NavBar