import React,{useEffect, useState,useContext} from 'react'
import axios from 'axios'
import { Nav, Container, Col, Row, Card, Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { Muplace_Context } from '../../context/MuContext';



export default function ShopV2() {
  const {SERVER_URL} = useContext(Muplace_Context)

  const [listShop,Setlistshop ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${SERVER_URL}/shop/shop_item`)
    .then(res => {
        
        Setlistshop(res.data)
    })
    .catch(err => alert(err))
  },[])

  const type = [
    {
      type: 'หน้าหลัก',
      icon: 'https://cdn-icons-png.flaticon.com/128/2549/2549900.png',
      path:'/'
    },
  
  ]

  return (
    <div>
      <Nav
        className='justify-content-center'
        variant="underline"
        
        style={{ display: 'flex', justifyContent: 'center' }}
      >

        {/* nav type */}
        {type.map((data, index) => (
          <Nav.Item
            style={{
              marginRight: index < type.length - 1 ? '90px' : '0',
              marginTop: '10px', // ขยับ NavType ลงมา
            }}
            onClick={() => navigate(data.path)}
            key={data.type}
            
          >
            <div style={{ textAlign: 'center' }}>



              <Nav.Link eventKey={data.type} style={{ color: 'black' }}>
                <img  style={{ marginBottom: 15 }} height={30} width={30} src={data.icon} alt={data.type} />
                <br />

                {data.type}
              </Nav.Link>

            </div>
          </Nav.Item>
        ))}
      </Nav>
      <br />

      <br />
      <br />
      {/*  SHOP LIST   */}


        <Container>
        <Row xs={1} md={2} lg={4} className="g-4">
          {listShop.map((shop, shopIndex) => (
            <React.Fragment key={shopIndex}>
              {shop.shop_items.map((data, itemIndex) => (
                <Col key={itemIndex}>
                  <Card style={{ height: "100%", borderRadius: "15px", cursor: "pointer" }}>
                    <Card.Img
                      variant="top"
                      src={`${SERVER_URL}/shop/post_img/${shop._id}/${data.item_photo[0]}`}
                      alt={data.item_name}
                      onClick={() => {
                        localStorage.setItem('shop_id', shop._id);
                        localStorage.setItem('shop_item_id', data._id);
                        localStorage.setItem('id_user', shop.id_user);
                        navigate('/shopdetail');
                      }}
                      style={{ height: "300px", objectFit: "cover", borderRadius: "15px" }}
                    />
                    <Card.Body>
                      <Card.Title>{data.item_name}</Card.Title>
                      <div className="fav-icon">
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </React.Fragment>
          ))}
        </Row>
      </Container>
    </div>
  );
}