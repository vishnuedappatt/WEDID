import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import AuthContext from '../context/authcontext';

function Login() {


const [values,setValue]=useState({
    email:'',
    password:''
})

let {email,password}=values
console.log(password,email,'woeoee')
const  {Userlogin,}= useContext(AuthContext)



const loginHandler=(e)=>{
    e.preventDefault()
    Userlogin({...values})
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
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" name='email'  onChange={(e)=>setValue({...values,[e.target.name]:e.target.value})} />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  style={{height:'4rem'}}  type="password" placeholder="Password" name='password'  onChange={(e)=>setValue({...values,[e.target.name]:e.target.value})}/>
      </Form.Group>   
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

