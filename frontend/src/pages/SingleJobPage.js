import React from 'react'
import SingleJob from '../components/singlejob/SingleJob'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../components/NavBar'

function SingleJobPage() {
  return (
    <div>
       <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
           
            <Col lg={7}>
            <h3 style={{textAlign:'center'}}>REGISTER</h3>
              <SingleJob />
            </Col>
        </Row>  

      
    </div>
  )
}

export default SingleJobPage