import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from 'react'

function Login() {

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [emailerror,SetErrorEmail]=useState(false)
const [passworderror,setError]=useState(false)

const checkEmail=(e)=>{
    console.log(e.target.value)
    let emails=e.target.value
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(emails) ) {
        console.log('email field')
        SetErrorEmail(false)
    }
    else{
        SetErrorEmail(true)
    }
    setEmail(emails)
    
    
}
const checkPassword=(e)=>{
    console.log(e.target.value)
    let pass=e.target.value

    if (pass.length>6){
        console.log('value')
        setError(false)
    }
    else{
    console.log('error')
    setError(true)
    }
    setPassword(pass)

}


 const loginHandler=(e)=>{
    e.preventDefault() 
    if (password.length<6 || email ===''){
        console.log('hello')
        SetErrorEmail(true)
        alert('error')
        setError(true)
        
    }
    else{
        console.log('welcome')

    }
    
 }
  return (
    <div>
    <Form onSubmit={loginHandler} bg='dark'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Enter email" value={email}  onChange={checkEmail} />{emailerror?<span style={{color:'red'}}>type a valid email address</span>:' '}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value={password} onChange={checkPassword}/> { passworderror?<span style={{color:'red'}}>minimum 6 charector</span>:''}
      </Form.Group>   
      <Button variant="primary" type="submit"  style={{textAlign:'center',height:'50px',width:'100px',}}>
        Submit
      </Button>
    </Form>     
    </div>
  )
}

export default Login