import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListSideBar from '../ListSideBar/ListSideBar'

function RentHistory() {
  return (
    <div> <Row>
    <Col lg={4}>
      <ListSideBar val={3}/>
    </Col>
    <Col lg={8}>
      <div style={{'height':'60vh','backgroundColor':'black'}}>
        fd
      </div>
    </Col>

    </Row>
    {/* <Row className='justify-content-center mt-1 pt-5'>
    
        <Col lg={5}>
        <h3 style={{textAlign:'center',color:'white'}}>PROFILE</h3>
         
        </Col>
    </Row>  */}
</div>
  )
}

export default RentHistory