import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import JobDetails from '../components/Admin/JobDetails/JobDetails'
import NavBar from '../components/NavBar'


function AdminJobPage() {
  return (
    <div>
    <Row>
    <NavBar/>
</Row>
<Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>
    <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
        <JobDetails />
        
    </Col>
    
</Row>   
    </div>
  )
}

export default AdminJobPage