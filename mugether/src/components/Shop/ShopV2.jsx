import React,{useEffect, useState} from 'react'
import { Nav, Container, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { Image } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'




export default function ShopV2() {


  const [listShop,Setlistshop ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5353/shop/shop_item')
    .then(res => {
        
        Setlistshop(res.data)
    })
    .catch(err => alert(err))
  },[])

  const type = [
    {
      type: 'Home',
      icon: 'https://cdn-icons-png.flaticon.com/128/2549/2549900.png'
    },
    {
      type: 'Guide',
      icon: 'https://cdn-icons-png.flaticon.com/128/9636/9636012.png'
    },
    {
      type: 'รับจ้างมู',
      icon: 'https://cdn-icons-png.flaticon.com/128/1830/1830368.png'
    },
    {
      type: 'ร้านค้าของมู',
      icon: 'https://cdn-icons-png.flaticon.com/128/2981/2981011.png'
    },
  ]

  
  


  return (
    <div>
      <Nav
        className='justify-content-center'
        variant="underline"
        onSelect={(selectedKey) => {
          alert(`selected ${selectedKey}`);

        }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >

        {/* nav type */}
        {type.map((data, index) => (
          <Nav.Item
            style={{
              marginRight: index < type.length - 1 ? '90px' : '0',
              marginTop: '10px', // ขยับ NavType ลงมา
            }}
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


      <Container  >

        <Row className="g-5">

                {listShop.map((shop,index) => (
                    <React.Fragment key={index}>
                       {shop.shop_items.map((data,i) => {
                          let top = i > 3 ? { marginTop: 100 } : {};

                          return (
                              <Col  xs={6} md={4} lg={3} key={data._id}>
                                   <a

                                    style={{
                                      position: "relative",
                                      borderRadius: 20,
                                      overflow: "hidden",
                                      display: "inline-block",
                                    }}
                                    >
                                 <div
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    zIndex: 1,
                                  }}
                                >
                                  <FaHeart
                                  
                                    style={{
                                      color: 'red',
                                      cursor: "pointer",
                                      fontSize: "24px",
                                    }}
                                  />
                                </div>



                                <Image

                                  onClick={() => {
                                       localStorage.setItem('shop_id',shop._id);
                                       localStorage.setItem('shop_item_id',data._id);
                                      
                                       navigate('/shopdetail')
                                  }}
                                  style={{ borderRadius: 20, cursor: 'pointer' }}
                                  width={300}
                                  height={300}
                                  alt={data.item_name}
                                  src={`http://localhost:5353/shop/post_img/${shop._id}/${data.item_photo[0]}`}
                                  loading="lazy"
                                />
                                </a>

                                <br />

                                <div style={{ fontFamily: "Sarabun" }}>
                                  <h5>{data.item_name}</h5>
                                </div>

                              </Col>
                          )
                       })}
                    </React.Fragment>
                ))}

        </Row>



      </Container>



    </div>
  )
}







// <Col style={top} md={3} key={data.productName}>
//                 <a

//                   style={{
//                     position: "relative",
//                     borderRadius: 20,
//                     overflow: "hidden",
//                     display: "inline-block",
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: "absolute",
//                       top: "10px",
//                       right: "10px",
//                       zIndex: 1,
//                     }}
//                   >

//                     <FaHeart
                      
//                       style={{
//                         color: "red",
//                         cursor: "pointer",
//                         fontSize: "24px",
//                       }}
//                     />

//                   </div>

//                   <Image
//                     onClick={() => {
//                          navigate('/shopdetail')
//                          selectedShop(data.productName);
//                     }}
//                      style={{ borderRadius: 20, cursor: 'pointer' }}
//                      width={300}
//                      height={300}
//                      alt={data.productName}
//                      src={data.productImage}
//                      loading="lazy"
//                   />
//                 </a>
                
//                 <br />
                
//                 <div style={{ fontFamily: "Sarabun" }}>
//                   <h5>{data.productName}</h5>
//                 </div>

//               </Col>