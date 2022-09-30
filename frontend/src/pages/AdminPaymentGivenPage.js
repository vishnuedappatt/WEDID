import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Complaint from '../components/Admin/Complaint/Complaint'
import Home from '../components/Admin/Home/Home'
import PaymentGiven from '../components/Admin/PaymentGiven/PaymentGiven'
import NavBar from '../components/NavBar'

function AdminPaymentGivenPage() {
  return (
    <div>
              <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>
    <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
        <PaymentGiven />
        
    </Col>
    
</Row>  
    </div>
  )
}

export default AdminPaymentGivenPage