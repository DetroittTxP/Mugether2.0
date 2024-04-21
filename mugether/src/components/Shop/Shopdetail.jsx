import React, { useEffect, useState, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FaHeart, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import ShareButton from "../layout/ShareButton";
import { AiFillLike } from "react-icons/ai";

import './Shopdetail.css';
import SwalLoading from '../util/SwalLoading';
import Shopreview from './Shopreview';
import { Muplace_Context } from '../../context/MuContext';
import { fontGrid } from '@mui/material/styles/cssUtils';
import {useNavigate} from 'react-router-dom'


export default function Shopdetail() {
    const { SERVER_URL } = useContext(Muplace_Context)
    const navigate = useNavigate()

    const [shopdetail, Setshopdetail] = useState({
        shop_name: '',
        id_user:"",
        shop_items: [{
            item_photo: '',
            item_name: '',
            item_detail: '',
            item_price: 0,
            item_linkurl: '',
            item_review:[]
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
    const id_user_shop = localStorage.getItem('id_user')
    const [item_img, setitemimage] = useState([]);
    const [selectedShop,Setselectedshop] = useState([{
         item_name:'',
         item_price:'',
         item_detail:'',
         item_linkurl:'',
         item_img:[],
         item_review:[]
    
    }]);
    const [reviewThisItem, Setreviewthis] = useState([])

    const Owner = usr_id === id_user_shop
    
    const haveid =()=>{
          if(!usr_id || !id_user_shop)
          {
            return false;
          }
          return true;
    }

    useEffect(() => {
        SwalLoading();
        axios.get(`${SERVER_URL}/shop/get_per_shop/${shop_id}/${shop_item_id}`)
            .then(res => {
                const { shop_items } = res.data
                Setshopdetail(res.data);

                let filter = res.data.shop_items.filter(data => data._id === shop_item_id);
                Setselectedshop(res.data.shop_items.filter((data) => data._id === shop_item_id))


                setitemimage(() => {
                    let data = res.data.shop_items.filter((data) => data._id === shop_item_id);
                    return data[0].item_photo

                })

                Setreviewthis(res.data.shop_review);

                Swal.close();
            })
            .catch(err => alert("error"))
    }, [])

    const handleDelete = () => {

        Swal.fire({
            icon: 'question',
            text: 'ต้องการลบสินค้านี้ใช่หรือไม่',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่'
            ,confirmButtonColor:'orange'
        }).then(async result => {
            if (result.isConfirmed) {
           
                console.log(id_user_shop);
                let deleteproduct = await axios.delete(`${SERVER_URL}/shop/delete/${shop_id}/${shop_item_id}`)
              
                if(deleteproduct.data.status === 'ok'){
                    Swal.fire({icon:'success',text:'ลบสินค้าสำเร็จ'})
                     navigate('/shop')
                }
                
            }
        })
    }
    const pageUrl = window.location.href;

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <Carousel indicators controls className='img-shop'>
                    {item_img.map((image, index) => (
                        <Carousel.Item key={index}>
                        <div className="carousel-image-wrapper">
                            <img
                            className="d-block w-100"
                            src={`${SERVER_URL}/shop/post_img/${shop_id}/${image}`}
                            alt={`Product image ${index + 1}`}
                            style={{height: '480px'}}
                            />
                        </div>
                        </Carousel.Item>
                    ))}
                    </Carousel>
                </Col>
                <Col>
                    <div className="description-box">
                        {Owner && haveid()  && <Button variant='warning' onClick={handleDelete} className='button-delete'>❌ลบสินค้า</Button>}
                        <br/>
                        <h2 className='item-name'>{selectedShop[0].item_name}</h2>
                        <p className="price">ราคา {selectedShop[0].item_price} ฿/ชิ้น</p>
                        <p>{shopdetail.contact.address}</p>
                        <Button className='Buttom-shop' href={selectedShop[0].item_linkurl}>ไปยังร้านค้า</Button>

                    </div>
                </Col>
            </Row>
            <br />
        

            <div className="store-info">
                <div className="logo-container">
                    <img src={`${SERVER_URL}/shop/profile_img/${shopdetail.id_user}/${shopdetail.profile_shop_pic}`} alt="Logo" className="store-logo" />
                </div>
                <div className="contact-and-favorite-container">
                    <div className="contact-info">
                        <h3>{shopdetail.shop_name}</h3>
                        <p>{shopdetail.shop_detail.detail}</p>
                    </div>
                    {/* <div className="favorite-section">
                        <FaHeart
                            onClick={toggleFavorite}
                            className={isFavorited ? "favorite-button favorited" : "favorite-button"}
                        />
                        <p>Favorite Shop</p>
                    </div> */}
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
               
            </div>

            <div className='reviewshop'>
                <h2>รีวิว</h2>


             <Shopreview id_user={shopdetail.id_user} reviewdata={selectedShop[0].item_review} />
                            
            
    
            </div>

        </Container>
    );
}
