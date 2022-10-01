import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import RentDetails from '../components/Admin/RentDetails/RentDetails'
import NavBar from '../components/NavBar'

function AdminRentPage() {
  return (
    <div>
           <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>
   
        <RentDetails />
        
    </Col>
    
</Row>   
    </div>
  )
}

export default AdminRentPage