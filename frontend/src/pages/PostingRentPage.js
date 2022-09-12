import React from 'react'
import NavBar from '../components/NavBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import GivingRent from '../components/GivingRent/GivingRent'

function PostingRentPage() {
  return (
    <div>
           <Row>
            <NavBar />
        </Row>
        <Row>
            <Col lg={12} >
                <GivingRent />
            </Col>
        </Row>
    </div>
  )
}

export default PostingRentPage