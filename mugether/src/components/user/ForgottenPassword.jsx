import React, { useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import "./ForgottenPassword.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Muplace_Context } from "../../context/MuContext";

export default function ForgottenPassword() {
    const { SERVER_URL } = useContext(Muplace_Context);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setUserdata] = useState('');
    const [pass,Setpass] = useState('');
    const [confirmpass,Setcomfirmpass] = useState('');
    const [token,Settoken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // check username password
            let res = await axios.post(`${SERVER_URL}/user/resetpassword`, {email});
            console.log(res.data);
            if(res.data.status === 'ok'){
                 Swal.fire({text:res.data.msg})
                 nextStep();
            }
        } catch (err) {
            alert(err);
        }
    };

    const onverifytoken=async (e) =>{
        e.preventDefault();
        try{
            let verify = await axios.post(`${SERVER_URL}/user/verifyresettoken`,{},{headers:{
                Authorization: `Bearer ${token}`
            }})

            if(verify.data.status === 'ok'){
               return nextStep();
            }
            else{
                Swal.fire({icon:'error',text:'token fail'})
            }
        }
        catch(err){
            alert(err);
        }
    }

    const onchangepass=async(e) =>{
        e.preventDefault();
        try{
            if(pass !== confirmpass){
                return    console.log('not math');
                
             }else{
                 let updatepass = await axios.post(`${SERVER_URL}/user/changepass`,{email,password:pass})
                 console.log(updatepass.data);
                 if(updatepass.data.status !== 'ok'){
                     return Swal.fire({text:'error'})
                 }else{
                    return Swal.fire({icon:'success',text:'Change Password Success'})
                 }
             }
        }
        catch(err){
            alert(err)
        }
         
    }




    const nextStep = () => {
        setStep(step => step + 1);
    };

    const handleChange = (e) => {
        setUserdata(e.target.value)
    };

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
                                    type="text"
                                    placeholder="✉️  Enter your password"
                                    onChange={(e) => Setpass(e.target.value)}
                                    required
                                />
                                <br/>
                                 <Form.Control
                                    type="text"
                                    placeholder="✉️  confirm password"
                                    onChange={(e) => Setcomfirmpass(e.target.value)}
                                    required
                                />
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