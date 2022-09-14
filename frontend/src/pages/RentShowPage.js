import React from 'react'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import RentShow from '../components/RentShow/RentShow'
function RentShowPage() {
  return (
    <div>
            <Row>
            <NavBar />
        </Row>     
        <Row>
            <Col lg={12} sm={12} >
             <RentShow />
            </Col>
        </Row>
    </div>
  )
}

export default RentShowPage