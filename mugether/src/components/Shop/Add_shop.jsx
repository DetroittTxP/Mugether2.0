import React, { useState, useContext,useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2";
import axios from "axios";
import { Select } from 'antd';
import { Muplace_Context } from "../../context/MuContext";
import SwalLoading from "../util/SwalLoading";





export default function Add_Shop() {

  const usrid = localStorage.getItem('usr_id');
  const file = useRef(null);

  const getIDshop=async(iduser)=>{
      
     let res = await axios.get(`http://localhost:5353/shop/${iduser}`);
     if(!res.data){
          return "you not user";
     }
     else{
      return res.data._id;
     }
    
}




  const [shop_item, setshopitem] = useState(
    {
      item_name:'',
      item_detail:'',
      item_price:0,
    }
  )

   

  const [image, setImage] = useState([]);


  const onFileChange=(event)=>{
        setImage([...event.target.files]);
  }


  const onFormChange=(event)=>{
      setshopitem(prev => {
            
                let e = event.target.value;
                if(event.target.id === 'item_price')
                {
                    e = parseFloat(event.target.value)
                } 
                  return{
                    ...prev,
                    [event.target.id]:e
                }
      })
  }


  const formSubmit=async(event)=>{
       event.preventDefault();
       const shop_id = await getIDshop(usrid);
        const img = new FormData();
        console.log(shop_id);
        image.forEach((file => {
               img.append('upload_post', file);
        }))

       try{
           SwalLoading();
            
           let upload_post_image = await axios.post(`http://localhost:5353/shop/add_post_img/${shop_id}`, img);
           const {filename} = upload_post_image.data;
            
           let add_item = await axios.put(`http://localhost:5353/shop/add-item/${shop_id}`, {shop_item,filename});
           Swal.fire({icon:'success',text:'เพิ่มรายการสินค้าเเล้ว'})
        }
       catch(err){
          Swal.fire({text:err})
       }
  }

  
  return (
    <Container className="reguide-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="reguide-form">
          <div className="profile-header">

          </div>
          <h2 className="head">เพิ่มสินค้าของคุณ🧳</h2> 
          

          <Form onSubmit={formSubmit} >
          <Form.Group>
             
              <Form.Label>โปรดเเนบรูปประจำตัวของคุณ</Form.Label>
              <Form.Control
                ref={file}
                type="file"
                accept='image/*'
                multiple
                onChange={onFileChange}
              />

          </Form.Group>
          
            <Form.Group controlId="item_name">
              <Form.Label>ชื่อสินค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อสินค้า"
                onChange={onFormChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="item_detail">
              <Form.Label>รายละเอียดสินค้า</Form.Label>
              <Form.Control placeholder="รายละเอียดสินค้า" as="textarea" rows={3}   onChange={onFormChange} />
            </Form.Group>

            <Form.Group controlId="item_price">
              <Form.Label>ราคา</Form.Label>
              <Form.Control
                type="Number"
                placeholder="ราคา"
                onChange={onFormChange}
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
