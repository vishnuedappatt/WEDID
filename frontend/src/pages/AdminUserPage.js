import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import UserView from '../components/Admin/UserView/UserView'
import NavBar from '../components/NavBar'

function AdminUserPage() {
  return (
    <div>
    <Row>
        <NavBar/>
    </Row>
    <Row className='justify-content-center mt-1 pt-5'>

    <Col lg={11}>
    
        <UserView />
    </Col>    
    </Row>   
    </div>
  )
}

export default AdminUserPage