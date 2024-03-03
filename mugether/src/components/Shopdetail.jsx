import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';

import './Shopdetail.css';
import SwalLoading from './SwalLoading';


//ไว้เก็บ
const images = [
    "https://down-th.img.susercontent.com/file/th-11134207-7r98o-lkosofyofpwe20",
    "https://down-th.img.susercontent.com/file/930a3347af2a1cca20fdba87460681f2",
    "https://down-th.img.susercontent.com/file/4e701f668b5f84dc88a9e4449b16a253",
];

export default function Shopdetail ({selectedshop}) {

    const [shopdetail,Setshopdetail] = useState({
    
    });


    useEffect(()=>{
        SwalLoading();
        axios.get(`http://localhost:5353/shop/get_per_shop/${selectedshop}`)
        .then(res => {
             Setshopdetail(res.data);
             Swal.close();
        })
        .catch(err => alert(err))
    },[])

    console.log('HI FROM Shopdetail'  + selectedshop);

  return (
    <Container className="mt-3">
        <Row>
            <Col md={6}>
              <Carousel indicators controls>
                  {images.map((image, index) => (
                      <Carousel.Item key={index}>
                      <img
                          className="d-block w-100"
                          src={image}
                          alt={`Product image ${index + 1}`}
                      />
                      </Carousel.Item>
                  ))}
              </Carousel>
            </Col>
            <Col md={6}>
              <div className="description-box">
                  <h2>Muteru</h2>
                  <p className="price">$99.99</p>
                  <p>เครื่องประดับ มูเตลู สายความเชื่อ ว้าว!!!!</p>
                  <Button variant="primary" className='Buttom-shop'>ไปยังร้านค้า</Button>
              </div>
            </Col>
        </Row>

        <br />
        <br />

        <div className='description2'>
            <h2>รายละเอียดสินค้า</h2>
        </div>
        <br />
        <div className='description3'>
            <p>ปี่เซี้ยะกังหันดูดทรัพย์หมุนได้ เสริมราศี หนุนดวง แก้ชงเสริมเรื่องโชคลาภ เงินทอง ความรัก ปี่เซี้ยะด้ายแดงกังหันดูดทรัพย์ หมุนได้ เดี่ยว หนุนดวง แก้ชง เสริมราศีเหมาะทั้งผู้ชายและผู้หญิงตัวด้ายแดงสามารถปรับขนาดได้ตามข้อมือ</p>
        </div>

        <br />
        <br />

        <div className='reviewshop'>
            <h2>รีวิว</h2>
        </div>
      
    </Container>
  );
}
