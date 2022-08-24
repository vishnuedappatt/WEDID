import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react'
import Card from 'react-bootstrap/Card'
import { Link,useNavigate } from 'react-router-dom';
import axios from '../axios';
import AuthContext from '../context/authcontext';

function Verify() {
  const  {mobile}= useContext(AuthContext)
    const [code,setCode]=useState('')

    const navigate=useNavigate()
    const otpcheck=(e)=>{
        console.log(e.target.value)
        setCode(e.target.value)

    }
    
    const otpSubmit=(e)=>{
        // console.log(mobile,'mobile get')\\\\
        e.preventDefault()
        console.log('otp given')
        axios.post('user/verify/',{
            code:code,
            mobile:mobile,
        }).then((res)=>{
            console.log(res.data)
            if(res.data.is_active==true){
              console.log('success ittt')
              navigate('/login')

            }
        })

    }
  return (
    <div>
    <Card style={{ width: '32rem',height:'32rem' ,backgroundColor:'#339966',borderRadius:'2rem'}}>
      <Card.Img  />
      <Card.Body>
        {/* <Card.Title>LOGIN</Card.Title> */}
        <Card.Text>
         
          <Form onSubmit={otpSubmit} className=''>
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>VERIFY OTP </Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" value={code} placeholder="Enter email" name='code' onChange={otpcheck}  />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
     
      <Button variant="dark" type="submit"    style={{textAlign:'center',height:'4rem',width:'15rem',marginLeft:'7rem',marginTop:'3rem'}}>
        Submit
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

export default Verify