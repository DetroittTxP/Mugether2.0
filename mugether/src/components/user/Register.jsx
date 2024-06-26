import React, { useState,useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Muplace_Context } from "../../context/MuContext";
const Register = () => {
    const {SERVER_URL} = useContext(Muplace_Context)
    const navigate = useNavigate();
    const [visible, setvisible] = useState(false);
    const [User, setUserdata] = useState(
        {
            email: "",
            username: "",
            password: "",
            confirmpassword: ""
        }
    );

    const checkPassword = () => {
        if (User.password != User.confirmpassword) {
            Swal.fire("รหัสผ่านไม่ตรงกัน");
            return true;
        }

        const passwordPattern = /^[A-Z][a-zA-Z0-9]{7,}$/;
         if (!passwordPattern.test(User.password)) {

            Swal.fire({
                text: "รหัสผ่านต้องประกอบด้วย: รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วย  ตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว   ตัวพิมพ์เล็กอย่างน้อย 1 ตัว เเละ ตัวเลข อย่างน้อย 1 ตัว",
                icon: "warning",
                customClass: {
                    popup: 'custom-font-size',
                },
            });
            return true;
        }
        return false;
    }


    const checkusr=()=>{
        const pattern  = /^[a-zA-Z0-9]{1,20}$/;
        if(!pattern.test(User.username)){
            Swal.fire({
               
                text: "ชื่อผู้ใช้ต้องยาวไม่เกิน 20 ตัวอักษร",
                icon: "warning",
                customClass: {
                    popup: 'custom-font-size',
                },
            });
            return true;
        }

        return false;
    }







    const handleSubmit = async (e) => {
        e.preventDefault();

        //if checkPassword() != true
        if (!checkPassword()   && !checkusr()) {
            const sent_data = {
                username: User.username,
                password: User.password,
                email: User.email
            }

            Swal.fire({
                title: 'กำลังโหลด...',
                html: 'โปรดรอสักครู่',
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                },
            })

            try {
                let res = await axios.post(`${SERVER_URL}/user/register`, sent_data)
                console.log(res.data);
                Swal.close();
          
                if (res.data.status === 'success') {
                    await Swal.fire({
                        icon: 'success',
                        title: "สมัครสมาชิกสำเร็จ",
                        confirmButtonText: "ไปยังหน้า Login",
                        showCancelButton: true,
                        cancelButtonText: "ยกเลิก",
                        confirmButtonColor:'orange'
                    })
                        .then(result => {
                            if (result.isConfirmed) {
                                navigate('/login')
                            }

                        });
                }
                else{
                    await Swal.fire({
                         icon:'error',
                         text:'มีอีเมลหรือชื่อผู้ใช้งานถูกใช้ไปเเล้ว'
                        
                    })
                    console.log(res.data);
                }
            }
            catch (err) {
                alert(err);
            }
        }

    };

    const Change = (event) => {
        setUserdata((e) => {
            return {
                ...e,
                [event.target.id]: event.target.value

            }
        })
    }
    return (
        <div>
            <Container className="register-container">
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
                    <Col md={6} className="register-form">
                        <p className="new-user2">
                            มีบัญชีผู้ใช้งานแล้ว? <Link to="/login" className="link-login"> เข้าสู่ระบบ </Link>
                        </p>
                        <h2 className="welcome">สมัครสมาชิก</h2>
                        <p className="login-message2">สมัครสมาชิกเพื่อเข้าใช้งาน</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="✉️  อีเมล"
                                    onChange={Change}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="Username"
                                    placeholder="👤  ชื่อผู้ใช้งาน"
                                    onChange={Change}
                        
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Enter Your Password</Form.Label>
                                <Row>
                                    <Col>
                                     <div className="password-input">
                                        <Form.Control
                                            
                                            type={visible ? "text" : "password"}
                                            placeholder="🔒  รหัสผ่าน"
                                            onChange={Change}
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
                            <Form.Group controlId="confirmpassword">
                                <Form.Label>Confirm Your Password</Form.Label>
                                <Row>

                                    <Col>
                                     <div className="password-input">
                                        <Form.Control
                                            
                                            type={visible ? "text" : "password"}
                                            placeholder="🔒 ยืนยันรหัสผ่าน"
                                            onChange={Change}
                                            required
                                        />
                                    
                                        <div className="password-toggle"
                                            onClick={() => setvisible(!visible)}>
                                            {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}

                                        </div>
                                        
                                        </div>
                                        <div className="Text-p">
                                            <p>อย่างน้อย 8 ตัวอักษร ต้องมี 1 ตัวพิมพ์ใหญ่ 1 ตัวพิมพ์เล็ก 1 ตัวเลข </p>
                                        </div>
                                    </Col>

                                </Row>
                            </Form.Group>

                            <Row className="justify-content-center">
                                <Button variant="warning" type="submit" className="Enter">
                                    สมัครสมาชิก
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
