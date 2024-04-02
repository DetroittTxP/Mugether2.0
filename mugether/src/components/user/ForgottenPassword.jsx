import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import "./ForgottenPassword.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Muplace_Context } from "../../context/MuContext";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

export default function ForgottenPassword() {
    const { SERVER_URL } = useContext(Muplace_Context);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setUserdata] = useState('');
    const [pass, Setpass] = useState('');
    const [confirmpass, Setcomfirmpass] = useState('');
    const [token, Settoken] = useState('');
    const [visible, setvisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // check username password
            let res = await axios.post(`${SERVER_URL}/user/resetpassword`, { email });
            console.log(res.data);
            if (res.data.status === 'ok') {
                Swal.fire({ text: res.data.msg })
                nextStep();
            }
        } catch (err) {
            alert(err);
        }
    };

    const onverifytoken = async (e) => {
        e.preventDefault();
        try {
            let verify = await axios.post(`${SERVER_URL}/user/verifyresettoken`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (verify.data.status === 'ok') {
                return nextStep();
            }
            else {
                Swal.fire({ icon: 'error', text: 'token fail' })
            }
        }
        catch (err) {
            alert(err);
        }
    }

    const onchangepass = async (e) => {
        e.preventDefault();
        if (!checkPassword()) {
            try {
                if (pass !== confirmpass) {
                    return console.log('not math');

                } else {
                    let updatepass = await axios.post(`${SERVER_URL}/user/changepass`, { email, password: pass })
                    console.log(updatepass.data);
                    if (updatepass.data.status !== 'ok') {
                        return Swal.fire({ text: 'error' })
                    } else {
                         Swal.fire({ icon: 'success', text: 'Change Password Success' })
                         window.location.href="/login";
                         return;
                    }
                }
            }
            catch (err) {
                alert(err)
            }
        }

    }




    const nextStep = () => {
        setStep(step => step + 1);
    };

    const handleChange = (e) => {
        setUserdata(e.target.value)
    };

    const checkPassword = () => {
        if (pass != confirmpass) {
            Swal.fire("Password not match");
            return true;
        }

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!passwordPattern.test(pass)) {
            // Swal.fire("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร\nประกอบด้วย 1 ตัวพิมพ์ใหญ่\n 1 ตัวพิมพ์เล็ก 1 ตัวเลข");
            // Swal.fire("Password must contain the following:\nAt least 8 characters\n At least one uppercase letter\nAt least one lowercase letter\nAt least one digit\nAt least one special character (!@#$%^&*()_+)");
            Swal.fire({
                title: "Password Validation",
                text: "รหัสผ่านต้องประกอบด้วย: รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วย 1 ตัวพิมพ์ใหญ่ 1 ตัวพิมพ์เล็ก 1 ตัวเลข",
                icon: "warning",
                customClass: {
                    popup: 'custom-font-size',
                },
            });

            return true;

        }
        return false;
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
                    <p className="new-user2">
                        Already have account?
                        <Link to="/login">Login</Link>
                    </p>
                    {step === 1 && (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="Email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="✉️  Enter your email address"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button
                                variant="warning"
                                type="submit"
                                className="Enter"
                            >
                                send email
                            </Button>
                        </Form>
                    )}
                    {step === 2 && (
                        <div>
                            <Form onSubmit={onverifytoken}>
                                <Form.Group controlId="Email">
                                    <Form.Label>Token</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="✉️  Enter your Token"
                                        onChange={(e) => Settoken(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    variant="warning"
                                    type="submit"
                                    className="Enter"
                                >
                                    send token
                                </Button>
                            </Form>
                        </div>
                    )}
                    {step === 3 && (
                        <div>
                            <Form onSubmit={onchangepass} >
                                <Form.Group controlId="Email">

                                    <Form.Control
                                        type={visible ? "text" : "password"}
                                        placeholder="✉️  Enter your password"
                                        onChange={(e) => Setpass(e.target.value)}
                                        required
                                    />
                                    <div className="password-toggle1"
                                        onClick={() => setvisible(!visible)}>
                                        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}

                                    </div>
                                    <br />
                                    <Form.Control
                                        type={visible ? "text" : "password"}
                                        placeholder="✉️  confirm password"
                                        onChange={(e) => Setcomfirmpass(e.target.value)}
                                        required
                                    />
                                    <div className="password-toggle1"
                                        onClick={() => setvisible(!visible)}>
                                        {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}

                                    </div>
                                    <div className="Text-p"><p>At least 8 character,1 uppercase letter,1 number</p></div>
                                </Form.Group>

                                <Button
                                    variant="warning"
                                    type="submit"
                                    className="Enter"
                                >
                                    confirm
                                </Button>
                            </Form>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}