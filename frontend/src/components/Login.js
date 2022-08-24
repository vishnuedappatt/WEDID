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

    <div>
         <Card style={{ width: '32rem',height:'35rem' ,backgroundColor:'#339966',borderRadius:'2rem'}}>
      <Card.Img  />
      <Card.Body>
        {/* <Card.Title>LOGIN</Card.Title> */}
        <Card.Text>
         
          <Form onSubmit={loginHandler} className=''>
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" name='email'  onChange={checkEmail} />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  style={{height:'4rem'}}  type="password" placeholder="Password" name='password'  onChange={checkPassword}/>
      </Form.Group>   
      {errors?<span style={{color:'red'}}>{errors}</span>:''}
      {empty?<span style={{color:'red'}}>Fill the blanks to submit</span>:''}
      <Button variant="dark" type="submit"    style={{textAlign:'center',height:'4rem',width:'15rem',marginLeft:'7rem',marginTop:'3rem'}}>
        Submit
      </Button>
      <Button variant="dark" type="submit"    style={{textAlign:'center',height:'4rem',width:'15rem',marginLeft:'7rem',marginTop:'3rem'}}><Link to='/register' style={{textDecoration:'none'}}> Create An Account</Link>
       
      </Button>
    </Form>     
        </Card.Text>
        {/* <Button variant="primary" style={{marginLeft:'25rem'}}>Forgot password</Button> */}
        <Link style={{marginLeft:'20rem',textDecoration:'None',color:'black'}} to='/forgotpassword'>forgotpassword</Link>
      </Card.Body>
    </Card>
   
    </div>
  )
}

export default Login

