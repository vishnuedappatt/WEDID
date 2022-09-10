import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import AuthContext from '../context/authcontext';
import Modal from 'react-bootstrap/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './materalui.css'



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function Login() {

const  {Userlogin,errors,show,handleClose,handleCloses,opens}= useContext(AuthContext)

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [mcheck,EmailChecker]=useState(false)
const [pcheck,PasswordChecker]=useState(false)

const [forgot,setForgot]=useState(1)
const [fshow,setForShow]=useState(false)


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

const count=0
 const loginHandler=(e)=>{
     e.preventDefault() 
     console.log(forgot,'forgott')
     if (forgot>2){
      setForShow(true)
     }
     
     if (email.trim().length ===0 ){
      console.log('empty')
      EmailChecker(true)
     }
     else{
      EmailChecker(false)
      if ( password.trim().length !==0){
        console.log('finallll')
        Userlogin(email,password)  
        setForgot(forgot+1)
       
    

      }
     }
    if ( password.trim().length ===0){
      console.log('values')
      PasswordChecker(true)
    }else{
      PasswordChecker(false)
    }
     }
  return (
  
      <>   
     
      <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
        <div className='box' >
        <Alert onClose={handleCloses} severity="error" sx={{ width: '100%' }} >
          {errors}
        </Alert>
        </div>               
      </Snackbar>

   
    <Card style={{ backgroundColor:'#339966',borderRadius:'2rem'}}>     
      <Card.Body>       
     
    <Form onSubmit={loginHandler} >
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" name='email'  onChange={checkEmail} />
     
        {mcheck?<span style={{color:'red'}}>* email field is required</span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  style={{height:'4rem'}} autoComplete="true" type="password" placeholder="Password" name='password'  onChange={checkPassword}/>
      </Form.Group>   
      {pcheck?<span style={{color:'red'}}>* password field is required</span>:''}
     
    
      <div style={{textAlign:'center'}}>
      <Button variant="dark" type="submit"  style={{width:'30%',height:'4rem'}} >
        Submit
      </Button><br></br><br></br>
   {fshow?   <Link style={{textDecoration:'None',color:'black',marginTop:'2rem'}} to='/forgot_password'>forgotpassword ?</Link>:''}<br></br><br></br>
      <Link to='/register' style={{textDecoration:'None',color:'black',marginTop:'2rem'}}> Create An Account</Link> 
   </div>
    </Form>      
      </Card.Body>
    </Card>
   
  
       </>


   
  )
}

export default Login

