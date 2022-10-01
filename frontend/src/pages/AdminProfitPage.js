import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Profit from '../components/Admin/Profit/Profit'
import NavBar from '../components/NavBar'

function AdminProfitPage() {
  return (
    <div>
            <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>

        <Profit />
        
    </Col>
    
</Row>   

    </div>
  )
}

export default AdminProfitPage