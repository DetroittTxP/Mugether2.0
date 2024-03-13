import React, { useEffect, useState, useContext } from "react";
import { Muplace_Context } from "../../context/MuContext";
import { Container, Row, Col, Image, Button, Badge,Modal } from "react-bootstrap";
import Reviewpage from "../Reviewpage";
import ShareButton from "../layout/ShareButton";
import "./Mudetail.css";
import Nearby from "../nearby/Nearby";
import List_guide from "../Guide/List_guide";
import Map from "../util/Map";
import {Popover} from 'antd';
import { FaStar } from "react-icons/fa";

export default function Mudetail({ showguide }) {
  const [Muplace, Setmuplace] = useState(localStorage.getItem("muplace"));
  const { per_muplace } = useContext(Muplace_Context);
  const [show, setShow] = useState(false);



  useEffect(() => {
    if (per_muplace !== "") {
      localStorage.setItem("muplace", per_muplace);
      Setmuplace(per_muplace);
    } else {
      Setmuplace(localStorage.getItem("muplace"));
    }
  }, [per_muplace]);

  const detail=()=>{
      return (
         <div>
              <hr/>
              <div className="detail" style={{zIndex:0}}>
                    <h5>ถ้ำนาคาตั้งอยู่ในอุทยานแห่งชาติภูลังกา จังหวัดบึงกาฬ ถูกค้นพบเมื่อประมาณ พ.ศ. 2563 โดยกลุ่มนักท่องเที่ยวซึ่งเป็นลูกศิษย์ของพระอาจารย์วินิจ สุเมโทร จากวัดถ้ำชัยมงคล​​.</h5>
                    <br/>
                    <h5>จุดเด่นของถ้ำนี้คือลักษณะหินที่เกิดจากการกัดกร่อน มีลวดลายคล้ายเกล็ดงู ซึ่งตำนานเล่าว่าถ้ำนาคาคือพญานาคหรืองูยักษ์ที่ถูกสาปให้กลายเป็นหิน​​.</h5>
              </div>
         </div>
      )
  }
  

  const pageUrl = window.location.href;

  return (
    <Container>
      <Row className="header-row">
        <Col className="header-title">
          <h1>{Muplace}</h1>
        </Col>
        <Col xs="auto" className="share-button-col">
          <ShareButton url={pageUrl} />
        </Col>
      </Row>
      <Popover placement='bottomLeft'  content={detail} title={<h4>{Muplace}</h4>}>
      <Row >

       
        
        <Col md={5} className="main-image">
          <Image
            src={`http://localhost:5353/image/mu/${Muplace}/1`}
            alt="Main Image"
            className="big-image"
            fluid
          />
        </Col>
        <Col md={3} className="image-list" >
          <Row>
            <Col md={12} >
              <Image
                src={`http://localhost:5353/image/mu/${Muplace}/2`}
                alt="Image 2"
                className="small-image"
                fluid
              />
            </Col>
            <Col md={12}>
              <Image
                src={`http://localhost:5353/image/mu/${Muplace}/3`}
                alt="Image 3"
                className="small-image"
                fluid
              />
            </Col>
          </Row>
        </Col>
        <Col md={3} className="image-list">
          <Row>
            <Col md={12}>
              <Image
                src={`http://localhost:5353/image/mu/${Muplace}/4`}
                alt="Image 4"
                className="small-image figure-3"
                fluid
              />
            </Col>
            <Col md={12}>
              <Image
                src={`http://localhost:5353/image/mu/${Muplace}/5`}
                alt="Image 5"
                className="small-image figure-4"
                fluid
              />
            </Col>
          </Row>
        </Col>

      </Row>
      </Popover>
      <br />
      <hr />
      <br />
      accordion is here
      <Row>
        <Col md={11} className="review-section">
          {showguide && <List_guide />}
        </Col>
      </Row>
      {/* <br />
      <hr />
      <br /> */}

      <Row>
        <Col>
          {!showguide && <Map Muplace_name={Muplace} showmap={true} />}
        </Col>
      </Row>


      <Row>
        <Col md={11} className="review-section">

          {!showguide && <Reviewpage Muplace_name={Muplace} />}
        </Col>
      </Row>

      <br />
      <Row>
        <Col md={11} className="review-section">
          {!showguide && <Nearby Muplace_name={Muplace} />}
        </Col>
      </Row>
    </Container>
  );
}
