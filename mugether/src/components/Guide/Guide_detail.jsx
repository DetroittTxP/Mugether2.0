import React, { useEffect, useState, useContext } from 'react'
import { Row, Col, Container, Image, Carousel } from 'react-bootstrap'
import './Guide_detail.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Muplace_Context } from '../../context/MuContext';
import ReviewGuide from './ReviewGuide';
import { LineIcon ,FacebookIcon } from 'react-share'
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


export default function Guide_detail({ profile_name, contact, data, detailImg,guide_type }) {

  const [open, setOpen] = useState(false);
  const [imageinfo, Setimageinfo] = useState([{ key: '', name: '' }])
  const [index, setIndex] = useState(0);
  const updateIndex = ({ index: current }) => setIndex(current);

  const muplace = localStorage.getItem('muplace');
  const [newdata, Setnewdata] = useState(data);
  const { SERVER_URL } = useContext(Muplace_Context)
  const [detailImg1,Setdetailimg] = useState([]);
  const lineIcon = <LineIcon className='share-icon' href='https://qr-official.line.me/sid/L/026gkuxb.png' size={32} round={true} />
  const [contactt, Setcontactt] = useState({
      tel: '',
      email: ''
  })
  console.log(newdata);
  useEffect(() => {
    const filteredData = {
        firstname: data.firstname,
        lastname: data.lastname,
        guide_post: data.guide_post.filter((e) => e.muplace === localStorage.getItem('muplace'))
    };
    Setnewdata(filteredData);
}, [data]);


const switchExp=()=>{
   switch(guide_type){
       case 'guide':
          return "รูปประสบการณ์ (Experience)"
       case 'muler':
          return "รูปตัวอย่างการรับจ้างมู"      
       default:
         return "รูปประสบการณ์ (Experience) / รูปตัวอย่างการรับจ้างมู"
   }
}


  return (
    <div>
      <h2><b>{data.firstname} {data.lastname}</b></h2> <br />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: `${SERVER_URL}/image/guide/detail/${imageinfo.key}/${newdata.guide_post[0].postPhotos[0]}` },
          { src: `${SERVER_URL}/image/guide/detail/${imageinfo.key}/${newdata.guide_post[0].postPhotos[1]}` },
          { src: `${SERVER_URL}/image/guide/detail/${imageinfo.key}/${newdata.guide_post[0].postPhotos[2]}` },
          { src: `${SERVER_URL}/image/guide/detail/${imageinfo.key}/${newdata.guide_post[0].postPhotos[3]}` },
          { src: `${SERVER_URL}/image/guide/detail/${imageinfo.key}/${newdata.guide_post[0].postPhotos[4]}` },
        ]}
        index={index}
        on={{ view: updateIndex }}
      />

      <Container>
        <Row>
          <Col md={5} className="main-image">
            <Image
              onClick={() => {
                setOpen(true)
                Setimageinfo({
                  key: data.id_guide,
                  name: newdata.guide_post[0].postPhotos[0]
                })
              }}
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
                  onClick={() => {
                    setOpen(true)
                    Setimageinfo({
                      key: data.id_guide,
                      name: newdata.guide_post[0].postPhotos[1]
                    })
                  }}
                  src={`${SERVER_URL}/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[1]}`}
                  alt="Image 2"
                  className="small-image"
                  fluid
                />
              </Col>

              <Col md={12}>
                <Image
                  onClick={() => {
                    setOpen(true)
                    Setimageinfo({
                      key: data.id_guide,
                      name: newdata.guide_post[0].postPhotos[2]
                    })
                  }}
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
                  onClick={() => {
                    setOpen(true)
                    Setimageinfo({
                      key: data.id_guide,
                      name: newdata.guide_post[0].postPhotos[3]
                    })
                  }}
                  src={`${SERVER_URL}/image/guide/detail/${data.id_guide}/${newdata.guide_post[0].postPhotos[3]}`}
                  alt="Image 4"
                  className="small-image figure-3"
                  fluid
                />
              </Col>
              <Col md={12}>
                <Image
                  onClick={() => {
                    setOpen(true)
                    Setimageinfo({
                      key: data.id_guide,
                      name: newdata.guide_post[0].postPhotos[4]
                    })
                  }}
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
        <br />
        <ul>

      
          {newdata.guide_post[0].postActivity.map((data, i) => {
            console.log(data);
            
            return data ? (<li>
              <h5>{data}</h5>
            </li>) : null
          })}
        </ul>
        <br />
        <h2><b>{switchExp()}</b></h2>    <br />
        <Col md={{ span: 6, offset: 3 }} >
          <Carousel className='picture-guidedetail' indicators controls>
            {newdata.guide_post[0].experience_img.map((image, index) => (
              <Carousel.Item key={index}>
                <Image
                  className="d-block w-100"
                  rounded
                  src={`${SERVER_URL}/guide_detail/exp/img/${data.id_guide}/${image}`}
                  alt={`Product image ${index + 1}`}
                  style={{ width: '100%' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        <br />    <br />
        <h2><b>ติดต่อ</b></h2>
        <h3><BsTelephoneFill size={32} />: {contact.tel} </h3>
        <h3><MdEmail size={32}/>: {contact.email} </h3>
       {contact.lineID && <h3>{ <LineIcon  size={32} round /> } : {contact.lineID}</h3>}
       {contact.Facebook && <h3>{ <FacebookIcon size={32} round/> } : {contact.Facebook}</h3>}
       {contact.Website && <h3>{ <CgWebsite size={32} round/> } : {contact.Website}</h3>}    

        <br />

        <h2><b>รีวิว</b></h2>

        <ReviewGuide profile_name={profile_name} postID={newdata.guide_post[0]._id} reviewdata2={newdata.guide_post[0].postReview} guideID={data.id_guide} reviewdata={data.guide_review} />


      </div>


    </div>
  )
}
