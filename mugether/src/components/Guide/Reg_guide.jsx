import React, { useState, useContext,useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./Reg_guide.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Select } from 'antd';
import { Muplace_Context } from "../../context/MuContext";

export default function Reg_guide() {
  const navigate = useNavigate();
  const userID = localStorage.getItem('usr_id');
  const { muplace,SERVER_URL } = useContext(Muplace_Context);
  const file = useRef(null);
  const [guide, setguidedata] = useState(
    {
      userID:userID,
      firstName: "",
      lastName: "",
      id_card: "", //รหัสบัตรปชช
      id_guide: "",
      mu_place: [], //เลือกโลเคชั่น
    }
  )

  const [image, setImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();


    const image_form = new FormData();
    image_form.append('img-guide', image);

    try {
      Swal.fire({
        title: 'Loading...',
        html: 'Please wait',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      })

      let res = await axios.post(`${SERVER_URL}/verify_guide/info`, { guide })
      let id_user = res.data.msg._id;
      let add_image = await axios.post(`${SERVER_URL}/verify_guide/img/${userID}`, image_form)
      Swal.close();

      await Swal.fire({
        icon: 'success',
        title: 'Success'
      })

      setguidedata({
        firstName: "",
        lastName: "",
        id_card: "",
        id_guide: "",
        mu_place: [],
      });
      setImage(null);

      if(file.current){
        file.current.value = '';
      }
    

    }
    catch (err) {
      Swal.fire({
        title: "Error",
        text: err,
        icon: 'error'
      });
    }
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

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  }
  
  return (
    <Container className="reguide-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="reguide-form">
          <div className="profile-header">

          </div>
          <h2 className="head">Register Guide🧳</h2> 
          

          <Form onSubmit={handleSubmit}>

          <Form.Group>
             

              <Form.Label>โปรดเเนบรูปประจำตัวของคุณ</Form.Label>
              <Form.Control
                ref={file}
                type="file"
                accept='image/*'
                onChange={onImageChange}
             
              />

          </Form.Group>
          
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
                value={guide.lastName}
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
                placeholder="🪪 ID Guide"
                value={guide.id_guide}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="muplace" >
              <Form.Label>สถานที่สะดวก</Form.Label>
              <Select
                mode="multiple"
                
                showSearch
                style={{ width: '100%' }}
                placeholder="🗺️ Please select"
                optionFilterProp="children"
                    value={guide.mu_place}
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
                {muplace.map((mu_place, i) => (
                  <Select.Option  key={i} value={mu_place.name}>
                    {mu_place.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Group>
            <br />

          

            <Button variant="warning" type="submit" >
              สมัคร
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
