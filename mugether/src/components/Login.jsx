import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
// import firebase from 'firebase/app';
// import 'firebase/auth';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // ตรวจสอบข้อมูลและดำเนินการเข้าสู่ระบบ
  };
  

//   const handleGoogleLogin = async () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     try {
//       await firebase.auth().signInWithPopup(provider);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFacebookLogin = async () => {
//     const provider = new firebase.auth.FacebookAuthProvider();
//     try {
//       await firebase.auth().signInWithPopup(provider);
//     } catch (error) {
//       console.error(error);
//     }
//   };


  return (
    <Container className="login-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className='InfoMu'>
            <h1>Mugether</h1>
            <p className="justify-content-center2">Mugether
                <br/>เป็นเว็ปไซต์ที่จะช่วยแนะนำสถานที่มู
                <br/>ให้แก่มือใหม่อีกทั้งยังรวบรวมข้อมูลที่
                <br/>เกี่ยวข้องกับสายมูทั้งหมด
            </p>
            
            <img src='https://nizar-rizkiana.github.io/absensi-app/assets/image/login3.png' className='custom-img'></img>
        </Col>
        
        <Col md={6} className='Login-form'>
            <p className='new-user'>
                New user?
                <a href='#'>Sign Up</a>
            </p>
          <h2 className="welcome">Welcome Back!</h2>
          <p className='login-message'>login to continue</p>
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
                placeholder=" Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
            </Form.Group>

            <Row>
                <Button variant="primary" type="submit" className="Enter">
                    LOGIN
                </Button>
                <a className='forget' href='/#'>
                    <h6 className='forget-message'>FORGET PASSWORD?</h6>
                </a>
            </Row>

            <Row>
                <label className='anotherlogin'>or continue login with</label> 
            </Row>

            <Row>
            
            <a className='GG' href="#">
                <FontAwesomeIcon icon={faGoogle} size="3x" />
            </a>
            <a className='FB' href="#">
                <FontAwesomeIcon icon={faFacebook} size="3x" />
            </a>
            </Row>
            
            

          </Form>
        </Col>
      </Row>
    </Container>
  );
}