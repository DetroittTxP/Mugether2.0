import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Image, Button, Card, Tab } from 'react-bootstrap';
import axios from 'axios';
import '../Guide/Reg_guide.css'
import { Muplace_Context } from '../../context/MuContext';
import { LineIcon,FacebookIcon } from 'react-share'
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa6";
import {Table} from 'react-bootstrap';



export default function Shopprofilepage() {
  const { SERVER_URL } = useContext(Muplace_Context);
  const usrid = localStorage.getItem('usr_id');
  const shop_id = localStorage.getItem('shop_id');
  const [shopprofile,Setshopprofile] = useState({
       _id:'',
       id_user:'',
       shop_name:'',
       shop_detail:{
          opening:'',
          detail:'',
       },
       contact:{
          tel:'',
          address:'',
          email:''     
       },
       shop_items:[],
       shop_review:[],
       profile_shop_pic:'',
  })

  useEffect(() => {
      axios.get(`${SERVER_URL}/shop/profile/${usrid}`)
      .then(res => {
          Setshopprofile(res.data);
      })
      .catch(err => alert(err));
  },[])

  return (
    <Container  className='reguide-container' fluid>
    <Row className="justify-content-center align-items-center">
         <Col md={6} className='reguide-form'>
            <h4><b>ข้อมูลร้านค้า</b></h4>
            <br /><br />

            <div style={{marginLeft:140}}>
              <span>
                  <b>ชื่อร้านค้า</b> : {shopprofile.shop_name}
              </span>
              <br/>
              <span>
                  <b>รายละเอียดร้านค้า</b> : {shopprofile.shop_detail.detail}
              </span>
              <br/>
              <span>
                  <b>เวลาเปิด - ปิด</b> : {shopprofile.shop_detail.opening}
              </span>

                <div style={{ marginTop: 30 }}>
                <b>รูปภาพโปรไฟล์ร้านค้า :   <Image
                  src={`${SERVER_URL}/shop/profile_img/${shopprofile._id}/${shopprofile.profile_shop_pic}`}
                  roundedCircle
                  className='avatar'
                /> </b>
              </div>


              <div style={{marginTop:30}}>
                   <b>ติดต่อ  </b>
                   <ul style={{listStyleType:'none'}}>
                        <div style={{marginLeft:15}}>
                           <li>
                             <BsTelephoneFill size={32}/> : {shopprofile.contact.tel}
                           </li>
                           <li>
                             <MdEmail size={32}/> : {shopprofile.contact.email}
                           </li>
                           <li>
                             <FaAddressCard size={32}/> : {shopprofile.contact.address}
                           </li>
                        </div>
                   </ul>
              </div>

            { shopprofile.shop_items.length !==0 &&  <div style={{marginTop:30}}>
                   <b>รายการสินค้าที่โพส  </b>
                    {/* <Table columns={columns}  dataSource={datasource} /> */}
                    <Table style={{textAlign:'center'}} responsive  striped bordered hover >
                           <thead>
                               <th>ชื่อสินค้า</th>
                               <th>ราคาสินค้า</th>
                               <th>รูปสินค้า</th>
                               <th>ไปยังร้านค้า</th>
                           </thead>

                           <tbody>
                               {shopprofile.shop_items.map((data,i) => {
                                    return(
                                       <tr key={i}>
                                            <td>{data.item_name}</td>
                                            <td>{data.item_price}</td>
                                            <td>
                                               <Image style={{ width: 100 }} src={`${SERVER_URL}/shop/post_img/${shopprofile._id}/${data.item_photo[0]}`}/>
                                            </td>
                                            <td>
                                               <Button onClick={() => {
                                                  localStorage.setItem('shop_id', shopprofile._id);
                                                  localStorage.setItem('shop_item_id', data._id);
                                                  localStorage.setItem('id_user', shopprofile.id_user);
                                                  return window.location.href = '/shopdetail';
                                               }} variant='warning'>ไปยังสินค้า</Button>
                                            </td>
                                       </tr>
                                    )
                               })}
                           </tbody>
                    </Table>
              </div>}
            </div>

        
        
            
         </Col>

    </Row>
  </Container>
  )
}
