import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import axios  from '../axios';
import AuthContext from '../context/authcontext';

function Register() {
  const  {mobile,setMobile}= useContext(AuthContext)
    const [fname, setFname] = useState('')
    const [lname,setLname]=useState('')
    const [email,setEmail]=useState('')
    // const [mobile,setMobile]=useState('')
    const [password,setPassword]=useState('')
    const [confpass,setConfpass]=useState('')
   
    const navigate=useNavigate()
   
  
    // validation
    const fnamecheck=(e)=>{
        console.log(e.target.value)
        setFname(e.target.value)
    }

    const lnamecheck=(e)=>{
        console.log(e.target.value)
        setLname(e.target.value)
    }
    const emailcheck=(e)=>{
        console.log(e.target.value)
        setEmail(e.target.value)
    }

     const mobilecheck=(e)=>{
        console.log(e.target.value)
        setMobile(e.target.value)        
        
    };

    const passwordcheck=(e)=>{
        console.log(e.target.value)
        setPassword(e.target.value)
    }

    const confirmcheck=(e)=>{
        console.log(e.target.value)
        setConfpass(e.target.value)
    }

  


    const registerHandler=(e)=>{
        e.preventDefault()
        axios.post('user/register/',{
            first_name:fname,
            last_name:lname,
            email:email,
            mobile:mobile,
            password:password,
            confirm_password:confpass,
        }).then((res)=>{
            console.log(res.data)
            if(res.data.mobile){
                console.log('get the mobile')
                navigate('/verify',{phone:{numb:mobile,id:1}})
            }
            if (res.data.emailerr){
                console.log('success')
            }
          if(res.data.passworderr){
            console.log('password error')
          }
        })
        console.log('submitted')
        

    }

  return (
    <div>
     <Card style={{ width: '32rem',height:'52rem' ,backgroundColor:'#335808',borderRadius:'2rem'}}>
      <Card.Img  />
      <Card.Body>
    
        <Card.Text>
         
    <Form onSubmit={registerHandler} className='mb-3'>
    <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label style={{color:'white'}}>First Name</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter firstname" value={fname} onChange={fnamecheck}  />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter Lastname" value={lname} onChange={lnamecheck}  />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" value={email} onChange={emailcheck} />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter Mobile no" value={mobile} onChange={mobilecheck} />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  style={{height:'4rem'}}  type="password" placeholder="Password" value={password} onChange={passwordcheck}  />
      </Form.Group>   
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control  style={{height:'4rem'}}  type="password" placeholder="Confirm Password" value={confpass}  onChange={confirmcheck} />
      </Form.Group>   
      <Button variant="dark" type="submit"    style={{textAlign:'center',height:'4rem',width:'15rem',marginLeft:'7rem',marginTop:'1rem'}}>
        Register
      </Button>
    </Form>     
        </Card.Text>
        {/* <Button variant="primary" style={{marginLeft:'25rem'}}>Forgot password</Button> */}
        <Link style={{marginLeft:'20rem',textDecoration:'None',color:'black'}} to='/login'>Back</Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Register
