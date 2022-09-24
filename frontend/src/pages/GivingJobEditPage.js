import React from 'react'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import GivingJobEdit from '../components/GivingJobEdit/GivingJobEdit'

function GivingJobEditPage() {
  return (
    <div>
          <Row>
            <NavBar />
        </Row>
        <Row>
            <Col lg={12} >
                <GivingJobEdit />
            </Col>
        </Row>
    </div>
  )
}

export default GivingJobEditPage