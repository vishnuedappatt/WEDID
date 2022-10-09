import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useContext} from 'react'
import Card from 'react-bootstrap/Card'
import { Link,useNavigate } from 'react-router-dom';
import axios from '../axios';
import AuthContext from '../context/authcontext';
import Modal from 'react-bootstrap/Modal';
import Alert from '@mui/material/Alert';
import ReactLoading from 'react-loading';

function Verify() {
  const  {mobile}= useContext(AuthContext)
  const [code,setCode]=useState('')
  const[error,setError]=useState('')
    const navigate=useNavigate()


    // for modal
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false)};
    const handleShow = () => {setShow(true)};
  

  const [check,setCheck]=useState(false)
    
    const otpcheck=(e)=>{
        console.log(e.target.value)
        setCode(e.target.value)

    }

    const timeCheck=()=>{
      setCheck(true)
      setTimeout(() => {
        setCheck(false)      
           }, 5000);

    }

    const [showz,setShowz]=useState(false)
    
    const otpSubmit=(e)=>{
      setShowz(true)
        e.preventDefault()
        console.log('otp given')
        axios.post('user/verify/',{
            code:code,
            mobile:mobile,
        }).then((res)=>{
            console.log(res.data,'lllll')
            if(res.data.error){
              timeCheck()
              setError(res.data.error)
              console.log(res.data.error)
              handleShow()
              setShowz(false)
            }
            if(res.data.is_active==true){
              setCheck(false)
              console.log('success ittt')
              setShowz(false)
              navigate('/login')
            }
        }).catch((err)=>{
          console.log(err.response)
        })

    }
    // bar loading
const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);

  return (
    <div className='mt-5'>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <Card style={{ backgroundColor:'#339966',borderRadius:'2rem'}}>
      <Card.Img  />
      <Card.Body>
          <Form onSubmit={otpSubmit} className=''>
      <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
        <Form.Label>VERIFY OTP </Form.Label>
        <Form.Control  style={{height:'4rem'}} type="text" value={code} placeholder="Enter the otp" name='code' onChange={otpcheck}  />
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
     {check &&  <Alert variant="filled" auto severity="error">{error}</Alert> }
     <div style={{textAlign:'center'}}>
   {showz ?    <Example  type='bars' color='red'/>  :  <Button variant="dark" type="submit"    style={{textAlign:'center',height:'4rem',width:'15rem',marginTop:'3rem'}}>
        verify  
      </Button> }
    
     </div>    
    </Form>    
      </Card.Body>
    </Card>

    </div>
  )
}

export default Verify