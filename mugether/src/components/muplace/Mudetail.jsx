import React, { useEffect, useState, useContext } from "react";
import { Muplace_Context } from "../../context/MuContext";
import { Container, Row, Col, Image, Button, Badge, Modal } from "react-bootstrap";
import Reviewpage from "../Reviewpage";
import ShareButton from "../layout/ShareButton";
import "./Mudetail.css";
import Nearby from "../nearby/Nearby";
import List_guide from "../Guide/List_guide";
import Map from "../util/Map";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import ReactPlayer from 'react-player'

export default function Mudetail({ showguide }) {
  const [Muplace, Setmuplace] = useState(localStorage.getItem("muplace"));
  const { per_muplace, muplace,SERVER_URL } = useContext(Muplace_Context);
  const [mudetail, Setmudetail] = useState(() => {
    const storedDetail = localStorage.getItem("mudetail");
    return storedDetail !== null ? storedDetail : "Mai me data";
  });
  const [video_url,Setvidourl] = useState('#')
 

 
  useEffect(() =>{
    if(muplace.length !== 0){
      let detail = muplace.filter(data => data.name === Muplace);
      if (detail[0].place_detail !== undefined) {
        Setmudetail(detail[0].place_detail);
        localStorage.setItem("mudetail", detail[0].place_detail);
        Setvidourl(detail[0].video_url)

      }else{
        Setmudetail("Mai me data"); 
        localStorage.setItem("mudetail", "Mai me data");
      }
    }
  },[Muplace, muplace,localStorage.getItem('muplace')]);

  useEffect(() => {
    if (per_muplace !== "") {
      localStorage.setItem("muplace", per_muplace);
      Setmuplace(per_muplace);
    } else {
      Setmuplace(localStorage.getItem("muplace"));
    }
  }, [per_muplace,localStorage.getItem('muplace')]);

  const pageUrl = window.location.href;

  return (
    <Container>
      <Row className="header-row">
        <Col className="header-title">
          <h1><b>{Muplace}</b></h1>
        </Col>
        <Col xs="auto" className="share-button-col">
          
          <ShareButton url={pageUrl} />
        </Col>
      </Row>

      <Row>
        <Col md={5} className="main-image">
          <Image
            src={`${SERVER_URL}/image/mu/${Muplace}/1`}
            alt="Main Image"
            className="big-image"
            fluid
          />
        </Col>
        <Col md={3} className="image-list" >
          <Row>
            <Col md={12} >
              <Image
                src={`${SERVER_URL}/image/mu/${Muplace}/2`}
                alt="Image 2"
                className="small-image"
                fluid
              />
            </Col>
            <Col md={12}>
              <Image
                src={`${SERVER_URL}/image/mu/${Muplace}/3`}
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
                src={`${SERVER_URL}/image/mu/${Muplace}/4`}
                alt="Image 4"
                className="small-image figure-3"
                fluid
              />
            </Col>
            <Col md={12}>
              <Image
                src={`${SERVER_URL}/image/mu/${Muplace}/5`}
                alt="Image 5"
                className="small-image figure-4"
                fluid
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <br />
      <hr />
      <br />
      {!showguide && <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDown />}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <h2><b>ประวัติความเป็นมา</b></h2>
        </AccordionSummary>
        <br/>
        <AccordionDetails>
          <div className="detail" style={{ zIndex: 0 }}>
            <h5>{mudetail}</h5>
          </div>

          <div>
            <br/>
            <h2><b>วิดีโอของสถานที่มู</b></h2>
          </div>
          <div className="Video">
             { video_url !== '#' &&  <ReactPlayer url={(video_url || '#')} />}
          </div>
          <br/>
        </AccordionDetails>
      </Accordion>}

      <br />
      <Row>
        <Col md={11} className="review-section">
          {showguide && <List_guide />}
        </Col>
      </Row>

      <Row>
        <Col>
          {!showguide && <Map Muplace_name={Muplace} showmap={true} />}
        </Col>
      </Row>

      <br />
     
      <Row>
        <Col md={11} className="review-section">
          {!showguide && <Nearby Muplace_name={Muplace} />}
        </Col>
      </Row>
      <br />

      <Row>
        <Col md={11} className="review-section">
          {!showguide && <Reviewpage Muplace_name={Muplace} />}
        </Col>
      </Row>

    </Container>
  );
}