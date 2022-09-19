import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import JobGivingHistory from '../components/JobGivingHistory/JobGivingHistory'
import NavBar from '../components/NavBar'
import RentGivingHistory from '../components/RentGivingHistory/RentGivingHistory'

function RentGivingHistoryPage() {
  return (
    <div>
          <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={8}>
    <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
        < RentGivingHistory  />
        
    </Col>
    
</Row>   
    </div>
  )
}

export default RentGivingHistoryPage