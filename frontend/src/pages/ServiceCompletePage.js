import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ServiceCompletion from '../components/Admin/ServiceCompletion/ServiceComplete'
import NavBar from '../components/NavBar'

function ServiceCompletePage() {
  return (
    <div>
           <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>
    <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
        <ServiceCompletion />
        
    </Col>
    
</Row>   
    </div>
  )
}

export default ServiceCompletePage