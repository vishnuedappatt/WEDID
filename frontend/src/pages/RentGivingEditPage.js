import React from 'react'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import EditRentHistory from '../components/EditRentHistory/EditRentHistory'


function RentGivingEditPage() {
  return (
    <div>

        <Row>
            <NavBar />
        </Row>
        <Row>
            <Col lg={12} >
                <EditRentHistory  />
            </Col>
        </Row>
    </div>
  )
}

export default RentGivingEditPage