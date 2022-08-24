import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../components/NavBar'
import Verify from '../components/Verify'


function VerifyPage() {
  return (
    <div>   
    <Row>
        <NavBar/>
    </Row>
    <Row className='justify-content-center mt-1 pt-5'>
   
    <Col lg={3}>
    <h3 style={{textAlign:'center'}}>VERIFY</h3>
        <Verify />
    </Col>
    </Row>  
</div>
  )
}

export default VerifyPage
