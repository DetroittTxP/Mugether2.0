import React, { useState, useContext } from 'react'
import { Container, Button, Row, Col, Form } from 'react-bootstrap'
import './adminpagelogin.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import { Muplace_Context } from '../../context/MuContext'
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function Adminpagelogin() {
  const [visible, setvisible] = useState(false);
  const { SERVER_URL } = useContext(Muplace_Context)
  const [user, setUser] = useState({
    username: '',
    password: '',
  })


  const onChangeuser = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }


  const Submit = async (e) => {
    e.preventDefault();

    //login
    try {
      Swal.fire({
        title: 'กำลังเข้าสู่ระบบ',
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
        }
      })

      let login = await axios.post(`${SERVER_URL}/admin/login`, { user })

      Swal.close();

      if (login.data.status === 'success') {
        let verify = await axios.post(`${SERVER_URL}/admin/verify`, { usr_id: login.data.usr_id, admin: login.data.admin }, {
          headers: {
            Authorization: `Bearer ${login.data.token}`
          }
        })

        if (verify.data.status !== 'success') {
          return Swal.fire({ text: 'เข้าสู่ระบบไม่สำเร็จ' })
        }
        console.log(verify.data);
        localStorage.setItem('usr_id', verify.data.usr_id)
        localStorage.setItem('token', verify.data.token);
        localStorage.setItem('admin', verify.data.admin)

        return window.location.href = '/admin'

      }
      else {
        return Swal.fire({ text: 'เข้าสู่ระบบไม่สำเร็จ' })
      }


    }
    catch (err) {
      return alert(err)
    }


  }



  return (
    <Container fluid className="h-100">
      <Row className="align-items-center h-100">
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={Submit} >
            <Form.Group controlId='username'>
              <Form.Label>ชื่อผู้ใช้</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกชื่อผู้ใช้"
                onChange={onChangeuser}

                required
              />
            </Form.Group>

            <Form.Group controlId='password' >
              <Form.Label>รหัสผ่าน</Form.Label>
              <Form.Control
                type={visible ? "text" : "password"}
                placeholder="กรอกรหัสผ่าน"
                onChange={onChangeuser}
              />
              <div className="password-toggle101"
                onClick={() => setvisible(!visible)}>
                {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </div>
            </Form.Group>
            <br />
            <Button variant="warning" type="submit">
              เข้าสู่ระบบ
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
