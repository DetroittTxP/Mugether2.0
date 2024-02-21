import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Image } from 'react-bootstrap'
import swal from 'sweetalert2'
import './Guide_detail.css'

export default function Guide_detail({ username }) {
  const [guide_detail, Setguide_detail] = useState({
    photos: []
  });

  useEffect(() => {
    swal.fire({
      title: 'Loading...',
      html: 'Please wait',
      timerProgressBar: true,
      didOpen: () => {
        swal.showLoading();
      },
    })
    axios.get(`http://localhost:5353/guide/detail-guide/${username}`)
      .then(res => Setguide_detail(res.data))
      .then(() => swal.close())
      .catch(err => alert(err));
  }, [username])

  return (
    <div>
      <h2>{guide_detail.firstname} {guide_detail.lastname}</h2> <br />
      <Container>


        <Row>
          <Col md={4} className="main-image">
            <Image
              src={`http://localhost:5353/image/guide/detail/${username}/${guide_detail.photos[0]}`}
              alt="Main Image"
              className="big-image"
              fluid
            />

          </Col>
          <Col md={3} className="image-list">
            <Row>
              <Col md={12}>
                <Image
                  src={`http://localhost:5353/image/guide/detail/${username}/${guide_detail.photos[1]}`}
                  alt="Image 2"
                  className="small-image"
                  fluid
                />
              </Col>
              <Col md={12}>
                <Image
                  src={`http://localhost:5353/image/guide/detail/${username}/${guide_detail.photos[2]}`}
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
                  src={`http://localhost:5353/image/guide/detail/${username}/${guide_detail.photos[3]}`}
                  alt="Image 4"
                  className="small-image figure-3"
                  fluid
                />
              </Col>
              <Col md={12}>
                <Image
                  src={`http://localhost:5353/image/guide/detail/${username}/${guide_detail.photos[4]}`}
                  alt="Image 5"
                  className="small-image figure-4"
                  fluid
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <br />

      <div className='text'>
        <h5>{guide_detail.detail}</h5>
        <br />
        <h3>รายละเอียดกิจกรรม</h3>


      </div>

    </div>
  )
}
