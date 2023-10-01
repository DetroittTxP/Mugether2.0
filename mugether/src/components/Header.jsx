import React, { useState } from 'react'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'
import { Button, Dropdown } from 'antd';
import Logo from '../assets/Pap.jpg'
import { auto } from '@popperjs/core'
import { SlLogin } from 'react-icons/sl'
import { LuListFilter } from 'react-icons/lu'
import axios from 'axios'

export default function Header() {
  const [text, Settext] = useState('')

  const items = [
    {
      key: '1',
      label: (
        <a href='#ken'>
          <h7>LOGIN</h7>
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a href='#beam'>
          <h7>REGISTER</h7>
        </a>
      ),
    },
  ];

  const Apicall= async (value) => {
      await axios.get('http://localhost:5353/muplace/mudata')
      .then(res =>{
          console.log(res.data);
      })
      .catch(err => alert(err))
  }

  const onChange = (e) => {
    Settext(e.target.value)
    Apicall(e.target.value)
  }

  return (
    <div >
      <Navbar style={{ padding: 30 }} bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} height={80} width={100} style={{ borderRadius: 50 }} />
          </Navbar.Brand>

          <Dropdown menu={{ items, }}>
            <Nav style={{ margin: auto }} className="me-auto">
              <Form.Control onChange={onChange} type="text" placeholder="Search here" style={{ width: 600 }} />
            </Nav>

          </Dropdown>

          <Dropdown menu={{ items, }} >
            <Button style={{ width: 95, height: 50, textAlign: 'center', borderRadius: 50 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <LuListFilter style={{ fontSize: 'larger' }} />
                <SlLogin style={{ fontSize: 'larger' }} />
              </div>
            </Button>
          </Dropdown>


        </Container>
      </Navbar>


    </div>
  )
}
