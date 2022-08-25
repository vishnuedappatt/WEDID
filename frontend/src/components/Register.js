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
    const [password,setPassword]=useState('')
    const [confpass,setConfpass]=useState('')
   
    const navigate=useNavigate()
   
  // errorCapture
  const [ferror, setFerror] = useState(false)
  const [lerror,setLerror]=useState(false)
  const [emailerror,setEmailError]=useState(false)   
  const[numbererror,setNumberError]=useState(false)
  const [size,setSize]=useState(false)
  const [passworderror,setPasswordError]=useState(false)
  const [empty,setEmpty]=useState(false)


    // validation
    const fnamecheck=(e)=>{       
        const value=e.target.value
        if(value.length>3){    
          setFname(value)
          setFerror(false)
        }
        else{
          setFname(value)
          setFerror(true)
          // setTimeout(() => {
          //  setFerror(false);
          //     }, 5000);            
        }        
    }


    const lnamecheck=(e)=>{        
        const value=e.target.value
        if(value.length>1){        
          setLname(value)
          setLerror(false)
        }
        else{
          setLname(value)
          setLerror(true)                
        }        
        setLname(value)
    }



    const emailcheck=(e)=>{
        console.log(e.target.value)
        const value=e.target.value
        
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( re.test(value) ) {
                console.log('email field')
                setEmailError(false)
                setEmail(value)
            }
            else{
              setEmailError(true)
              setEmail(value)  
            }
           
    }




     const mobilecheck=(e)=>{
      const value=e.target.value
      const re = /^[0-9\b]+$/;
       
      console.log('its number')
        if (re.test(value))
      {
          console.log('its number')
          setSize(false)
          setMobile(value)
          setNumberError(false)
          if(value.length<11){
            console.log('its value')
            setSize(false)
          }
          else{
            console.log('10')
            setSize(true)
          }
        }    
        else{
          console.log('stringss')
          setNumberError(true)
          // setMobile(value)
        }        
    };




    const passwordcheck=(e)=>{
      const value=e.target.value      
          if (value.length>5){
            setPassword(value)
            setPasswordError(false)
          }
          else{
            setPassword(value)
            setPasswordError(true)
          }
      
    }

    const confirmcheck=(e)=>{
      const value=e.target.value  
      console.log(value)    
      setConfpass(value)
      if (value.length>5){
        setConfpass(value)
        setPasswordError(false)
      }
      else{
        setConfpass(value)
        console.log(value)    
        setPasswordError(true)
      }
  
        
    }

  


    const registerHandler=(e)=>{
        e.preventDefault()
        if (email.length !==0 || fname.length !==0 || lname.length !==0 || mobile.length !==0 || password.length !==0 || confpass.length !==0){
          if(!ferror && !lerror && !emailerror && !numbererror && !passworderror && !size){
            console.log('okk')
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
                navigate('/verify',)
            }
            if (res.data.emailerr){
                console.log('success')
            }
          if(res.data.passworderr){
            console.log('password error')
          }
        })


          }

          else{
            console.log('not oke')
          }
        }
        else{
          console.log('not okeyy')
          setEmpty(true)
          

        }
     
        // axios.post('user/register/',{
        //     first_name:fname,
        //     last_name:lname,
        //     email:email,
        //     mobile:mobile,
        //     password:password,
        //     confirm_password:confpass,
        // }).then((res)=>{
        //     console.log(res.data)
        //     if(res.data.mobile){
        //         console.log('get the mobile')
        //         navigate('/verify',)
        //     }
        //     if (res.data.emailerr){
        //         console.log('success')
        //     }
        //   if(res.data.passworderr){
        //     console.log('password error')
        //   }
        // })
        console.log('submitted')
        

    }

  return (
    <div>
     <Card style={{ backgroundColor:'black',borderRadius:'2rem'}}>
      <Card.Img  />
      <Card.Body>
    
     
         
    <Form onSubmit={registerHandler} className='mb-3'>
    <Form.Group className="mb-3 " controlId="formFirstName">
        <Form.Label style={{color:'white'}}>First Name</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter firstname" value={fname} onChange={fnamecheck}  />
        {ferror?<span style={{color:'red'}}>it must be min 4 charector</span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formLastName">
        <Form.Label style={{color:'white'}}>Last Name</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter Lastname" value={lname} onChange={lnamecheck}  />
        {lerror?<span style={{color:'red'}}>it must be min 2 charecter</span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label style={{color:'white'}}>Email address</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" value={email} onChange={emailcheck} />
          {emailerror?<span style={{color:'red'}}>it should be a valid email address</span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formMobile">
        <Form.Label style={{color:'white'}}>Mobile</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter Mobile no" value={mobile} onChange={mobilecheck} />
          {numbererror?<span style={{color:'red'}}>it should be contain only numbers</span>:''}
             {size?<span style={{color:'red'}}>it should  only 10 digit </span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{color:'white'}}>Password</Form.Label>
        <Form.Control  style={{height:'4rem'}}  autoComplete="true" type="password" placeholder="Password" value={password} onChange={passwordcheck}  />
         {passworderror?<span style={{color:'red'}}>it should be contain min 6 charecter</span>:''}
      </Form.Group>   
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label style={{color:'white'}}>Confirm Password</Form.Label>
        <Form.Control  style={{height:'4rem'}} autoComplete="true"  type="password" placeholder="Confirm Password" value={confpass}  onChange={confirmcheck} />
        {passworderror?<span style={{color:'red'}}>it should be contain min 6 charecter</span>:''}
        {empty?<span style={{color:'red'}}>fill the blanks</span>:''}
      </Form.Group>   
      <div style={{textAlign:'center'}}>
      <Button variant="dark" type="submit"  style={{width:'30%',height:'4rem'}} >
        Submit
      </Button><br></br><br></br>
      <Link style={{textDecoration:'None',color:'white',marginTop:'2rem'}} to='/login'>Back ?</Link><br></br><br></br>
     

      </div>
    
    </Form>     
      
        {/* <Button variant="primary" style={{marginLeft:'25rem'}}>Forgot password</Button> */}
        <Link style={{marginLeft:'20rem',textDecoration:'None',color:'black'}} to='/login'>Back</Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Register
