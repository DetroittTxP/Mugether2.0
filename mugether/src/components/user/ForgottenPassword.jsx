import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import "./ForgottenPassword.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {Muplace_Context} from '../../context/MuContext'

export default function ForgottenPassword() {
    const {SERVER_URL} = useContext(Muplace_Context)
    const navigate = useNavigate();
    const [user, setuserdata] = useState(
        {
            Email: ""
        }
    )
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        try {

            //check username password
            let res = await axios.post(`${SERVER_URL}/user/resetpassword`, user);
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
                usr_id: res.data.usr_id,
                guide: res.data.guide,
                shop: res.data.shop
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
            localStorage.setItem('guide', verify_token.data.guide);
            localStorage.setItem('shop', verify_token.data.shop);

            await Swal.fire({
                icon: 'success',
                title: 'Login Success'
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

                    <h2 className="welcome">Reset Password</h2>
                    <p className="login-message">No worries,we'll send you reset instructions.</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="Email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="✉️  Enter your email address"
                                onChange={Change2}
                                required
                            />
                        </Form.Group>

                        <Button variant="warning" type="submit" className="Enter">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
