import React, { useState, useRef,useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { Muplace_Context } from '../../context/MuContext';

const SwalLoading = () => {
  Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    showCancelButton: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    }
  });
};

export default function Add_Shop() {
  const usrid = localStorage.getItem('usr_id');
  const file = useRef(null);
  const {SERVER_URL} = useContext(Muplace_Context)

  const getIDshop = async (iduser) => {
    let res = await axios.get(`${SERVER_URL}/shop/${iduser}`);
    if (!res.data) {
      return "you not user";
    } else {
      return res.data._id;
    }
  };

  const [shop_item, setShopItem] = useState({
    item_name: '',
    item_detail: '',
    item_price: 0,
    item_linkurl:''

  });

  const [image, setImage] = useState([]);

  const onFileChange = (event) => {
    setImage([...event.target.files]);
  };

  const onFormChange = (event) => {
    setShopItem((prev) => {
      let e = event.target.value;
      if (event.target.id === 'item_price') {
        e = parseFloat(event.target.value);
      }
      return {
        ...prev,
        [event.target.id]: e,
      };
    });
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    const shop_id = await getIDshop(usrid);
    const img = new FormData();

    if(image.length === 0){
       return Swal.fire({text:'โปรดอัพรูปสินค้าอย่างน้อย 1 รูป'})
    }
    image.forEach((file) => {
      img.append('upload_post', file);
    });

    try {
      SwalLoading();

      let upload_post_image = await axios.post(`${SERVER_URL}/shop/add_post_img/${shop_id}`, img);
      const { filename } = upload_post_image.data;

      let add_item = await axios.put(`${SERVER_URL}/shop/add-item/${shop_id}`, { shop_item, filename });
      
      setShopItem({
        item_name: '',
        item_detail: '',
        item_price: 0,
        item_linkurl:'',
      });
      file.current.value = null;
      setImage([]);

      Swal.fire({ icon: 'success', text: 'เพิ่มรายการสินค้าแล้ว' });
    } catch (err) {
      Swal.fire({ text: err });
    }
  };

  return (
    <Container className="reguide-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="reguide-form">
          <div className="profile-header"></div>
          <h2 className="head">เพิ่มสินค้าของคุณ🧳</h2>

          <Form onSubmit={formSubmit}>
            <Form.Group>
              <Form.Label>โปรดเเนบรูปสินค้าของคุณ</Form.Label>
              <Form.Control
                ref={file}
                type="file"
                accept="image/*"
                multiple
                onChange={onFileChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="item_name">
              <Form.Label>ชื่อสินค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อสินค้า"
                onChange={onFormChange}
                value={shop_item.item_name}
                required
              />
            </Form.Group>

            <Form.Group controlId="item_detail">
              <Form.Label>รายละเอียดสินค้า</Form.Label>
              <Form.Control
                placeholder="รายละเอียดสินค้า"
                as="textarea"
                rows={3}
                onChange={onFormChange}
                value={shop_item.item_detail}
                required
              />
            </Form.Group>

            <Form.Group controlId="item_price">
              <Form.Label>ราคา</Form.Label>
              <Form.Control
                type="number"
                placeholder="ราคา"
                onChange={onFormChange}
                value={shop_item.item_price}
                required
              />
            </Form.Group>

            <br/>
            <Form.Group controlId="item_linkurl">
              <Form.Label>ลิ้งค์สินค้า</Form.Label>
              <Form.Control
                type="url"
                placeholder="ลิ้งค์ไปยังสินค้า"
                onChange={onFormChange}
                value={shop_item.item_linkurl}
              />
            </Form.Group>

            <br/>

            <Button variant="warning" type="submit">
              เพิ่มสินค้า
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
