import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './GivingService.css'

function GivingService() {
  return (
    <div >

        <div className='form'>
            <Form>
                <Form.Group className="field1 " controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className='input1' type="email" placeholder="Enter email" />
                  
                </Form.Group>

                <Form.Group className="field1" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                    <Form.Control className='input1' type="password" placeholder="Password" />
                </Form.Group>
{/*                 
                <Button variant="primary" className='btn1' type="submit">
                    Submit
                </Button> */}
            </Form>

        </div>
  
    </div>
  )
}

export default GivingService