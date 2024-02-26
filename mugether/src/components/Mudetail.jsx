import React, { useEffect, useState, useContext } from "react";
import { Muplace_Context } from "../context/MuContext";
import { Container, Row, Col, Image, Button, Badge } from "react-bootstrap";
import Reviewpage from "./Reviewpage";
import ShareButton from "./ShareButton";
import "./Mudetail.css";
import Nearby from "./Nearby";
import List_guide from "./List_guide";
import Map from "./map";
import { FaStar } from "react-icons/fa";

export default function Mudetail({showguide}) {
  const [Muplace, Setmuplace] = useState(localStorage.getItem("muplace"));
  const { per_muplace } = useContext(Muplace_Context);


  useEffect(() => {
    if (per_muplace !== "") {
      localStorage.setItem("muplace", per_muplace);
      Setmuplace(per_muplace);
    } else {
      Setmuplace(localStorage.getItem("muplace"));
    }
  }, [per_muplace]);

  const pageUrl = window.location.href;

  return (
    <Container>
      <Row>
        <Col md={12} className="header">
          <h1>{Muplace}</h1>
          <FaStar style={{ fontSize: '24px' }}/>
          
          {/* <span>{data.address}</span> */}
        </Col>
      </Row>
      <Row>
        <Col md={4} className="main-image">
          <Image
            src={`http://localhost:5353/image/mu/${Muplace}/1`}
            alt="Main Image"
            className="big-image"
            fluid
          />
          <ShareButton url={pageUrl} />
        </Col>
        <Col md={3} className="image-list">
          <Row>
            <Col md={12}>
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
      <br />
      <hr />
      <br />
      <Row>
        <Col md={11} className="review-section">
            {showguide && <List_guide/>}
        </Col>
      </Row>
      {/* <br />
      <hr />
      <br /> */}

      <Row>
          <Col>
             { !showguide&&   <Map Muplace_name={Muplace} showmap={true}/>}
          </Col>
      </Row>


      <Row>
        <Col md={11} className="review-section">
         
     { !showguide&&    <Reviewpage Muplace_name={Muplace} />}
        </Col>
      </Row>
     
      <br />
      <Row> 
        <Col md={11}>
          {!showguide&& <Nearby Muplace_name={Muplace} />}
        </Col>
      </Row>
    </Container>
  );
}
