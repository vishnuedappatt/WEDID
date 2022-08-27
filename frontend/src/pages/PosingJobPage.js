import React from 'react'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import GivingService from '../components/GivingService'



function PosingJobPage() {
  return (
    <div>
        <Row>
            <NavBar />
        </Row>
        <Row>
            <Col lg={12} >
                <GivingService />
            </Col>
        </Row>
    </div>
  )
}

export default PosingJobPage