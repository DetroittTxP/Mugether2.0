import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Image } from 'react-bootstrap'
import swal from 'sweetalert2'
import './Guide_detail.css'

export default function Guide_detail({ data }) {
 const muplace = localStorage.getItem('muplace');
 const [newdata,Setnewdata] = useState(data);
 
  console.log(data);
  useEffect(() => {

    let newdata = {
          firstname:data.firstname,
          lastname:data.lastname,
          guide_post:data.guide_post.filter((e) => e.muplace === muplace)
    }
    Setnewdata(newdata);
  },[])
  return (
    <div>
      <h2>{data.firstname} {data.lastname}</h2> <br />
      <Container>


        

        <Row>
          <Col md={4} className="main-image">
            <Image
              src={`http://localhost:5353/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[0]}`}
              alt="Main Image"
              className="big-image"
              fluid
            />

          </Col>
           <Col md={3} className="image-list">
            <Row>
              <Col md={12}>
                <Image
                  src={`http://localhost:5353/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[1]}`}
                  alt="Image 2"
                  className="small-image"
                  fluid
                />
              </Col>
              <Col md={12}>
                <Image
                  src={`http://localhost:5353/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[2]}`}
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
                  src={`http://localhost:5353/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[3]}`}
                  alt="Image 4"
                  className="small-image figure-3"
                  fluid
                />
              </Col>
            </Row>
          </Col> 
        </Row>
      </Container>

      <br />

      <div className='text'>
        <h5>{newdata.guide_post[0].postDetail}</h5>
        <br />
        <h3>รายละเอียดกิจกรรม</h3>


      </div>

    </div>
  )
}
