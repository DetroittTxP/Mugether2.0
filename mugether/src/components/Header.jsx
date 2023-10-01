import React, { useState,useEffect } from 'react'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'
import { Button, Dropdown,Menu } from 'antd';
import Logo from '../assets/Pap.jpg'
import { auto } from '@popperjs/core'
import { SlLogin } from 'react-icons/sl'
import { LuListFilter } from 'react-icons/lu'
import axios from 'axios'

export default function Header() {

  // const items = [
 
  // ];

  const [items,Setitems] = useState([])
  const [data,Setdata] = useState([])

  useEffect(() => {
      axios.get('http://localhost:5353/muplace/mudata')  
      .then(res => {
         Setdata(res.data)
         Setitems(res.data.map( data => ({
            key:data._id.toString(),
            label:(
               <a href='#ken'>
                  <h6>{data.name}</h6>
               </a>
            )
         })))
        
      })
      .catch(err => alert(err))
  },[])

  

 

  const onChange = (e) => {
     let newdata = data.filter(data => data.name.toLowerCase().includes(e.target.value))
     Setitems(newdata.map( data => ({
      key:data._id.toString(),
      label:(
         <a href='#ken'>
            <h6>{data.name}</h6>
         </a>
      )
   })))
  }

  

  return (
    <div >
      <Navbar style={{ padding: 30 }} bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} height={80} width={100} style={{ borderRadius: 50 }} />
          </Navbar.Brand>
      
          <Dropdown menu={{items,}}>
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
