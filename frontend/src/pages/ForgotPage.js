import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Forgottpassword from '../components/Forgottpassword'
import NavBar from '../components/NavBar'

function ForgotPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
           
            <Col lg={5}>
            <h3 style={{textAlign:'center'}}>FORGOT PASSWORD </h3>
                <Forgottpassword />
            </Col>
        </Row>  

    </div>
  )
}

export default ForgotPage