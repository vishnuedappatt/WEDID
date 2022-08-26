import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import axios from '../axios' ;
import Modal from 'react-bootstrap/Modal';

function Forgottpassword() {
  const [email,setEmail]=useState('')
  const [error,setError]=useState(false)
  const [emailerror,setEmailError]=useState(false)
  const[backend,setBackend]=useState('')





  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)};
  const handleShow = () => {setShow(true)};

  const Emailcarrier=(e)=>{

    console.log(e.target.value)
    setEmail(e.target.value)    

  }

  const forgothandler=(e)=>{  
    e.preventDefault()
    // console.log(email)
    if(email.length ==0){
      setError(true)
      console.log('emptyy')
      setError(true)
    }
    else{
      setError(false)
      console.log('noit emptyy')
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ( re.test(email) ) {
          console.log('email field')
          setEmailError(false)

         axios.post('user/forgotpassword/',{email:email}).then((res)=>{
          console.log(res.data)
          if(res.data.success){
            handleShow()
            setBackend(res.data.success+' reset and login again')
          }
          if(res.data.error){
            setBackend(res.data.error)
            handleShow()
          }
        })



      }
      else{
        console.log('no email field')
        setEmailError(true)
      }
   

    }

  }
  return (
    <div>
       
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{backend}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>

    <Card style={{ backgroundColor:'#339966',borderRadius:'2rem'}}>     
      <Card.Body>       
     
    <Form onSubmit={forgothandler} >
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" name='email' value={email}  onChange={Emailcarrier} />
        {error?<span style={{color:'red'}}>* this field is required</span>:''}
        {emailerror?<span style={{color:'red'}}>* enter a valid email field </span>:''}
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
  
      <div style={{textAlign:'center'}}>
      <Button variant="dark" type="submit"  style={{width:'30%',height:'4rem'}} >
        Submit
      </Button><br></br><br></br>
      <Link style={{textDecoration:'None',color:'white',marginTop:'2rem'}} to='/login'>back ?</Link><br></br><br></br>
      

      </div>
   
    
       
    
    </Form>     
     
        {/* <Button variant="primary" style={{marginLeft:'25rem'}}>Forgot password</Button> */}
      
      </Card.Body>
    </Card>
   
        
    </div>
  )
}

export default Forgottpassword