import React, { useState, useEffect, useContext } from 'react'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'
import { Button, Dropdown, Menu } from 'antd';
import Logo from '../assets/MuLOGO.png'
import { SlLogin } from 'react-icons/sl'
import { LuListFilter } from 'react-icons/lu'
import { Muplace_Context } from '../context/MuContext';
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'


export default function Header() {
  const usr_data = localStorage.getItem('usr');
  const navigate = useNavigate();
  
  const handleLogout= async () => {
     localStorage.removeItem('usr');
     localStorage.removeItem('token')
     await Swal.fire('logout ok')
     navigate('/')
}

  const loged_in = [
     {
      key: '1',
      label: (
        <a onClick={handleLogout} style={{textDecoration:'none'}}>
          <h6>LOG OUT</h6>
        </a>
      )
    }
  ]

  const non_login = [
    {
      key: '1',
      label: (
        <a href='/login' style={{textDecoration:'none'}}>
          <h6>LOGIN</h6>
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a href='/register' style={{textDecoration:'none'}}>
          <h6>REGISTER</h6>
        </a>
      )
    },
    // {
    //   key: '3',
    //   label: (
    //     <a href='/logout' style={{textDecoration:'none'}}>
    //       <h6>LOG OUT</h6>
    //     </a>
    //   )
    // }
  ]

  const { muplace } = useContext(Muplace_Context)
  const [Muplace, Setmuplace] = useState([])


 
  
  const onChange = (e) => {
    let newdata = muplace.sort((a, b) => a.name.localeCompare(b.name, 'th')).filter(data => data.name.toLowerCase().includes(e.target.value))
   
    Setmuplace(newdata.map(data => ({
      key: data._id.toString(),
      label: ( 
        <a onClick={() => localStorage.setItem('muplace', data.name)} href='/mudetail' style={{textDecoration:'none'}}>
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
          <div  >
            <Dropdown   menu={{ items: Muplace, }}>
              <Nav  >
                <Form.Control   onChange={onChange} type="text" placeholder="ค้นหาสถานที่มู..." style={{ width: 600 }} />
              </Nav>

            </Dropdown>
          </div>


          <Dropdown menu={{ items: usr_data ? loged_in : non_login }} >
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
