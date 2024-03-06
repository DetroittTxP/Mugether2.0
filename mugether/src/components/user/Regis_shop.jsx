import React, { useState, useContext,useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Muplace_Context } from "../../context/MuContext";
import './Regis_shop.css'
import TextArea from "antd/es/input/TextArea";

export default function Regis_shop() {
  const navigate = useNavigate();
  const userID = localStorage.getItem('usr_id');
  const { muplace } = useContext(Muplace_Context);
  const file = useRef(null);

  const [shop, setshopdata] = useState({
    id_user: userID,
    shop_name: "",
    shop_detail: {
      detail: "",
      opening: "",
    },
    contact: {
      tel: "",
      address: "",
      lat: "",
      long: ""
    }
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const image_form = new FormData();
    image_form.append('profile_pic', image);

    try {
      Swal.fire({
        title: 'Loading...',
        html: 'Please wait',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      })

      let createshop = await axios.post('http://localhost:5353/shop/create-shop', shop)
 
      const {_id} = createshop.data.create_shop
     
      
      if(image){
         await axios.post(`http://localhost:5353/shop/upload-edit-profile/${_id}` , image_form)
         .then(res => {
               
         } )
         .catch(err => Swal.fire({text:err}))
      }






      Swal.close();

      await Swal.fire({
        icon: 'success',
        title: 'Success'
      })

      setshopdata({
        id_user: "",
        shop_name: "",
        shop_detail: {
            detail: "",
            opening: "",
        },
        contact: {
            tel: "",
            address: "",
            lat: "",
            long: ""
        }
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
    setshopdata((e) => {
      return {
        ...e,
        [event1.target.id]: event1.target.value

      }
    }
    )
  }

  const Change3 = (event2) => {
    const { id, value } = event2.target;
    let keys = id.split('.');
  
    setshopdata((currentState) => {
      let newState = { ...currentState };
      let tempState = newState; 
  
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          tempState[key] = value;
        } else {
          if (!tempState[key]) tempState[key] = {};
          tempState = tempState[key];
        }
      });
  
      return newState;
    });
  };

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  }
  
  return (
    <Container className="regshop-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="regshop-form">
          <div className="profile-header">

          </div>
          <h2 className="head">Register Shop 🏪</h2> 
          

          <Form onSubmit={handleSubmit}>

          <Form.Group>
              <Form.Label>โปรดเเนบรูปร้านค้าของคุณ (Optional) </Form.Label>
              <Form.Control
                ref={file}
                type="file"
                accept='image/*'
                onChange={onImageChange}
             
              />
          </Form.Group>
          
            <Form.Group controlId="shop_name">
              <Form.Label>ชื่อร้านค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="ShopName"
                value={shop.shop_name}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="shop_detail.detail">
              <Form.Label>รายละเอียดของร้านค้า</Form.Label>
              <Form.Control
                as={TextArea}
                placeholder="Detail"
                value={shop.shop_detail.detail}
                onChange={Change3}
                required
              />
            </Form.Group>

            <Form.Group controlId="shop_detail.opening">
              <Form.Label>เวลาเปิด - ปิดของร้านค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="Time"
                value={shop.shop_detail.opening}
                onChange={Change3}
                required
              />
            </Form.Group>

            <Form.Group controlId="contact.tel">
              <Form.Label>เบอร์โทรติดต่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tel"
                value={shop.contact.tel}
                onChange={Change3}
                required
              />
            </Form.Group>

            <Form.Group controlId="contact.address">
              <Form.Label>ที่อยู่ของร้านค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={shop.contact.address}
                onChange={Change3}
                required
              />
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
