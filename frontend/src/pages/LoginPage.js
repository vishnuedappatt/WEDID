import React from 'react'
import Login from '../components/Login'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function LoginPage() {
  return (
    <div>
          <NavBar />     
       
        <Row className='justify-content-center mt-5 pt-5'>  
            
            <Col  lg={4} >
                <h2 style={{textAlign:'center'}}>LOGIN</h2>
                <Login />
            </Col>            
        </Row>
      
    </div>
  )
}

export default LoginPage