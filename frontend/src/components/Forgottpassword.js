import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import axios from '../axios' ;
import Alert from '@mui/material/Alert';
import ClearIcon from '@mui/icons-material/Clear';
import ReactLoading from 'react-loading';



function Forgottpassword() {
  const [email,setEmail]=useState('')
  const [error,setError]=useState(false)
  const [emailerror,setEmailError]=useState(false)
  const[backend,setBackend]=useState('')

  const [loading,setLoading]=useState(false)

const [view,setView]=useState(false)
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)};
  const handleShow = () => {setShow(true)};
  const handleClosez = () => {setView(false)};
  const handleShowz = () => {setView(true)};

  const Emailcarrier=(e)=>{

    console.log(e.target.value)
    setEmail(e.target.value)    

  }

  const forgothandler=(e)=>{  
    e.preventDefault()
    setLoading(true)
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
            setLoading(false)
            handleShowz()
            setBackend(res.data.success+' reset and login again')
      
          }
          if(res.data.error){
            setLoading(false)
            setBackend(res.data.error)
            handleShow()
            // handleClick() snack         
          }
        })
      }
      else{
        console.log('no email field')
        setEmailError(true)
      }
   

    }
    
  }
  const Example = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);
  return (
    <div>
       
     

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
          {loading ?  <Example  type='bars' color='red'/> :
        <Button variant="dark" type="submit"  style={{width:'30%',height:'4rem'}} > 
          Submit
        </Button> }<br></br><br></br> 
       
      {show &&    <Alert variant="filled" auto severity="error">{backend}  <ClearIcon onClick={handleClose}/></Alert> }
      {view &&  <Alert variant="filled" auto severity="success">{backend}  <ClearIcon onClick={handleClosez}/></Alert>      }
      
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