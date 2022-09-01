import React from 'react'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import JobHome from '../components/JobHome'

function JobHomePage() {
  return (
    <div>
         <Row>
            <NavBar />
        </Row>     
        <Row>
            <Col lg={12} sm={12} >
             <JobHome />
            </Col>
        </Row>
    </div>
  )
}

export default JobHomePage