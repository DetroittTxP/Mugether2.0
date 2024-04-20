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
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import List_shop from "../Shop/List_shop";

export default function Mudetail({ showguide,showshop }) {
  const [Muplace, Setmuplace] = useState(localStorage.getItem("muplace"));
  const { per_muplace, muplace, SERVER_URL } = useContext(Muplace_Context);
  const [mudetail, Setmudetail] = useState(() => {
    const storedDetail = localStorage.getItem("mudetail");
    return storedDetail !== null ? storedDetail : "Mai me data";
  });
  const [video_url, Setvidourl] = useState('#')
  const [open, setOpen] = useState(false);
  const [imageinfo, Setimageinfo] = useState([{ key: '', name: '' }])
  const [index, setIndex] = useState(0);
  const updateIndex = ({ index: current }) => setIndex(current);


  useEffect(() => {
    if (muplace.length !== 0) {
      let detail = muplace.filter(data => data.name === Muplace);
      if (detail[0].place_detail !== undefined) {
        Setmudetail(detail[0].place_detail);
        localStorage.setItem("mudetail", detail[0].place_detail);
        Setvidourl(detail[0].video_url)

      } else {
        Setmudetail("Mai me data");
        localStorage.setItem("mudetail", "Mai me data");
      }
    }
  }, [Muplace, muplace, localStorage.getItem('muplace')]);

  useEffect(() => {
    if (per_muplace !== "") {
      localStorage.setItem("muplace", per_muplace);
      Setmuplace(per_muplace);
    } else {
      Setmuplace(localStorage.getItem("muplace"));
    }
  }, [per_muplace, localStorage.getItem('muplace')]);

  const pageUrl = window.location.href;

  const switchList=()=>{
      if(showguide && !showshop){
         return <List_guide/>
      }
      else if(showshop && !showguide){
        return <List_shop/>
      }
      else{
        return null;
      }
  }

  return (
    <Container>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src:`${SERVER_URL}/image/mu/${Muplace}/1`},
          { src:`${SERVER_URL}/image/mu/${Muplace}/2`},
          { src: `${SERVER_URL}/image/mu/${Muplace}/3` },
          { src:`${SERVER_URL}/image/mu/${Muplace}/4` },
          { src:`${SERVER_URL}/image/mu/${Muplace}/5` },
          { src:`${SERVER_URL}/image/mu/${Muplace}/6` },
          { src:`${SERVER_URL}/image/mu/${Muplace}/7` },
          { src:`${SERVER_URL}/image/mu/${Muplace}/8` }
        ]}
        index={index}
        on={{ view: updateIndex }}
      />

      
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
            style={{ cursor: 'pointer'}}
            onClick={() =>  setOpen(true)}
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
                style={{ cursor: 'pointer'}}
                src={`${SERVER_URL}/image/mu/${Muplace}/2`}
                alt="Image 2"
                className="small-image"
                fluid
                onClick={() =>  setOpen(true)}
              />
            </Col>
            <Col md={12}>
              <Image
                style={{ cursor: 'pointer'}}
                src={`${SERVER_URL}/image/mu/${Muplace}/3`}
                alt="Image 3"
                className="small-image"
                fluid
                onClick={() =>  setOpen(true)}
              />
            </Col>
          </Row>
        </Col>
        <Col md={3} className="image-list">
          <Row>
            <Col md={12}>
              <Image
                style={{ cursor: 'pointer'}}
                src={`${SERVER_URL}/image/mu/${Muplace}/4`}
                alt="Image 4"
                className="small-image figure-3"
                fluid
                onClick={() =>  setOpen(true)}
              />
            </Col>
            <Col md={12}>
              <Image
                src={`${SERVER_URL}/image/mu/${Muplace}/5`}
                alt="Image 5"
                className="small-image figure-4"
                fluid
                onClick={() =>  setOpen(true)}
                style={{ cursor: 'pointer'}}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <br />
      <hr />
      <br />
      {!showguide && !showshop&&  <Accordion>
        <AccordionSummary expandIcon={<ArrowDropDown />}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <h2><b>ประวัติความเป็นมา</b></h2>
        </AccordionSummary>

        <AccordionDetails>
          <div className="detail" style={{ zIndex: 0 }}>
            <h5>{mudetail}</h5>
          </div>

          <br />
          <h2><b>วิดีโอของสถานที่มู</b></h2>
          <div className="Video">
            <br />

            {video_url !== '#' && <ReactPlayer url={(video_url || '#')} style={{ maxWidth: '100%', height: 'auto' }} />}
          </div>
          <br />
        </AccordionDetails>
      </Accordion>}

      <br />
      <Row>
        <Col md={11} className="review-section">
          {switchList()}
        </Col>
      </Row>

      <Row>
        <Col>
          {!showguide && !showshop&& <Map Muplace_name={Muplace} showmap={true} />}
        </Col>
      </Row>

      <br />

      <Row>
        <Col md={11} className="review-section">
          {!showguide && !showshop&&  <Nearby Muplace_name={Muplace} />}
        </Col>
      </Row>
      <br />

      <Row>
        <Col md={11} className="review-section">
          {!showguide && !showshop&&  <Reviewpage Muplace_name={Muplace} />}
        </Col>
      </Row>

    </Container>
  );
}