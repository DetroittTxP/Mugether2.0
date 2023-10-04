import React, { useState, useEffect, useContext } from 'react'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'
import { Button, Dropdown, Menu } from 'antd';
import Logo from '../assets/Pap.jpg'
import { SlLogin } from 'react-icons/sl'
import { LuListFilter } from 'react-icons/lu'
import { Muplace_Context } from '../context/MuContext';



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

  const { muplace } = useContext(Muplace_Context)
  const [Muplace, Setmuplace] = useState([])

  useEffect(() => {
    Setmuplace(
      muplace.sort((a, b) => a.name.localeCompare(b.name, 'th'))
        .map(data => ({
          key: data._id.toString(),
          label: (
            <a href='#ken'>
              <h6>{data.name}</h6>
            </a>
          )
        }))
    )
  }, [muplace])
  
  const onChange = (e) => {
    let newdata = muplace.sort((a, b) => a.name.localeCompare(b.name, 'th')).filter(data => data.name.toLowerCase().includes(e.target.value))

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
      <Navbar style={{ borderBottom: '2px solid #ccc',padding: 30, position: 'fixed', width: '100%', top: 0, zIndex: 100 }} bg="light" data-bs-theme="light">
        <Container >
          <Navbar.Brand href="#home">
            <a href='/'>
                <img  src={Logo} height={80} width={100} style={{ borderRadius: 50 }} />
            </a>
           
          </Navbar.Brand>
          <div >
            <Dropdown menu={{ items: Muplace, }}>
              <Nav >
                <Form.Control onChange={onChange} type="text" placeholder="Search here..." style={{ width: 600 }} />
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
