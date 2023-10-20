import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  
   const [user,setuserdata] = useState([
    {
       email:"",
       password:""
    }
   ])
  const handleSubmit = (e) => e.preventDefault();
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
            New user?
            <Link to="/register">Sign Up</Link>
          </p>
          <h2 className="welcome">Welcome Back!</h2>
          <p className="login-message">login to continue</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="✉️  Email"
                value={user.email}
                onChange={(e) => setuserdata({...user,email:e.target.value})}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="🔒  Password"
                value={user.password}
                onChange={(e) => setuserdata({...user,password:e.target.value})}
                required
              />
            </Form.Group>
            <Row>
              <Button variant="primary" type="submit" className="Enter">
                LOGIN
              </Button>
              <a className="forget" href="#">
                <h6 className="forget-message">FORGET PASSWORD?</h6>
              </a>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
