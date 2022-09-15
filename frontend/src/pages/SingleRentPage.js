import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../components/NavBar'
import SingleRent from '../components/singleRent/SingleRent'

function SingleRentPage() {
  return (
    <div>
        <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
           
            <Col lg={7}>
            <h3 style={{textAlign:'center'}}>REGISTER</h3>
              <SingleRent />
            </Col>
        </Row>  
    </div>
  )
}

export default SingleRentPage