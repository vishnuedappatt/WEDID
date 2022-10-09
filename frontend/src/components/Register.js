import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import axios  from '../axios';
import AuthContext from '../context/authcontext';
import Modal from 'react-bootstrap/Modal';

import Spinner from 'react-bootstrap/Spinner';


function Register() {
  const  {mobile,setMobile}= useContext(AuthContext)

    const [fname, setFname] = useState('')
    const [lname,setLname]=useState('')
    const [email,setEmail]=useState('')   
    const [password,setPassword]=useState('')
    const [confpass,setConfpass]=useState('')
   
    const navigate=useNavigate()
   
  // errorCapture
  const [ferror, setFerror] = useState('')
  const [lerror,setLerror]=useState('')
  const [emailerror,setEmailError]=useState('')   
  const[numbererror,setNumberError]=useState(' ')
  // const [size,setSize]=useState(false)
  const [passworderror,setPasswordError]=useState('')
  const[confpaserror,setConfPassword]=useState('')
  const [valid,setValid]=useState(false)


  // backend errors
  const [errors,setErrors]=useState('')

  // for loading spinner
  const [load,setLoad]=useState(false)

      // for modal
      const [show, setShow] = useState(false);
      const handleClose = () => {setShow(false)};
      const handleShow = () => {setShow(true)};
    




    // validation
    const fnamecheck=(e)=>{       
        const value=e.target.value
        if(value.length>2){    
          setFname(value)
          setFerror('')
          setValid(false)
        }
        else{
          setFname(value)
          setFerror('*  name should contain min 3 charector ')
          setValid(true)         
        }        
    }


    

    const lnamecheck=(e)=>{        
        const value=e.target.value
        if(value.length>1){        
          setLname(value)
          setLerror('')
          setValid(false)
        }
        else{
          setLname(value)
          setValid(true)
          setLerror('* last name contains min 2 charecter')                
        }        
        // setLname(value)
    }



    const emailcheck=(e)=>{
        console.log(e.target.value)
        const value=e.target.value
        
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( re.test(value) ) {
                console.log('email field')
                setEmailError('')
                setEmail(value)
                setValid(false)
            }
            else{
              setEmailError('* this field should be a valid email address ')
              setEmail(value)  
              setValid(true)
            }
           
    }




     const mobilecheck=(e)=>{
      const value=e.target.value
      const re = /^[0-9\b]+$/;
       
      console.log('its number')
        if (re.test(value))
          {
          console.log('its number')
          // setNumberError('it should dfdffffdffdfdff only number')
          setMobile(value)
          setNumberError(' ')
          setValid(false)
          
          if(value.length>10){
            console.log('its value')
            // setSize('')
            setNumberError('this field contain max 10 digit only')
            setValid(true)
          }
          else{   
            setNumberError('')
            setValid(false)
          }
         }    
          else{
          console.log('stringss')
          setNumberError('it should contain only number')
          setMobile('')
          setValid(true)
        }        
    };




    const passwordcheck=(e)=>{
      const value=e.target.value    
      if(value.length !==0){  
          if (value.length>5){
            setPassword(value)
            setPasswordError('')
            setValid(false)
          }
          else{
            setPassword(value)
            setPasswordError('it should contain min 6 charecter')
            setValid(true)
          }
        }
        else{
          setPassword(value)
          setPasswordError('* password field is required')
          setValid(true)
        }
      
    }

    const confirmcheck=(e)=>{
      const value=e.target.value    
      if(value.length !==0){  
          if (value.length>5){
            setConfpass(value)
            setConfPassword('')
            setValid(false)
          }
          else{
            setConfpass(value)
            setConfPassword('it should contain min 6 charecter')
            setValid(true)
          }
        }
        else{
          setConfpass(value)
          setConfPassword('* password field is required')
          setValid(true)
        }
    }

  


    const registerHandler=(e)=>{
        e.preventDefault()


           // empty checking 
        if(fname.length===0){
          setFerror('* this name field is required')
          setValid(true)
        }else{
          setFerror('')
          setValid(false)
        }


        if(lname.length===0){
          setLerror('* this last name field is required')
          setValid(true)
        }else{
          setLerror('')
          setValid(false)
        }


        if(email.length===0){
          setEmailError('* this email field is required')
          setValid(true)
        } else{
          setEmailError('')
          setValid(false)
        }
        if(password.length===0){
          setPasswordError('* this password field is required')
          setValid(true)
        }else{
          setPasswordError('')
          setValid(false)
        }
        if(mobile.length===0){
          setNumberError('* this mobile field is required')
          // setMobile()
          setValid(true)
        }
        else{
          setNumberError('')
          setValid(false)
        }
        if (confpass.length===0){
          setConfPassword('* this password field is required')
          setValid(true)
        }else{
          setConfPassword('')
          setValid(false)
          setValid(false)
           // password matching
          if(confpass === password){
            console.log('currect')
            setPasswordError(' ')
            setConfPassword('')
            setValid(false)

        if(!valid){

          setLoad(true)
            axios.post('user/register/',{
            first_name:fname,
            last_name:lname,
            email:email,
            mobile:mobile,
            password:password,
            confirm_password:confpass,
        }).then((res)=>{
            console.log(res.data,'data ann')
            setLoad(false)
            if (res.data.error){
              console.log(res.data.error)
              setErrors(res.data.error)
              handleShow()
            
         }      
            if(res.data.mobile){
              
                console.log('get the mobile')
                navigate('/verify',)
            }
           
        })



          console.log('successss')
        }
     

          }
          else{
            setPasswordError('password missmatch !!')
            setConfPassword('password missmatch !!')
            console.log('mismatch')
            setValid(true)
          }
        }
        
       
     
        
        // if (email.length !==0 || fname.length !==0 || lname.length !==0 || mobile.length !==0 || password.length !==0 || confpass.length !==0){
        //   if(!ferror && !lerror && !emailerror && !numbererror && !passworderror && !size){
        //     console.log('okk')
        //     axios.post('user/register/',{
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


        //   }

        //   else{
        //     console.log('not oke')
        //   }
        // }
        // else{
        //   console.log('not okeyy')
        //   setEmpty(true)
          

        // }
     
        
        console.log('submitted')
    }
   

  return (
    <div>

      {/* for getting alert modal */}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{errors}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>        
        </Modal.Footer>
      </Modal>

    {/* spinner */}
        





     <Card style={{ backgroundColor:'black',borderRadius:'2rem'}}>
      <Card.Img  />
      <Card.Body>  
    <Form onSubmit={registerHandler} className='mb-3'>
    <Form.Group className="mb-3 " controlId="formFirstName">
        <Form.Label style={{color:'white'}}>First Name</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter firstname" name='fname' value={fname} onChange={fnamecheck}  />
        {ferror?<span style={{color:'red'}}>{ferror}</span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formLastName">
        <Form.Label style={{color:'white'}}>Last Name</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter Lastname" name='lname' value={lname} onChange={lnamecheck}  />
        {lerror?<span style={{color:'red'}}>{lerror}</span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicEmail">
        <Form.Label style={{color:'white'}}>Email address</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" name='email' value={email} onChange={emailcheck} />
          {emailerror?<span style={{color:'red'}}>{emailerror}</span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formMobile">
        <Form.Label style={{color:'white'}}>Mobile</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter Mobile no"  name='mobile' value={mobile} onChange={mobilecheck} />
          {numbererror?<span style={{color:'red'}}>{numbererror}</span>:''}
         
        <Form.Text className="text-muted">        
        </Form.Text>
          
    {/* {load? <h1><Spinner animation="grow"  /></h1> :''} */}
    <div style={{textAlign:'center'}}>
    {load?<Spinner animation="border" role="status"  style={{ width: "10rem", height: "37rem" ,color:'blue'}}>
   <span className="visually-hidden">Loading...</span>
</Spinner>:''}
    </div>
 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{color:'white'}}>Password</Form.Label>
        <Form.Control  style={{height:'4rem'}}  autoComplete="true" type="password" placeholder="Password" name='password' value={password} onChange={passwordcheck}  />
         {passworderror?<span style={{color:'red'}}>{passworderror}</span>:''}
      </Form.Group>   
      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label style={{color:'white'}}>Confirm Password</Form.Label>
        <Form.Control  style={{height:'4rem'}} autoComplete="true"  type="password" placeholder="Confirm Password" name='confirm_password' value={confpass}  onChange={confirmcheck} />
   
        {confpaserror?<span style={{color:'red'}}>{confpaserror}</span>:''}
        {/* {valid?<span style={{color:'red'}}>fill the blanks</span>:''} */}
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
