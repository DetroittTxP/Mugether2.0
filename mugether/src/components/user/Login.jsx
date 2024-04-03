import React, { useState ,useContext} from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Link ,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import {Muplace_Context} from '../../context/MuContext'

export default function Login() {
  const {SERVER_URL} = useContext(Muplace_Context)
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  const [user, setuserdata] = useState(
    {
      username: "",
      password: ""
    }
  )
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {

      //check username password
      let res = await axios.post(`${SERVER_URL}/user/login`, user);
      console.log(res.data);

      if (res.data.status !== 'success') {
        return Swal.fire({
          icon: res.data.status,
          title: res.data.message
        })
      }

      console.log(res.data.usr_id);

      //verify token
      let verify_token = await axios.post(`${SERVER_URL}/user/verify`, {
        usr_id:res.data.usr_id,
        guide:res.data.guide,
        shop:res.data.shop
      }, {
        headers: {
          Authorization: `Bearer ${res.data.token}`
        }
      })

      if (verify_token.data.status !== 'success') {
        return Swal.fire('verify token error')
      }

      

      localStorage.setItem("usr", verify_token.data.result.username);
      localStorage.setItem("token", verify_token.data.token);
      localStorage.setItem('usr_id', verify_token.data.userID);
      localStorage.setItem('guide',verify_token.data.guide);
      localStorage.setItem('shop',verify_token.data.shop);
      
      await Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ'
      })

      navigate('/')

    }
    catch (err) {
      alert(err)
    }

  }


  const Change2 = (event1) => {
    setuserdata((e) => {
      return {
        ...e,
        [event1.target.id]: event1.target.value

      }
    }
    )
  }

  const handleForgottenPassword = () =>{
    navigate('/ForgottenPassword');

  }

  return (
    <Container className="login-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="InfoMu">
          <h1>Mugether</h1>
          <p className="justify-content-center2">
            Mugether
            <br />
            เป็นเว็ปไซต์ที่จะช่วยแนะนำสถานที่มู
            <br />
            ให้แก่มือใหม่อีกทั้งยังรวบรวมข้อมูลที่
            <br />
            เกี่ยวข้องกับสายมูทั้งหมด
          </p>
          <img
            src="https://nizar-rizkiana.github.io/absensi-app/assets/image/login3.png"
            className="custom-img"
          ></img>
        </Col>
        <Col md={6} className="Login-form">
          <p className="new-user">
            ยังไม่มีบัญชีผู้ใช้?
            <Link to="/register">สมัครสมาชิก</Link>
          </p>
          <h2 className="welcome">ยินดีต้อนรับ</h2>
          <p className="login-message">เข้าสู่ระบบเพื่อใช้งาน</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="👤  ชื่อบัญชีผู้ใช้"
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Row>
                <Col>
                  <div className="input-fields">
                    <Form.Control
                      
                      type={visible ? "text" : "password"}
                      placeholder="🔒  รหัสผ่าน"
                      onChange={Change2}
                      required
                    />

                    <div className="password-toggle"
                      onClick={() => setvisible(!visible)}>
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </div>
                  </div>

                </Col>
              </Row>

            </Form.Group>

            <Row>
              <Button variant="warning" type="submit" className="Enter1">
                เข้าสู่ระบบ
              </Button>
              <a className="forget" href="#">
                <h6 className="forget-message" onClick={handleForgottenPassword}>ลืมรหัสผ่าน?</h6>
              </a>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
