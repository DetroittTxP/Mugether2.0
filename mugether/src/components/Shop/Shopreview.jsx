import React,{useState, useContext, useEffect} from 'react'
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Button, Input } from 'antd'
import { Form,Image } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { IconButton } from '@mui/material';
import ButtonBo from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel';
import '../ReviewPage.css';
import { Muplace_Context } from '../../context/MuContext';


const Addshopreview=({ shop_name, check_finish })=>{
  const username = localStorage.getItem('usr')
  const [review, Setreview] = useState({
    shopname: shop_name,
    reviewdetail: {
      username: localStorage.getItem('usr'),
      score: 0,
      detail: '',
    }
  });
  const [image,Setimage] = useState(null);
  const [imgsrc,Setimagesrc] = useState([]);

  const change = (e, newvalue) => {

    let value = e.target.value;

    if (e.target.name === 'score') {
      value = newvalue

    }
    console.log(newvalue + e.target.name);

    Setreview(prevReview => ({
      ...prevReview,
      reviewdetail: {
        ...prevReview.reviewdetail,
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
    // Setreview(prev => ({
    //       ...prev,
    //       reviewdetail:{
    //            ...prev.reviewdetail,
    //            [event.target.id]:files
    //       }
    // }))

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
    if (review.reviewdetail.score <= 0 || review.reviewdetail.score === null) {
      return alert('rating must > 0')
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
         let uplaodimage = await axios.post(`http://localhost:5353/muplace/addreviewmuplace/image/${username}`, formData).catch(err => console.log(errr));
         imagedata = uplaodimage.data.imageName
         
      }

   

      let res = await axios.post('http://localhost:5353/muplace/addreviewmuplace', {review:review,image:imagedata});
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




export default function Shopreview({reviewdata}) {

  const {SERVER_URL} = useContext(Muplace_Context);
  const pageStatus = localStorage.getItem('reviewStatus')
  const [detail, Setdetail] = useState([]);
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

  // useEffect(() => {
  //   axios.get(`http://localhost:5353/muplace/mudata/${reviewdata}`)
  //     .then((res) => {
  //       Setdetail(res.data[0].review);
  //     })
  //     .catch((err) => alert(err));

  // }, [detail]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const check_finish = (isFinish) => {
    Setaddreview(isFinish)
  }
  

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

    if(user && addreview)
    {
      return Setaddreview(false)
    }
    return user ? Setaddreview(true) : Swal.fire('Login first');
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

  const renderModal = () => {
    if (!isModalOpen) return null;
    
    return (
      <div className="modal" onClick={closeModal}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img className="modal-content" src={currentImage} alt="Enlarged review" />
      </div>
    );
  };

  return (
    <div className="review-container">
      <h2 style={{fontWeight: 'bold'}}>รีวิว</h2>
      {detail.length === 0 ? <h2>ไม่มีรีวิวขณะนี้</h2> :  Reviewd}

      {addreview ? (
      <Addshopreview check_finish={check_finish} shop_name={shop_name} />
    ) : (
      <>
        {reviewdata.map((data,i) => {
          return(
            <>
              <div  className="review-item">
                <img className="avatar" src={`${SERVER_URL}/image/user/profile/${data.review_username}`} alt='profile image' />
                  <div className="review-content">
                    <h4 className="username">{data.review_username}</h4>
                    <Rating className="rating" readOnly name='read-only' value={data.review_score} />
                    <p className="review-text">{data.review_detail}</p>
                  </div>
                </div>
              <div/>
              {data.reviewImage && (
                <div className='review-img'>
                    {data.reviewImage.map((image, i) => (
                      <img 
                        style={{width: '140px', height: '140px', cursor: 'zoom-in'}} 
                        key={i} 
                        src={`http://localhost:5353/muplace/reviewimage/${data.username}/${image}`} 
                        alt={`Review ${i}`}
                        onClick={() => openModal(`http://localhost:5353/shop/reviewimage/${data.username}/${image}`)}
                      />
                    ))}
                </div>
              )}
            </>
          );
        })}
        <div className="pagination-controls">
          {renderPageNumbers(totalPages)}
        </div>
      </>
    )} 


      {<div className='button-review'>
        <Button onClick={write_review}>
          <b>{addreview ? "ย้อนกลับ" : "เขียนรีวิว"}</b>
        </Button>
      </div>}
      {renderModal()}
    </div>
  );
}
