import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../components/NavBar'
import Register from '../components/Register'

function RegisterPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
           
            <Col lg={3}>
            <h3 style={{textAlign:'center'}}>REGISTER</h3>
                <Register />
            </Col>
        </Row>  


    </div>
  )
}

export default RegisterPage