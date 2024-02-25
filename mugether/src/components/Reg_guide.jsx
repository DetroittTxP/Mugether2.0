import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reg_guide.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Select } from 'antd';

export default function Reg_guide() {
  const navigate = useNavigate();
  const [guide, setguidedata] = useState(
    {
      firstName: "",
      lastName: "",
      id_card: "", //รหัสบัตรปชช
      id_guide: "", 
      mu_place: [], //เลือกโลเคชั่น
    }
  )
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(guide);
    // try {

    //   //check username password
    //   let res = await axios.post('http://localhost:5353/user/login', user);
    //   console.log(res.data);

    //   if (res.data.status !== 'success') {
    //     return Swal.fire({
    //       icon: res.data.status,
    //       title: res.data.message
    //     })

    //   }

    //   //verify token
    //   let verify_token = await axios.post('http://localhost:5353/user/verify', {}, {
    //     headers: {
    //       Authorization: `Bearer ${res.data.token}`
    //     }
    //   })

    //   if (verify_token.data.status !== 'success') {
    //     return Swal.fire('verify token error')
    //   }

    //   localStorage.setItem("usr", verify_token.data.result.username);
    //   localStorage.setItem("token", verify_token.data.token);

    //   await Swal.fire({
    //     icon: 'success',
    //     title: 'Login Success'
    //   })

    //   navigate('/')

    // }
    // catch (err) {
    //   alert(err)
    // }

  }

  const Change2 = (event1) => {
    setguidedata((e) => {
      return {
        ...e,
        [event1.target.id]: event1.target.value

      }
    }
    )
  }

  const muplaceOptions = [];

  for (let i = 10; i < 36; i++) {
    muplaceOptions.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <Container className="reguide-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="reguide-form">
          <div className="profile-header">

          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="FirstName"
                value={guide.firstName}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="LastName"
                value={guide.lastNameName}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="id_card">
              <Form.Label>รหัสบัตรประชาชน</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID Card"
                value={guide.id_card}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="id_guide">
              <Form.Label>รหัสไกด์</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID Guide"
                value={guide.id_guide}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="muplace">
                <Form.Label>สถานที่สะดวก</Form.Label>
                <Select
                    mode="multiple"
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    optionFilterProp="children"
                    onChange={(values) => {
                    setguidedata(prevState => ({
                        ...prevState,
                        mu_place: values,
                    }));
                    }}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {muplaceOptions.map((mu_place) => (
                    <Select.Option key={mu_place.value} value={mu_place.value}>
                        {mu_place.label}
                    </Select.Option>
                    ))}
                </Select>
            </Form.Group>
            <br />

            <Button variant="primary" type="submit" className="submit-profile-btn">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
