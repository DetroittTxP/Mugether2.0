import React from 'react'
import { Container, Nav, Navbar, Form} from 'react-bootstrap'
import { Button, Dropdown } from 'antd';
import Logo from '../assets/Pap.jpg'
import { auto } from '@popperjs/core'
import {SlLogin} from 'react-icons/sl'

export default function Header() {

  const items = [
    {
      key: '1',
      label: (
        <h5>test</h5>
      ),
    },
   
  ];


  return (
    <div >
      <Navbar style={{ padding: 30 }} bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} height={80} width={100} style={{borderRadius:50}} />
          </Navbar.Brand>


          <Nav style={{ margin: auto }} className="me-auto">
            <Form.Control type="text" placeholder="Search here" style={{ width: 600 }} />
          </Nav>

      
                 <Dropdown menu={{items,}} >
                      <Button style={{width:100,height:50,textAlign:'center',borderRadius:50}}>
                        
                             <SlLogin style={{marginLeft:50,fontSize:'larger'}}/>

                      </Button>
                 </Dropdown>
      
           

        </Container>
      </Navbar>

  
    </div>
  )
}
