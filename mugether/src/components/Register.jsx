import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const handleSubmit = (e) => e.preventDefault();
  return (
    <div>
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
            <p className="new-user2">
              Already have account?
              <Link to="/login" className="new-user3">
                Login
              </Link>
            </p>
            <h2 className="welcome">Sign Up!</h2>
            <p className="login-message2">Signup to continue</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="✉️  Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="Username"
                  placeholder="👤  Username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEnterPassword">
                <Form.Label>Enter Your Password</Form.Label>
                <Form.Control
                  type="Password"
                  placeholder="🔒  Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEnterConfirmPassword">
                <Form.Label>Confirm Your Password</Form.Label>
                <Form.Control
                  type="Password"
                  placeholder="🔒  Confirm Your Password"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Row className="justify-content-center">
                <Button variant="primary" type="submit" className="Enter">
                  SIGN UP
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
