import React, { useState, useContext, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton, LineShareButton, FacebookIcon, TwitterIcon, LineIcon, VKShareButton, VKIcon } from 'react-share';

import "bootstrap/dist/css/bootstrap.min.css";
import "./Reg_guide.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Select } from 'antd';
import { Muplace_Context } from "../../context/MuContext";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Muexampleimage from '../../assets/muexampleid.jpg'



export default function Reg_guide() {

  const [open, setOpen] = useState(false);
  const [imageinfo, Setimageinfo] = useState([{ key: '', name: '' }])
  const [index, setIndex] = useState(0);
  const updateIndex = ({ index: current }) => setIndex(current);


  const navigate = useNavigate();
  const userID = localStorage.getItem('usr_id');
  const { muplace, SERVER_URL } = useContext(Muplace_Context);
  const file = useRef(null);

  const [guide, setguidedata] = useState(
    {
      userID: userID,
      info: {
        detail: '',
        gender: 'male',
        dob: '',
      },
      firstName: "",
      lastName: "",
      id_card: "",
      id_guide: "",
      tel: "",
      email: "",
      lineID: "",
      mu_place: [],
      guide_type: 'guide',
      contact: {
        lineID: '',
        facebook: '',
        ig: '',
        website: '',
      }
    }
  )

  const [image, setImage] = useState(null);
  const [id_card_img, Setidcardimg] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();


    const image_form = new FormData();
    image_form.append('img-guide', image);

    const image_id_card_form = new FormData();
    image_id_card_form.append('img-id_card', id_card_img);

    try {
      Swal.fire({
        title: 'กำลังโหลด...',
        html: 'โปรดรอ',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      })

      let res = await axios.post(`${SERVER_URL}/verify_guide/info`, { guide })
      console.log(res.data);
      if (res.data.status === 'duplicate') {
        return await Swal.fire({
          icon: 'error',
          text: 'มีการใช้ข้อมูลการสมัครไกด์ซ้ำไปเเล้ว โปรดลองใหม่อีกครั้ง'
        })
      }
      let id_user = res.data.msg._id;
      let add_image = await axios.post(`${SERVER_URL}/verify_guide/img/${userID}`, image_form)
      let add_image_idcard = await axios.post(`${SERVER_URL}/verify_guide/img/id_card/${userID}`, image_id_card_form);
      console.log(add_image_idcard.data);
      if (add_image.data.status === 'error' || add_image_idcard.data.status === 'error') {
        return alert('error uploding images');
      }

      Swal.close();
      console.log(res.data);
      if (res.data.status === 'success') {
        await Swal.fire({
          icon: 'success',
          title: 'ขอบคุณสำหรับการสมัครไกด์ โปรดรอการติดต่อกลับจากทาง Mugether '
        })

        return window.location.href = '/'

      }
      else {
        console.log(res.data);
        return Swal.fire({
          icon: 'error',
          title: 'โปรดลองใหม่'

        })


      }

      setguidedata({
        userID: userID,
        firstName: "",
        lastName: "",
        id_card: "", //รหัสบัตรปชช
        id_guide: "",
        tel: "",
        email: "",
        lineID: "",
        mu_place: [], //เลือกโลเคชั่น
        guide_type: '',
        contact: {
          lineID: '',
          facebook: '',
          ig: '',
          website: ''
        }

      });
      setImage(null);

      if (file.current) {
        file.current.value = '';
      }


    }
    catch (err) {
      Swal.fire({
        title: "Error พบข้อผิดพลาด",
        text: err,
        icon: 'error'
      });
    }
  }

  const Change2 = (event1) => {
    setguidedata((e) => {

      return {
        ...e,
        [event1.target.id]: event1.target.value

      }
    }
    )
  }

  const change3 = (e) => {
    const { id, value } = e.target;
    let keys = id.split('.');

    setguidedata((currentState) => {
      let newState = { ...currentState };
      let tempState = newState;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          tempState[key] = value;
        } else {
          if (!tempState[key]) tempState[key] = {};
          tempState = tempState[key];
        }
      });

      return newState;
    });
  }

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
  }

  const onIdcardImageChange = (e) => {
    Setidcardimg(e.target.files[0]);
  }

  return (
    <Container className="reguide-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="reguide-form">
          <div className="profile-header">

            <Lightbox
              open={open}
              close={() => setOpen(false)}
              slides={[
                { src: Muexampleimage },
              ]}
              index={index}
              on={{ view: updateIndex }}
            />

          </div>
          <h2 className="head">เเบบฟอร์มสมัครไกด์ / นักรับจ้างมู🧳</h2>


          <Form onSubmit={handleSubmit}>

            <Form.Group>

              <Form.Control type="hidden" id='userID' value={userID} />


              <Form.Label>โปรดเเนบรูปประจำตัวของคุณ (ยืนถ่ายเห็นหน้าคนสมัคร) <a href="#" onClick={() => setOpen(true)}>ตัวอย่าง</a> </Form.Label>
              <Form.Label style={{ color: 'red' }}>**</Form.Label>
              <Form.Control
                ref={file}
                accept='image/*'
                onChange={onImageChange}
                type="file"
                required
              />
            </Form.Group>

            <Form.Group>




              <Form.Label>โปรดเเนบสำเนาประจำตัวประชาชน </Form.Label>
              <Form.Label style={{ color: 'red' }}>**</Form.Label>
              <Form.Control
                ref={file}
                type="file"
                accept='image/*'
                onChange={onIdcardImageChange}
                required
              />
            </Form.Group>




            <Form.Group controlId="guide_type">
              <Form.Label>ประเภท (ไกด์ / นักรับจ้างมู)</Form.Label>
              <Form.Control as='select' onChange={Change2}>
                <option value='guide'>ไกด์</option>
                <option value='muler'>นักรับจ้างมู</option>
                <option value='both' > ไกด์เเละนักรับจ้างมู</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="firstName">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Label style={{ color: 'red' }}>**</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อ"
                value={guide.firstName}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Label style={{ color: 'red' }}>**</Form.Label>
              <Form.Control
                type="text"
                placeholder="นามสกุล"
                value={guide.lastName}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="info.gender">
              <Form.Label>เพศ</Form.Label>
              <Form.Control as='select' onChange={change3}>
                <option value='male'>ชาย</option>
                <option value='female'>หญิง</option>
                <option value='notprefer' > ไม่ระบุ</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId="info.dob">
              <Form.Label>เดือน / วัน / เกิด</Form.Label>
              <Form.Label style={{ color: 'red' }}>**</Form.Label>
              <Form.Control
                style={{ width: 200 }}
                type="date"
                placeholder="นามสกุล"
                onChange={change3}
                required
              />
            </Form.Group>

            <Form.Group controlId="info.detail">
              <Form.Label>ประวัติเเนะนำตัวเอง </Form.Label>
              <Form.Control placeholder="เเนะนำตัวเอง เช่น จบจากที่ใด" onChange={change3} as="textarea" rows={4} />
            </Form.Group>


            <Form.Group controlId="id_card">
              <Form.Label>รหัสบัตรประชาชน</Form.Label>
              <Form.Label style={{ color: 'red' }}>**</Form.Label>
              <Form.Control
                type="text"
                placeholder="🪪 เลขบัตรประชาชน"
                value={guide.id_card}
                pattern="[0-9]{13}"
                onChange={Change2}
                title="รหัสบัตรประชาชนต้องประกอบด้วยตัวเลข 13 หลัก"
                required
              />
            </Form.Group>

            <Form.Group controlId="id_guide">
              <Form.Label>รหัสไกด์</Form.Label>
              <Form.Control
                type="text"
                placeholder="🪪 เลขรหัสไกด์/มัคคุเทศก์"
                value={guide.id_guide}
                onChange={Change2}
              />
            </Form.Group>

            <Form.Group controlId="tel">
              <Form.Label>เบอร์โทรที่ติดต่อได้</Form.Label>
              <Form.Label style={{ color: 'red' }}>**</Form.Label>
              <Form.Control
                type="text"
                placeholder="☎️ หมายเลขโทรศัพท์ เช่น 08x-xxx-xxxx"
                value={guide.tel}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>อีเมลที่ติดต่อได้</Form.Label>
              <Form.Label style={{ color: 'red' }}>**</Form.Label>
              <Form.Control
                type="text"
                placeholder="✉️ อีเมล"
                value={guide.email}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="contact.lineID">
              <Form.Label style={{ marginTop: 10 }}> <LineIcon size={32} round={true} /> ไอดีไลน์ (ถ้ามี)</Form.Label>
              <Form.Control
                type="text"
                placeholder="✉️ ไอดีไลน์"
                onChange={change3}

              />
            </Form.Group>

            <Form.Group controlId="contact.facebook">
              <Form.Label style={{ marginTop: 10 }}> <FacebookIcon size={32} round={true} /> เฟสบุ๊ค (ถ้ามี)  </Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อ หรือ ลิงค์"
                onChange={change3}

              />
            </Form.Group>

            <Form.Group controlId="contact.ig">
              <Form.Label>อินสตราเเกรม (ถ้ามี)</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อไอจี"
                onChange={change3}

              />
            </Form.Group>

            <Form.Group controlId="contact.website">

              <Form.Label>เว็บไซต์ของท่าน (ถ้ามี)</Form.Label>
              <Form.Control
                type="text"
                placeholder="ลิงค์"
                onChange={change3}
              />
            </Form.Group>

            <Form.Group controlId="muplace" >
              <Form.Label>สถานที่สะดวก</Form.Label>
              <Select
                mode="multiple"

                showSearch
                style={{ width: '100%' }}
                placeholder="🗺️ โปรดเลือกสถานที่พาไปมู"
                optionFilterProp="children"
                value={guide.mu_place}
                onChange={(values) => {

                  setguidedata(prevState => ({
                    ...prevState,
                    mu_place: values,
                  }));
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {muplace.map((mu_place, i) => (
                  <Select.Option key={i} value={mu_place.name}>
                    {mu_place.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Group>
            <br />

            <Button variant="warning" type="submit" >
              สมัคร
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
