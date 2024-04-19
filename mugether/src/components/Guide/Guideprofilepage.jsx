import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import './Reg_guide.css'
import { Muplace_Context } from '../../context/MuContext';
import { LineIcon,FacebookIcon } from 'react-share'

export default function Guideprofilepage() {
  const { SERVER_URL } = useContext(Muplace_Context);
  const usrid = localStorage.getItem('usr_id');
  const [guideprofile, setguideprofile] = useState({
    firstname: '',
    lastname: '',
    contact: {
      tel: '',
      email: '',
      lineID: ''
    },
    profile_pic: '',
    guide_post: [],
    info:{
        dob:'',
        gender:'',
        detail:'',
    },
    guide_type:''
  });

  const calbirth = (birthDate) =>{
    const today = new Date();
    const birth = new Date(birthDate);
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  const lineIcon = <LineIcon className='share-icon' href='https://qr-official.line.me/sid/L/026gkuxb.png' size={32} round={true} />

  useEffect(() => {


    axios.get(`${SERVER_URL}/guide_detail/guide/profile/${usrid}`)
      .then(res => setguideprofile(res.data))
      .catch(err => alert(err));
  }, [])


  const gotopost=(muplace,showguide = true)=>{
      localStorage.setItem('showguide',showguide);
      localStorage.setItem('muplace',muplace);

      return window.location.href = '/mudetail';
}

  return (
    <Container  className='reguide-container' fluid>
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="reguide-form">
          <h4>
          <b>
            ข้อมูลไกด์ของท่าน
          </b>
          </h4>
          
          <br /><br />

          <div style={{ marginLeft: 140 }}>
            <span>  <b>ชื่อ - สกุล</b>:  {guideprofile.firstname || null} - {guideprofile.lastname || null}</span>
            <br/>
            <span><b>วันเกิด</b> : {guideprofile.info ? guideprofile.info.dob : null}</span>
            <br/>
            <span><b>เพศ</b> : {guideprofile.info ? guideprofile.info. gender : null}</span>
            <br/>
            <span><b>อายุ</b> : {guideprofile.info ? calbirth(guideprofile.info.dob) : null} ปี</span>
            <br/>
            <span><b>ประเภท</b> : {guideprofile.guide_type}</span>

            <div style={{ marginTop: 30 }}>
              <b>รูปภาพโปรไฟล์ :   <Image
                src={`${SERVER_URL}/image/guide/profile/${guideprofile.id_guide || null}/${guideprofile.profile_pic || null}`}
                roundedCircle
                className='avatar'
              /> </b>
            </div>

            <div style={{ marginTop: 30 }}>
              <span> <b>ข้อมูลส่วนตัว</b> :  {guideprofile.info ? guideprofile.info.detail : null}  </span>
            </div>

            <div style={{ marginTop: 30 }}>
              <b>ติดต่อ  </b>
              <ul style={{ listStyleType: 'none' }}>
                <div style={{ marginLeft: 15 }}>
                  <li>
                    <b>เบอร์โทร</b> : {guideprofile.contact.tel || null}
                  </li>
                  <li>
                    <b>อีเมล</b> : {guideprofile.contact.email || null}
                  </li>
                  {guideprofile.contact.lineID && <li>
                    {lineIcon}  : {guideprofile.contact.lineID || null}
                  </li>}
                  {guideprofile.contact.facebook && <li>
                    {<FacebookIcon/>}  : {guideprofile.contact.facebook || null}
                  </li>}
                  
                </div>

              </ul>
            </div>
            <div style={{ marginTop: 30 }}>
             {guideprofile.guide_post.length !== 0 &&  <b>โพสทั้งหมด  </b>}

              <Container fluid>
                <Row>
                  {guideprofile.guide_post.map((post) => (
                    <Col key={post.id} md={4} sm={6} xs={12}>
                      <Card>
                        <Card.Header style={{ maxHeight: '2em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {post.muplace}
                        </Card.Header>
                        <Card.Body>
                          <Card.Img style={{ width: '100%', height: '250px', objectFit: 'cover' }} src={`${SERVER_URL}/image/guide/detail/${guideprofile.id_guide}/${post.postPhotos[0]}`} alt={post.muplace} />
                          <Card.Footer style={{display:'flex',justifyContent:'center'}}>
                            <Button onClick={() => gotopost(post.muplace)} variant='warning'>ไปยังโพส</Button>
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                      <br /><br/>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
          </div>

        </Col>

      </Row>
    </Container>


  )
}
