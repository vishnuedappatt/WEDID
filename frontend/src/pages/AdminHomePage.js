import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Home from '../components/Admin/Home/Home'
import NavBar from '../components/NavBar'

function AdminHomePage() {
  return (
    <div>
    <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>
    <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
        <Home />
        
    </Col>
    
</Row>   

    </div>
  )
}

export default AdminHomePage