import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';

function Forgottpassword() {
  const [email,setEmail]=useState('')


  const forgothandler=(e)=>{
  
    e.preventDefault()
      
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(email) ) {
        console.log('email field')
      
      
    }
    else{
      console.log('no email field')
    }
    

  }
  return (
    <div>
       
    <Card style={{ backgroundColor:'#339966',borderRadius:'2rem'}}>     
      <Card.Body>       
     
    <Form onSubmit={forgothandler} >
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" placeholder="Enter email" name='email' value={email}  onChange={(e)=>setEmail(e.target.value)} />
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