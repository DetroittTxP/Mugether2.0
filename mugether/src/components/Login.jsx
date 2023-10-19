import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ตรวจสอบข้อมูลและดำเนินการเข้าสู่ระบบ
  };
  

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col md={6} className='InfoMu'>
            <h1>Mugether</h1>
            <p className="justify-content-center2">Mugether
                <br/>เป็นเว็ปไซต์ที่จะช่วยแนะนำสถานที่มู
                <br/>ให้แก่มือใหม่อีกทั้งยังรวบรวมข้อมูลที่
                <br/>เกี่ยวข้องกับสายมูทั้งหมด
            </p>
            
            <img src='https://nizar-rizkiana.github.io/absensi-app/assets/image/login3.png' className='custom-img'></img>
        </Col>

        {/* <hr className='vertical-line' /> */}

        <Col md={6} className='Login-form'>
          <h2 className="text-center mb-4">เข้าสู่ระบบ</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              เข้าสู่ระบบ
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}