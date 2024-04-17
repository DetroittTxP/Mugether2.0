import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Image, Button,Card } from 'react-bootstrap';
import axios from 'axios';
import './Reg_guide.css'
import { Muplace_Context } from '../../context/MuContext';
import { LineIcon } from 'react-share'

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
    guide_post:[]
  });

  const lineIcon = <LineIcon className='share-icon' href='https://qr-official.line.me/sid/L/026gkuxb.png' size={32} round={true} />

  useEffect(() => {


    axios.get(`${SERVER_URL}/guide_detail/guide/profile/${usrid}`)
      .then(res => setguideprofile(res.data))
      .catch(err => alert(err));
  }, [])


  // stop here continue tomorrow
  const posts = [
    {
      id: 1,
      title: 'โพสต์ที่ 1',
      content: 'เนื้อหาโพสต์ที่ 1',
      createdAt: '2024-04-17',
    },
    {
      id: 2,
      title: 'โพสต์ที่ 2',
      content: 'เนื้อหาโพสต์ที่ 2',
      createdAt: '2024-04-16',
    },
    // เพิ่มโพสต์เพิ่มเติม...
  ];


  return (

    <Container className='reguide-container' fluid>
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="reguide-form">
          <label>
            ข้อมูลไกด์ของท่าน
          </label>
          <br /><br />

          <div style={{ marginLeft: 140 }}>
            <span>ชื่อ - สกุล :  {guideprofile.firstname || null} - {guideprofile.lastname || null}</span>

            <div style={{ marginTop: 30 }}>
              <span>รูปภาพโปรไฟล์ :   <Image
                src={`${SERVER_URL}/image/guide/profile/${guideprofile.id_guide || null}/${guideprofile.profile_pic || null}`}
                roundedCircle
                className='avatar'
              /> </span>
            </div>

            <div style={{ marginTop: 30 }}>
              <span>ติดต่อ  </span>
              <ul style={{ listStyleType: 'none' }}>
                <div style={{ marginLeft: 15 }}>
                  <li>
                    เบอร์โทร : {guideprofile.contact.tel || null}
                  </li>
                  <li>
                    อีเมล : {guideprofile.contact.email || null}
                  </li>
                  {guideprofile.contact.lineID && <li>
                    {lineIcon}  : {guideprofile.contact.lineID || null}
                  </li>}
                </div>

              </ul>
            </div>

            <div style={{ marginTop: 30 }}>
              <span>โพสทั้งหมด  </span>
                
                <Container>

             
                <br/>
                <Row>
                  {guideprofile.guide_post.map((post) => (
                    <>
                    <Col key={post.id} md={4}>
                      <Card>
                        <Card.Header style={{ maxHeight: '2em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.muplace}</Card.Header>
                        <Card.Body>
                          <Card.Img  style={{ objectFit: 'cover', width: 290, height: 250 }} src={`${SERVER_URL}/image/guide/detail/${guideprofile.id_guide}/${post.postPhotos[0]}`} /> 
                               
                   
                          <Card.Footer>
                            <Button variant='warning'>ไปยังโพส</Button>
                          </Card.Footer>
                        </Card.Body>
                      </Card>
                      <br/>
                      <br/>
                      
                    </Col>
                   
                    </>
                  ))}
                </Row>
                </Container>
            </div>



          </div>
          {/* <Col >
                          <Button variant='warning'>เเก้ไข</Button>
                     </Col> */}
        </Col>

      </Row>
    </Container>


  )
}
