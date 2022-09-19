import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import JobTakenHistory from '../components/JobTakenHistory/JobTakenHistory'
import NavBar from '../components/NavBar'

function JobTakenHistoryPage() {
  return (
    <div>
    <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={8}>
    <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
        < JobTakenHistory />
        
    </Col>
    
</Row>   
    </div>
  )
}

export default JobTakenHistoryPage