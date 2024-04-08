import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Button, Input } from 'antd'
import { Form,Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { IconButton } from '@mui/material';
import ButtonBo from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';
import { Muplace_Context } from '../../context/MuContext';
import ButtonBoot from 'react-bootstrap/Button'
import './Shopreview.css'


const Addshopreview=({ check_finish })=>{
  const {SERVER_URL} = useContext(Muplace_Context)
  const username = localStorage.getItem('usr')
  const shop_id = localStorage.getItem('shop_id');
  const shop_item_id = localStorage.getItem('shop_item_id');
  const [image,Setimage] = useState(null);
  const [imgsrc,Setimagesrc] = useState([]);
  
  const [review,Setreview] = useState({
    review: {
      username: localStorage.getItem('usr'),
      score: 0,
      detail: '',
    }
  })


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

  const onimage=(event)=>{
    const files = Array.from(event.target.files);

    if(files.length === 0 || files.length > 5){
       return;
    }

    if(files.length > 5){
       return alert('ต้องไม่เกิน 5 รูป')
    }

    Setimage(files)

    files.forEach(img => {
         const reader = new FileReader();

         reader.onload = (load) => {
              const url = load.target.result;
              Setimagesrc(prev => [...prev,url]);
         }

         reader.readAsDataURL(img);
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (review.review.score <= 0 || review.review.score === null) {
      return Swal.fire('โปรดให้คะแนนอย่างน้อย 1 คะแนน')
    }
    Swal.fire({
      title: 'Loading...',
      html: 'Please wait',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    })

    const formData = new FormData();


    try {
      
      let imagedata = null;
      if(image && username){
        //api upload / review / image
         
         for(let i = 0;i<image.length;i++){
             formData.append('reviewImage', image[i]);
         }
         let uplaodimage = await axios.post(`${SERVER_URL}/shop/review/image/${shop_id}`, formData).catch(err => console.log(err));
         
         imagedata = uplaodimage.data.photos
         
      }

      let res = await axios.post(`${SERVER_URL}/shop/review/${shop_id}/${shop_item_id}`, {review:review.review,imagedata});
      Swal.close();
      
      await Swal.fire({
        icon: 'success',
        title: "เพิ่มรีวิวเรียบร้อย",
        confirmButtonText: "กลับไปยังหน้า รีวิว",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก"
      })
        .then(result => {
          if (result.isConfirmed) {
            check_finish(false)
          }

        });
        window.location.reload();
 
    }
    catch (err) {
      alert(err)
    }
  }

  return (
    <div className='form-addreview'>

      <div>
        <Form onSubmit={onSubmit}>

        <Form.Group className='mb-3' controlId='reviewImg'>
              <Form.Label><b style={{ fontSize: 20 }}>เพิ่มรูปประกอบการรีวิว (ไม่เกิน 5 รูป)</b> </Form.Label>
              <Form.Control onChange={onimage}  multiple accept='image/*' type='file'  rows={4} cols={100}/>
          </Form.Group>

          {imgsrc.length !== 0 && 
              <Carousel indicators controls>
                     {imgsrc.map(img => (
                         <Carousel.Item>
                                <Image  className="d-block w-100" src={img} />
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
         <br/>  <br/>

        </Form>
      
      </div>
    </div>

  )
}




export default function Shopreview({reviewdata,id_user}) {

  const {SERVER_URL} = useContext(Muplace_Context);
  const shop_id = localStorage.getItem('shop_id')
  const shop_item_id = localStorage.getItem('shop_item_id')
  const pageStatus = localStorage.getItem('reviewStatus')
  const [detail, Setdetail] = useState(reviewdata);
  const [addreview, Setaddreview] = useState(false);
  const usr = localStorage.getItem('usr');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = detail.slice(indexOfFirstReview, indexOfLastReview);
  const totalReviews = detail.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const usrid = localStorage.getItem('usr_id');
  
  const [replyReviewId, setReplyReviewId] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    Setdetail(reviewdata)
  },[reviewdata])

  useEffect(() => {
      axios.get(`${SERVER_URL}/shop/review/${shop_id}/${shop_item_id}`)
      .then(res => {
           
            Setdetail(res.data)
      })
      .catch(err => alert(err))
  },[detail])
  

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const check_finish = (isFinish) => {
    Setaddreview(isFinish)
  }

  const handleReplyButtonClick = (reviewId) => {
    setReplyReviewId(reviewId);
    setReplyText('');
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
  };

  const handleCancelReply = () => {
    setReplyReviewId(null);
    setReplyText('');
  };
  

  const sumreview=()=>{
    let sum =0;
     for(let i= 0;i<reviewdata.length;i++)
     {
         sum+=reviewdata[i].review_score
     }

     return sum / reviewdata.length
  }


  const write_review=()=>{  

    let user = localStorage.getItem('usr') 

    if(currentReviews.find(data => data.review_username === user )){
      return Swal.fire({text:'คุณรีวิวไปเเล้ว โปรดลบของเดิม หากต้องการรีวิวใหม่'})
   }
    
    if(user && addreview)
    {
      return Setaddreview(false)
    }
    return user ? Setaddreview(true) : Swal.fire('โปรดล็อคอินก่อนทำการรีวิว');
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
      const startPage = Math.max(currentPage-2, 1);
      const endPage = Math.min(currentPage+2, totalPages);
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
  }



  let Reviewd = (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <span style={{ color: '#faaf00', fontSize: '40px' }}>★</span>
      <span style={{ margin: '0 0.5rem', fontSize: '30px' }}>{sumreview().toFixed(2)} • {reviewdata.length.length} Reviews</span>
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

  const onDeletereview=async(id)=>{
    Swal.fire({
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true,
      text:'ต้องการลบคอมเม้น ? ',
 
    }).then(async result => {
       if(result.isConfirmed){
             let remove = await axios.delete(`${SERVER_URL}/shop/delete/review/${shop_id}/${shop_item_id}/${id}`) 
             if(remove.data){
                  Swal.fire({icon:'success',text:'ลบข้อความเรียบร้อย'})
                  Setdetail( () => detail.filter(data => data._id !== id))
                  return;
             }
       }
    })
    .catch(err => {
         alert(err)
    })
  }

  const renderModal = () => {
    if (!isModalOpen) return null;
    
    return (
      <div className="modal" onClick={closeModal}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img className="modal-content" src={currentImage} alt="Enlarged review" />
      </div>
    );
  };

  const makereply = async (id_review,replyID) =>{
    await  axios.post(`${SERVER_URL}/shop/reply/review/${shop_id}/${shop_item_id}/${id_review}/${replyID}`)
.then(res => {
    console.log(res.data);
})
.catch(err => alert(err))
}


  return (
    <div className="review-container">
      {currentReviews.length === 0 ? <h3>ไม่มีรีวิวขณะนี้</h3> :  Reviewd}

      {addreview ? (
      <Addshopreview check_finish={check_finish} />
    ) : (
      <>
        {currentReviews.map((data,i) => {
         
          return(
            <>
             {data.review_reply.detail}
              <div className="review-item">
                <img className="avatar" src={`${SERVER_URL}/image/user/profile/${data.review_username}`} alt={data.review_username} />
                <div className="review-content">
                  <div className="header">
                    <h4 className="username">{data.review_username}</h4>
      
                  </div>
                  <Rating className="rating" readOnly name='read-only' value={data.review_score} />
                  <p className="review-text">{data.review_detail}</p>
                </div>
              </div>
              {data.review_image && (
                <div className='review-img'>
                    {data.review_image.length !== 0 && data.review_image.map((image, i) => (
                      <img 
                        style={{width: '140px', height: '140px', cursor: 'zoom-in'}} 
                        key={i} 
                        src={`${SERVER_URL}/shop/review/img/${shop_id}/${image}`} 
                        alt={`Review ${i}`}
                        onClick={() => openModal(`${SERVER_URL}/shop/reviewimage/${data.username}/${image}`)}
                      />
                    ))}
                </div>
              )}
              
              <div className='comment-actions'>
              
              {usrid === id_user && !data.review_reply.replied && (
                <span className="action-btn mr-2">
                  <ButtonBoot
                    onClick={() => handleReplyButtonClick(data._id)}
                    variant="default"
                    className="hover-buttom"
                    style={{ color: '#378CE7' }}
                  >
                    ตอบกลับ
                  </ButtonBoot>
                </span>
              )}
              {replyReviewId === data._id && (
                <form onSubmit={handleReplySubmit}>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="เขียนความคิดเห็นของคุณ..."
                  />
                  <ButtonBoot type="submit">ยืนยัน</ButtonBoot>
                  <ButtonBoot onClick={handleCancelReply}>Cancel</ButtonBoot>
                </form>
              )}
                
                {usr === data.review_username &&
                  <span className='action-btn'>
                    <ButtonBoot onClick={() => onDeletereview(data._id)} variant='default' className='hover-buttom' style={{ color: 'red' }}>ลบคอมเม้น</ButtonBoot>
                  </span>}
              </div>

                <hr/>
            </>
          );
        })}
        <div className="pagination-controls">
          {renderPageNumbers(totalPages)}
        </div>
      </>
    )} 


      {usrid !== id_user && <div className='button-review'>
        <Button onClick={write_review}>
          <b>{addreview ? "ย้อนกลับ" : "เขียนรีวิว"}</b>
        </Button>
      </div>}
      {renderModal()}
    </div>
  );
}
