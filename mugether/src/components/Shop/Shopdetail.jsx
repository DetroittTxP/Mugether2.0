import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaHeart, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';

import './Shopdetail.css';
import SwalLoading from '../util/SwalLoading';



export default function Shopdetail() {

    const [shopdetail, Setshopdetail] = useState({
        shop_name: '',
        shop_items: [{
            item_photo: '',
            item_name: '',
            item_detail: '',
            item_price: 0,
            item_linkurl: ''
        }],
        contact: {
            tel: '',
            address: '',
            lat: 0,
            long: 0
        },
        shop_detail: {
            detail: '',
            opening: '',
            email: ''
        },
        profile_shop_pic: ''
    });

    const shop_id = localStorage.getItem('shop_id');
    const shop_item_id = localStorage.getItem('shop_item_id');
    const usr_id = localStorage.getItem('usr_id');
    const [item_img, setitemimage] = useState([]);
    const [selectedShop,Setselectedshop] = useState([{
         item_name:'',
         item_price:'',
         item_detail:'',

    }]);

    const [isFavorited, setIsFavorited] = useState(false);
    const toggleFavorite = () => {
        setIsFavorited(!isFavorited);
    };

    useEffect(() => {
        SwalLoading();
        axios.get(`http://localhost:5353/shop/get_per_shop/${shop_id}/${shop_item_id}`)
            .then(res => {
                const { shop_items } = res.data
                Setshopdetail(res.data);

                let filter = res.data.shop_items.filter(data => data._id === shop_item_id);
                Setselectedshop(res.data.shop_items.filter((data) => data._id === shop_item_id))
             
             
                setitemimage(() => {
                     let data = res.data.shop_items.filter((data) => data._id === shop_item_id);
                     return data[0].item_photo
                     
                })
                
                Swal.close();
            })
            .catch(err => alert("error"))
    }, [])



    return (
        <Container className="mt-3">
            <Row>
                <Col md={6}>
                    <Carousel indicators controls>
                        {item_img.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={`http://localhost:5353/shop/post_img/${shop_id}/${image}`}
                                    alt={`Product image ${index + 1}`}
                                />

                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col md={6}>
                    <div className="description-box">
                        <h2>{selectedShop[0].item_name}</h2>
                        <p className="price">ราคา {selectedShop[0].item_price} ฿/ชิ้น</p>
                        <p>{shopdetail.contact.address}</p>
                        <Button variant="primary" className='Buttom-shop' href={shopdetail.shop_items[0].item_linkurl}>ไปยังร้านค้า</Button>

                    </div>
                </Col>
            </Row>
            <br />

            <div className="store-info">
                <div className="logo-container">
                    <img src={`http://localhost:5353/shop/profile_img/${shop_id}/${shopdetail.profile_shop_pic}`} alt="Logo" className="store-logo" />
                </div>
                <div className="contact-and-favorite-container">
                    <div className="contact-info">
                        <h3>{shopdetail.shop_name}</h3>
                        <p>{shopdetail.shop_detail.detail}</p>
                    </div>
                    <div className="favorite-section">
                        <FaHeart
                            onClick={toggleFavorite}
                            className={isFavorited ? "favorite-button favorited" : "favorite-button"}
                        />
                        <p>Favorite Shop</p>
                    </div>
                </div>
            </div>

            <br />
            <br />


            <div className='description3'>
                <h3>{selectedShop[0].item_detail}</h3>
                
            </div>

                <div className="info-shop-name">
                    <h2>ข้อมูลร้านค้า</h2>
                </div>

                <div className="shop-details">
                    <br />
                    <div className="shop-detail-item">
                        <FaClock className="icon" /> <span>เปิด - ปิด {shopdetail.shop_detail.opening} น.</span>
                    </div>
                    <div className="shop-detail-item">
                        <FaMapMarkerAlt className="icon" /> <span>ที่อยู่ : {shopdetail.contact.address}</span>
                    </div>
                    <div className="shop-detail-item">
                        <FaPhone className="icon" /> <span>เบอร์โทร : {shopdetail.contact.tel}</span>
                    </div>
                    <div className="shop-detail-item">
                        <FaEnvelope className="icon" /> <span>Email : {shopdetail.contact.email}</span>
                    </div>
                    <div className="map-container">
                        <div className="map-placeholder">MAP</div>
                    </div>
                </div>

                <div className='reviewshop'>
                    <h2>รีวิว</h2>
                </div>
            
        </Container>
    );
}
