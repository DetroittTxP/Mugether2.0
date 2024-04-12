import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Button, Input } from 'antd'
import { Form, Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ButtonBo from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';
import { Muplace_Context } from '../../context/MuContext';
import ButtonBoot from 'react-bootstrap/Button'
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

import './Reviewguide.css';

const Add_Review = ({ updatestate, reviewdata, check_finish, guideID, updatereview, postID }) => {
  const { SERVER_URL } = useContext(Muplace_Context)
  const username = localStorage.getItem('usr')
  const [review, Setreview] = useState({
    review: {
      username: localStorage.getItem('usr'),
      score: 0,
      detail: '',
    }
  });
  const [image, Setimage] = useState(null);
  const [imgsrc, Setimagesrc] = useState([]);

  const change = (e, newvalue) => {

    let value = e.target.value;

    if (e.target.name === 'score') {
      value = newvalue

    }
    

    Setreview(prevReview => ({
      ...prevReview,
      review: {
        ...prevReview.review,
        [e.target.name]: value,
      }
    }));
  }

  const onimage = async (event) => {
    const files = Array.from(event.target.files);

    if (files.length === 0 || files.length > 5) {
      return;
    }

    if (files.length > 5) {
      return alert('ต้องไม่เกิน 5 รูป')
    }

    Setimage(files)

    files.forEach(img => {
      const reader = new FileReader();

      reader.onload = (load) => {
        const url = load.target.result;
        Setimagesrc(prev => [...prev, url]);
      }

      reader.readAsDataURL(img);
    })
  }



  const onSubmit = async (e) => {
    e.preventDefault();
    if (review.score <= 0 || review.score === null) {
      return alert('rating must > 0')
    }



    // Swal.fire({
    //   title: 'Loading...',
    //   html: 'Please wait',
    //   timerProgressBar: true,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // })


    await Swal.fire({
      title:'ยืนยันการรีวิว',
      icon:'question',
      html:'ไม่สามารถเเก้ไขการรีวิวได้หลังจากกดยืนยัน',
      showConfirmButton:true,
      confirmButtonText:'ยืนยัน',
      showCancelButton:true,
      cancelButtonText:'ยกเลิก',
      confirmButtonColor:'orange'
    })
    .then(async res => {
        if(!res.isConfirmed)return;

       
    const formData = new FormData();


    try {

      let imagedata = null;
      if (image && username) {
        //api upload / review / image

        for (let i = 0; i < image.length; i++) {
          formData.append('reviewImg', image[i]);
        }
        let uplaodimage = await axios.post(`${SERVER_URL}/guide_detail/review/upload/${guideID}`, formData).catch(err => console.log(err));
        console.log(uplaodimage.data);
        imagedata = uplaodimage.data.photos
      }
      let res = await axios.post(`${SERVER_URL}/guide_detail/review/${guideID}/${postID}`, { review: review.review, imagedata });
      Swal.close();
      await Swal.fire({
        icon: 'success',
        title: "เพิ่มรีวิวเรียบร้อย",
        confirmButtonText: "กลับไปยังหน้า รีวิว",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        confirmButtonColor:'orange'
      })
        .then(result => {
          if (result.isConfirmed) {
            check_finish(false)
            return window.location.reload();

          }

        });
  
    }
    catch (err) {
      alert(err)
    }

    })

  }



  return (
    <div className='form-addreview'>

      <div>
        <Form onSubmit={onSubmit}>

          <Form.Group className='mb-3' controlId='reviewImg'>
            <Form.Label><b style={{ fontSize: 20 }}>เพิ่มรูปประกอบการรีวิว (ไม่เกิน 5 รูป)</b> </Form.Label>
            <Form.Control onChange={onimage} multiple accept='image/*' type='file' rows={4} cols={100} />
          </Form.Group>

          {imgsrc.length !== 0 &&
            <Carousel indicators controls>
              {imgsrc.map(img => (
                <Carousel.Item>
                  <Image className="d-block w-100" src={img} />
                </Carousel.Item>
              ))}
            </Carousel>

          }

          <b style={{ fontSize: 20 }}>โปรดให้คะเเนน</b> <br />

          <Rating
            id='score'
            name="score"
            style={{ fontSize: 40 }}
            onChange={change}
          />

          <Form.Group className="mb-3" controlId="detail" >
            <Form.Label><b style={{ fontSize: 20 }}>คำอธิบาย</b> </Form.Label>
            <Form.Control name='detail' onChange={change} as="textarea" rows={4} cols={100} />

          </Form.Group>


          <ButtonBo variant='warning' type='submit'>เพิ่มรีวิว</ButtonBo>
          <br />  <br />

        </Form>

      </div>
    </div>

  )
}


export default function ReviewGuide({ profile_name,reviewdata2, reviewdata, guideID, postID }) {

  const { SERVER_URL } = useContext(Muplace_Context)
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const [detail, Setdetail] = useState(reviewdata2);
  const [addreview, Setaddreview] = useState(false);
  const username = localStorage.getItem('usr')
  const id_userrr = localStorage.getItem('usr_id') || null
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  let currentReviews = detail.slice(indexOfFirstReview, indexOfLastReview);
  const totalReviews = detail.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const [countingreview,Setcountingreview] = useState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const [idreview,Setiddddreview] = useState('')
  const [replyReviewId, setReplyReviewId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [canLike,Setcanlike] = useState(true);

  console.log(reviewdata2);
  useEffect(() => {
    currentReviews = reviewdata2.slice(indexOfFirstReview, indexOfLastReview)
  },[reviewdata2])

  const [reply,Setreply] = useState({
      detail:''
  })

  const updatestate = (newstate) => {
    Setdetail([...detail, newstate]);
  }
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    Setdetail(reviewdata2)
  }, [reviewdata2])

  const check_finish = (isFinish) => {
    Setaddreview(isFinish)
  }

  const handleSubmireply =(e)=>{
    e.preventDefault();
  }

  const handleReplySubmit = (e) => {
    e.preventDefault();
  };

  const handleReplyButtonClick = (reviewId) => {
    setReplyReviewId(reviewId);
    setReplyText('');
  };


  const handleCancelReply = () => {
    setReplyReviewId(null);
    setReplyText('');
  };

  const write_review = () => {

    let user = localStorage.getItem('usr')

    if (detail.find(data => data.username === user)) {
      return Swal.fire({ text: 'คุณรีวิวไปเเล้ว โปรดลบของเดิม หากต้องการรีวิวใหม่' })
    }

    if (user && addreview) {
      return Setaddreview(false)
    }
    return user ? Setaddreview(true) : Swal.fire('โปรดล็อกอินก่อน');
  }


  const sumreview = () => {
    let sum = 0;
    for (let i = 0; i < detail.length; i++) {
      sum += detail[i].score
    }

    return sum / detail.length
  }

  const renderPageNumbers = totalPages => {
    let pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`page-number ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(currentPage - 2, 1);
      const endPage = Math.min(currentPage + 2, totalPages);
      if (startPage > 1) {
        pages.push(
          <IconButton key="prev" onClick={() => handlePageClick(currentPage - 1)}>
            <ChevronLeftIcon />
          </IconButton>
        );
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            className={`page-number ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
      if (endPage < totalPages) {
        pages.push(
          <IconButton key="next" onClick={() => handlePageClick(currentPage + 1)}>
            <ChevronRightIcon />
          </IconButton>
        );
      }
    }
    return (
      <div className="carousel-pagination">
        {pages}
      </div>
    );
  };


  let Reviewd = (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{ color: '#faaf00', fontSize: '40px' }}>★</span>
        <span style={{ margin: '0 0.5rem', fontSize: '30px' }}>{sumreview().toFixed(2)} • {detail.length} รีวิว</span>
      </div>
    </div>
  )

  const openModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setIsModalOpen(true);
    document.querySelector('.modal').style.display = 'flex';
  };

  const closeModal = () => {
    setIsModalOpen(true);
    document.querySelector('.modal').style.display = 'none';
  };

  const renderModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="modal" onClick={closeModal}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img className="modal-content" src={currentImage} alt="Enlarged review" />
      </div>
    );
  };


  const updateReview = (newdata) => {
    currentReviews = [...currentReviews, newdata]
  }

  const onDeletereview = async (usr_name, id_review) => {
    Swal.fire({
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      text: 'ต้องการลบคอมเมนต์ ? ',
      confirmButtonColor:'orange'

    }).then(async result => {
      if (result.isConfirmed) {
        let remove = await axios.delete(`${SERVER_URL}/guide_detail/delete/review/${guideID}/${postID}/${id_review}`)
        if (remove.data) {
          Swal.fire({ icon: 'success', text: 'ลบข้อความเรียบร้อย' })
          Setdetail(() => detail.filter(data => data._id !== id_review))
          return window.location.reload();

        }
      }
    })
      .catch(err => {
        alert(err)
      })
  }

  const makereply = async (e) =>{
    e.preventDefault();
    if(!replyText) return alert('error');
    
        await axios.post(`${SERVER_URL}/guide_detail/reply/review/${guideID}/${postID}/${idreview}/${123}`,{replyText})
    .then(res => {
    console.log(res.data);
      let data = res.data.guide_post.filter((data) => data.muplace === localStorage.getItem('muplace'))
      Setdetail(data[0].postReview);
      setReplyReviewId(null)
      return;
    })
    .catch(err => alert(err))
  }



  


  const addlike=async(id_review,isreview)=>{
    Setcanlike(false);
    const usrid = localStorage.getItem('usr_id');

    if(!usrid){
      return Swal.fire({
        text:'โปรดล็อคอินก่อน',
      })
    }
  


    await axios.put(`${SERVER_URL}/guide_detail/like/review/${guideID}/${postID}/${id_review}/${username}/${isreview}`)
    .then(res => {
        if(res.data.status === 'ok'){
          let data = res.data.updated.guide_post.filter((data) => data.muplace === localStorage.getItem('muplace'))
          Setdetail(data[0].postReview);
          Setcanlike(true);
          return;
        }
    })
    .catch(err => {
      alert(err)
    })
  }

 

  return (
    <div className="review-container">
      {detail.length === 0 ? <h2>ไม่มีรีวิวขณะนี้</h2> : Reviewd}

      {addreview ? (
        <Add_Review updatestate={updatestate} updatereview={updateReview} check_finish={check_finish} guideID={guideID} postID={postID} />
      ) : (
        <>
          {currentReviews.map((data, index) => (
            <>
              <div key={index} className="review-item">
                <img className="avatar" src={`${SERVER_URL}/image/user/profile/${data.username}`} alt={data.username} />
                <div className="review-content">
                  <div className="header">
                    <h4 className="username">{data.username}</h4>
                  </div>
                  <Rating className="rating" readOnly name='read-only' value={data.score} />
                  <p className="review-text">{data.detail}</p>
                </div>
              </div>
              {data.review_img && (
                <div className='review-img'>
                  {data.review_img.map((image, i) => (
                    <img
                      style={{ width: '140px', height: '140px', cursor: 'zoom-in' }}
                      key={i}
                      src={`${SERVER_URL}/guide_detail/review/img/${guideID}/${image}`}
                      alt={`Review ${i}`}
                      onClick={() => openModal(`${SERVER_URL}/guide_detail/review/img/${data.username}/${image}`)}
                    />
                  ))}
                </div>
              )}
              {replyReviewId === data._id && (
                <Form onSubmit={makereply}>
                  <Form.Control as='textarea'
                    onChange={(e) => {
                      setReplyText(e.target.value);
                      Setiddddreview(data._id);
                    }}
                    placeholder="เขียนความคิดเห็นของคุณ..."
                  />
                  <ButtonBoot type="submit" variant='warning' className='button-confirm'>ยืนยัน</ButtonBoot>
                  <ButtonBoot variant={'danger'} onClick={handleCancelReply} className='button-cancel'>ยกเลิก</ButtonBoot>
                </Form>
              )}

              <div className='comment-actions'>
           
              { id_userrr === guideID && !data.reply.replied && replyReviewId !== data._id && (
                  <span className="action-btn mr-2">
                    <ButtonBoot
                      onClick={() =>  handleReplyButtonClick(data._id)}
                      variant="default"
                      className="hover-buttom"
                      style={{ color: '#378CE7' }}
                    >
                      ตอบกลับ
                    </ButtonBoot>
                  </span>
                )}
                   {/*   for reply    */}
                   { data.reply.replied &&  
                      <div className='replyfromshop'>
                        
                        <b>การตอบกลับจากไกด์:</b>  <br/>
                         
                        <br/>
                          {data.reply.detail}
                      </div>}
      
                
                {username === data.username &&
                  <span className='action-btn'>
                    <ButtonBoot onClick={() => onDeletereview(data.username, data._id)}  variant='default' className='hover-buttom' style={{ color: 'red' }}>ลบคอมเมนต์</ButtonBoot>
                  </span>}
              </div>
              <a    onClick={() =>{
                   if(!canLike)return;
                   return  addlike(data._id,data.like.countUser.includes(username))
              }} style={{cursor:'pointer', fontSize: '20px', marginLeft: '22px'}}>
                  {data.like.countUser.includes(username)  ? <AiFillLike/> :  <AiOutlineLike/>} 
                  {data.like.countlike}
              </a>
              <hr />
            </>
          ))}


          <div className="pagination-controls">
            {renderPageNumbers(totalPages)}
          </div>
        </>
      )}
      {id_userrr !== guideID && <div className='button-review'>
        <Button onClick={write_review}>
          <b>{addreview ? "ย้อนกลับ" : "เขียนรีวิว"}</b>
        </Button>
      </div>}
      {renderModal()}
    </div>
  );
}
