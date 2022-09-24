import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../components/NavBar'
import RentTakenHistory from '../components/RentTakenHistory/RentTakenHistory'

function RentTakenHistoryPage() {
  return (
    <div>
          <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>
    <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
        < RentTakenHistory />
        
    </Col>
    
</Row>   
    </div>
  )
}

export default RentTakenHistoryPage