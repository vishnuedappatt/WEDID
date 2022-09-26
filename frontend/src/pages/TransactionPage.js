import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import NavBar from '../components/NavBar'
import Transaction from '../components/Transaction/Transaction'

function TransactionPage() {
  return (
    <div>
           <Row>
            <NavBar/>
        </Row>
        <Row className='justify-content-center mt-1 pt-5'>
        
            <Col lg={8}>
           
                <Transaction/>
                
            </Col>
            
        </Row> 
    </div>
  )
}

export default TransactionPage