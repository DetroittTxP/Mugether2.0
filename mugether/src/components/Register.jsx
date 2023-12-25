import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { EyeOutlined,EyeInvisibleOutlined } from "@ant-design/icons";

const Register = () => {
    const navigate = useNavigate();
    const [visible,setvisible] = useState(false);
    const [User,setUserdata] = useState(
        {
            email: "",
            username: "",
            password: "",
            confirmpassword: ""
        }
    );

    



    const checkPassword=()=>{
         if(User.password != User.confirmpassword)
         {
            Swal.fire("Password not match");
            return true;
         }

         const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
         if (!passwordPattern.test(User.password)) {
            // Swal.fire("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร\nประกอบด้วย 1 ตัวพิมพ์ใหญ่\n 1 ตัวพิมพ์เล็ก 1 ตัวเลข\nและ 1 ตัวอักขระพิเศษ");
            // Swal.fire("Password must contain the following:\nAt least 8 characters\n At least one uppercase letter\nAt least one lowercase letter\nAt least one digit\nAt least one special character (!@#$%^&*()_+)");
            Swal.fire({
                title: "Password Validation",
                text: "รหัสผ่านต้องประกอบด้วย: รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วย 1 ตัวพิมพ์ใหญ่ 1 ตัวพิมพ์เล็ก 1 ตัวเลข และ 1 ตัวอักขระพิเศษ",
                icon: "warning",
                customClass: {
                    popup: 'custom-font-size',
                },
            });
            
            // ใส่ CSS ใน JavaScript
            const customStyle = document.createElement('style');
            customStyle.innerHTML = `
                .custom-font-size {
                    font-size: 16px; 
                }`;
            document.head.appendChild(customStyle);
            
        
            
            return true;
            
        }
         return false;
    }


    

    const handleSubmit = async (e) => {
        e.preventDefault();

        //if checkPassword() != true
        if( !checkPassword() )
        {
            const sent_data = {
                username:User.username,
                password:User.password,
                email:User.email
            }

            try{
                let res = await axios.post('http://localhost:5353/user/register',sent_data)
                console.log(res.data);

                if(res.data.status === 'success')
                {
                    await Swal.fire("Register success");
                    navigate('/login')
                }
            }
            catch(err)
            {
                alert(err);
            }
        }
       

    };

    const Change = (event)=>{
        setUserdata((e)=>{
            return{
                ...e,
                [event.target.id]:event.target.value 

            }
        })
    }
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
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email"
                                    placeholder="✉️  Email"
                                    onChange={Change}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="Username"
                                    placeholder="👤  Username"
                                    onChange={Change}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Enter Your Password</Form.Label>
                                <Form.Control
                                    
                                    type={visible ? "text" : "password"}
                                    placeholder="🔒  Password"
                                    onChange={Change}
                                    // <div>{visible ? <EyeOutlined/> :<EyeInvisibleOutlined/>}</div>
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="confirmpassword">
                                <Form.Label>Confirm Your Password</Form.Label>
                                <Form.Control
                                    
                                    type={visible ? "text" : "password"}
                                    placeholder="🔒  Confirm Your Password"
                                    onChange={Change}
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
