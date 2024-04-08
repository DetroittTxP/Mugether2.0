import React, { useEffect, useState,useContext } from 'react'
import { Row, Col, Container, Image,Carousel } from 'react-bootstrap'
import './Guide_detail.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Muplace_Context } from '../../context/MuContext';
import ReviewGuide from './ReviewGuide';


export default function Guide_detail({contact, data }) {


  const muplace = localStorage.getItem('muplace');
  const [newdata,Setnewdata] = useState(data);
  const {SERVER_URL} = useContext(Muplace_Context)
  const [contactt,Setcontactt] = useState({
     tel:'',
     email:''
  })
  useEffect(() => {

    let newdata = {
          firstname:data.firstname,
          lastname:data.lastname,
          // email:data.eamil,
          guide_post:data.guide_post.filter((e) => e.muplace === muplace)
    }
    Setnewdata(newdata);

    Setcontactt(contact)
  },[])

  
  return (
    <div>
      <h2><b>{data.firstname} {data.lastname}</b></h2> <br />
      
      <Container>


        

        <Row>
          <Col md={5} className="main-image">
            <Image
              onClick={() => console.log(data.id_guide)}
              src={`${SERVER_URL}/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[0]}`}
              alt="Main Image"
              className="big-image"
              fluid
            />

          </Col>
           <Col md={3} className="image-list">
            <Row>
              <Col md={12}>
                <Image
                  src={`${SERVER_URL}/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[1]}`}
                  alt="Image 2"
                  className="small-image"
                  fluid
                />
              </Col>
              
              <Col md={12}>
                <Image
                  src={`${SERVER_URL}/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[2]}`}
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
                  src={`${SERVER_URL}/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[3]}`}
                  alt="Image 4"
                  className="small-image figure-3"
                  fluid
                />
              </Col>
              <Col md={12}>
                <Image
                  src={`${SERVER_URL}/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[4]}`}
                  alt="Image 4"
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
        <h5>{newdata.guide_post[0].postDetail}</h5>
        <br />
        <h2><b>รายละเอียดกิจกรรม</b></h2>
        <br/>
        <ul>

      
        {newdata.guide_post[0].postActivity.map((data,i) =>{
            return (
                <li>
                    <h5>{data}</h5>
                </li>
            )
        })}
        </ul>
        <br/>
        <h2><b>ประสบการณ์ (Experience)</b></h2>    <br/>
        <Col md={6} style={{marginLeft: "300px"}}>
          <Carousel indicators controls>
            {newdata.guide_post[0].experience_img.map((image, index) => (
              <Carousel.Item key={index}>
                <Image
                  className="d-block w-100"
                  rounded
                  src={`${SERVER_URL}/guide_detail/exp/img/${data.id_guide}/${image}`}
                  alt={`Product image ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        
        <br/>    <br/>
        <h2><b>ติดต่อ</b></h2>
          <h3>เบอร์โทร: {contactt.tel} </h3>
          <h3>อีเมลล์: {contactt.email} </h3>

        <br/>

                <h2><b>รีวิว</b></h2> 
                  
                  <ReviewGuide postID={newdata.guide_post[0]._id} reviewdata2={newdata.guide_post[0].postReview} guideID={data.id_guide} reviewdata={data.guide_review}/>
       

      </div>
           

    </div>
  )
}
