import React from 'react'
import Home from '../components/Home'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function HomePage() {
  return (
    <div>
        <Row>
            <NavBar />
        </Row>
        <Row>
            <Col lg={12} sm={12} >
              <Home />
            </Col>
        </Row>
      
       
    </div>
  )
}

export default HomePage