import React from 'react'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'
import Logo from '../assets/Pap.jpg'
import {} from 'react-icons'
export default function Header() {
  return (
    <div >
      <Navbar style={{ padding: 30 }} bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} height={80} width={100} />
          </Navbar.Brand>


          <Nav style={{ margin: auto }} className="me-auto">
            <Form.Control type="text" placeholder="Search here" style={{ width: 600 }} />
          </Nav>


          <Nav style={{textAlign:'end'}}>
               
          </Nav>

        </Container>
      </Navbar>
    </div>
  )
}
