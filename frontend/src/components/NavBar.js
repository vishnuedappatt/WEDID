import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useContext} from 'react'
import AuthContext from '../context/authcontext';
import axios  from '../axios'

function NavBar() {
  const {logOut,user}=useContext(AuthContext)
  // const Alldata=(e)=>{
  //   e.preventDefault()
  //    axios.get('user/use/',{
  //     headers: {
  //       Authorization:'Bearer '+ user //the token is a variable which holds the token
  //     }
  //    }).then((res)=>{
  //           console.log(res.data)
  //           if (res.data){
  //               console.log('valuess are herer')
             

  //           }
  //           // setUser(res.data)

  //       }
  //       ).catch((err)=>{
  //         console.log('error ann moneeeee moonjii')
  //         console.log(err.data)
  //       } ) 
  //   }

  return (
    
<div>
<Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
           
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" onClick={Alldata}>Search</Button>
            <Button variant="outline-success" onClick={logOut}>Logout</Button>
          </Form> */}
          <Button variant="outline-success" onClick={logOut}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
  )
}

export default NavBar