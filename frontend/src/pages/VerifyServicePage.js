import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../components/NavBar'
import VerifyService from '../components/VerifyService/VerifyService'

function VerifyServicePage() {
  return (
    <div>
            <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>
    <h3 style={{textAlign:'center',color:'white'}}>Verify</h3>
        < VerifyService />
        
    </Col>
    
</Row>   
    </div>
  )
}

export default VerifyServicePage