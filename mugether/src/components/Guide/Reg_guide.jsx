import React, { useState, useContext,useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./Reg_guide.css";
import Swal from "sweetalert2";
import axios from "axios";
import { Select } from 'antd';
import { Muplace_Context } from "../../context/MuContext";

export default function Reg_guide() {
  const navigate = useNavigate();
  const userID = localStorage.getItem('usr_id');
  const { muplace,SERVER_URL } = useContext(Muplace_Context);
  const file = useRef(null);
  const [guide, setguidedata] = useState(
    {
      userID:userID,
      firstName: "",
      lastName: "",
      id_card: "", //รหัสบัตรปชช
      id_guide: "",
      tel:"",
      email:"",
      lineID:"",
      mu_place: [], //เลือกโลเคชั่น
      guide_type:'',
      contact:{
        lineID:'',
        facebook:'',
        ig:'',
        website:''
      }
      
    }
  )

  const [image, setImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();


    const image_form = new FormData();
    image_form.append('img-guide', image);

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
      if(res.data.status === 'duplicate'){
          return await Swal.fire({
            icon:'error',
            text:'มีการใช้ข้อมูลการสมัครไกด์ซ้ำไปเเล้ว โปรดลองใหม่อีกครั้ง'
          })
      }
      let id_user = res.data.msg._id;
      let add_image = await axios.post(`${SERVER_URL}/verify_guide/img/${userID}`, image_form)
      Swal.close();
      console.log(res.data);
      if(res.data.status === 'success'){
        await Swal.fire({
          icon: 'success',
          title: 'ขอบคุณสำหรับการสมัครไกด์ โปรดรอการติดต่อกลับจากทาง Mugether '
        })

        return window.location.href = '/'
  
      }
      else
      {
        await Swal.fire({
          icon: 'error',
          title: 'โปรดลองใหม่'
        })
  
      }
   
      setguidedata( {
        userID:userID,
        firstName: "",
        lastName: "",
        id_card: "", //รหัสบัตรปชช
        id_guide: "",
        tel:"",
        email:"",
        lineID:"",
        mu_place: [], //เลือกโลเคชั่น
        guide_type:'',
        contact:{
          lineID:'',
          facebook:'',
          ig:'',
          website:''
        }
        
      });
      setImage(null);

      if(file.current){
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

  const change3=(e) => {
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
  
  return (
    <Container className="reguide-container">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="reguide-form">
          <div className="profile-header">

          </div>
          <h2 className="head">เเบบฟอร์มสมัครไกด์ / นักรับจ้างมู🧳</h2> 
          

          <Form onSubmit={handleSubmit}>

          <Form.Group>

              <Form.Control  type="hidden" id='userID' value={userID}/>
             

              <Form.Label>โปรดเเนบรูปประจำตัวของคุณ</Form.Label>
              <Form.Control
                ref={file}
                type="file"
                accept='image/*'
                onChange={onImageChange}
                required
              />
          </Form.Group>
          

          <Form.Group controlId="guide_type">
                 <Form.Label>ประเภท (ไกด์ / นักรับจ้างมู)</Form.Label>
                 <Form.Control  as='select' onChange={Change2}>
                      <option value='guide'>ไกด์</option>
                      <option value='muler'>นักรับจ้างมู</option>
                      <option value='both' > ไกด์เเละนักรับจ้างมู</option>
                 </Form.Control>
          </Form.Group>
          
            <Form.Group controlId="firstName">
              <Form.Label>ชื่อ</Form.Label>
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
              <Form.Control
                type="text"
                placeholder="นามสกุล"
                value={guide.lastName}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="id_card">
              <Form.Label>รหัสบัตรประชาชน</Form.Label>
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
                required
              />
            </Form.Group>

            <Form.Group controlId="tel">
              <Form.Label>เบอร์โทรที่ติดต่อได้</Form.Label>
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
              <Form.Control
                type="text"
                placeholder="✉️ อีเมล"
                value={guide.email}
                onChange={Change2}
                required
              />
            </Form.Group>

            <Form.Group controlId="contact.lineID">
              <Form.Label>ไอดีไลน์ (ถ้ามี)</Form.Label>
              <Form.Control
                type="text"
                placeholder="✉️ ไอดีไลน์"
                onChange={change3}
                required
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
                  <Select.Option  key={i} value={mu_place.name}>
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
