import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import List from '../List/List'
import RentSideBar from '../RentSideBar/RentSideBar'
// import './Rentshow.css'
function RentShow() {
  return (
    <div>
        <Row>
            <Col lg={4} >
              <RentSideBar />
               
            </Col>
            <Col lg={8}>
                <List />
            
            </Col>
        </Row>

    </div>
  )
}

export default RentShow