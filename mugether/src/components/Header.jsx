import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'
import { Button, Dropdown, Menu } from 'antd';
import Logo from '../assets/Pap.jpg'
import { SlLogin } from 'react-icons/sl'
import { LuListFilter } from 'react-icons/lu'
import axios from 'axios'

export default function Header() {
  const regis = [
    {
      key: '1',
      label: (
        <a href='/login'>
          <h6>LOGIN</h6>
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a href='/register'>
          <h6>REGISTER</h6>
        </a>
      )
    }
  ]
  const [Muplace, Setmuplace] = useState([])
  const [data, Setdata] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5353/muplace/mudata')
      .then(res => {
        Setdata(res.data)
        Setmuplace(res.data.sort((a, b) => a.name.localeCompare(b.name, 'th'))
        .map(data => ({
          key: data._id.toString(),
          label: (
            <a href='#ken'>
              <h6>{data.name}</h6>
            </a>
          )
        })))

      })
      .catch(err => alert(err))
  }, [])

  const onChange = (e) => {
    let newdata = data.sort((a, b) => a.name.localeCompare(b.name, 'th')).filter(data => data.name.toLowerCase().includes(e.target.value))

    Setmuplace(newdata.map(data => ({
      key: data._id.toString(),
      label: (
        <a href='#ken'>
          <h6>{data.name}</h6>
        </a>
      )
    })))
  }

  return (
    <div >
      <Navbar style={{ padding: 30,  }} bg="light" data-bs-theme="light">
        <Container >
          <Navbar.Brand href="#home">
            <img src={Logo} height={80} width={100} style={{ borderRadius: 50 }} />
          </Navbar.Brand>
          <div >
            <Dropdown menu={{ items: Muplace, }}>
              <Nav >
                <Form.Control onChange={onChange} type="text" placeholder="Search here" style={{ width: 600 }} />
              </Nav>

            </Dropdown>
          </div>


          <Dropdown menu={{ items: regis }} >
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
