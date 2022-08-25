import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import AuthContext from '../context/authcontext';

function Login() {

const  {Userlogin,errors}= useContext(AuthContext)

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

const [empty,setEmpty]=useState(false)

const checkEmail=(e)=>{
    console.log(e.target.value)
    let emails=e.target.value
    setEmail(emails)    
    
}

const checkPassword=(e)=>{
    console.log(e.target.value)
    let pass=e.target.value
    setPassword(pass)

}


 const loginHandler=(e)=>{
     e.preventDefault() 
     if (email.trim().length !==0 &&  password.trim().length !==0){
      console.log('values')
      setEmpty(false)
     Userlogin(email,password)   
   
     }
     else{
      setEmpty(true)
      console.log('noooooo')
     }    
    
 }

  return (
  
      <>

   
    <Card style={{ backgroundColor:'#339966',borderRadius:'2rem'}}>     
      <Card.Body>       
     
    <Form onSubmit={loginHandler} >
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" name='email'  onChange={checkEmail} />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  style={{height:'4rem'}} autoComplete="true" type="password" placeholder="Password" name='password'  onChange={checkPassword}/>
      </Form.Group>   
      {errors?<span style={{color:'red'}}>{errors}</span>:''}
      {empty?<span style={{color:'red'}}>Fill the blanks to submit</span>:''}
      <div style={{textAlign:'center'}}>
      <Button variant="dark" type="submit"  style={{width:'30%',height:'4rem'}} >
        Submit
      </Button><br></br><br></br>
      <Link style={{textDecoration:'None',color:'black',marginTop:'2rem'}} to='/forgot_password'>forgotpassword ?</Link><br></br><br></br>
      <Button variant="dark" type="submit"    style={{textAlign:'center',height:'4rem',width:'15rem',}}><Link to='/register' style={{textDecoration:'none'}}> Create An Account</Link>  </Button>

      </div>
   
    
       
    
    </Form>     
     
        {/* <Button variant="primary" style={{marginLeft:'25rem'}}>Forgot password</Button> */}
      
      </Card.Body>
    </Card>
   
  
       </>


   
  )
}

export default Login

