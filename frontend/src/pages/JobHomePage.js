import React from 'react'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Jobshow from '../components/jobshowing/Jobshow'

function JobHomePage() {
  return (
    <div>
         <Row>
            <NavBar />
        </Row>     
        <Row>
            <Col lg={12} sm={12} >
             <Jobshow />
            </Col>
        </Row>
    </div>
  )
}

export default JobHomePage