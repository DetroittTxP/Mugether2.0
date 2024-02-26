import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Button, Input } from 'antd'
import './ReviewPage.css';
import { useLocation } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Swal from 'sweetalert2'

const Add_Review = ({ Muplace_name, check_finish }) => {

  const [review, Setreview] = useState({
    muplacename: Muplace_name,
    reviewdetail: {
      username: localStorage.getItem('usr'),
      score: 0,
      detail: ''
    }
  });


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
    try {
     


      let res = await axios.post('http://localhost:5353/muplace/addreviewmuplace', review)
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

          <button type='submit'>Submit</button>


        </Form>

      </div>
    </div>

  )
}



export default function ReviewPage({ Muplace_name }) {
  const [detail, Setdetail] = useState([]);
  const [addreview, Setaddreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = detail.slice(indexOfFirstReview, indexOfLastReview);
  const totalReviews = detail.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);
  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  useEffect(() => {
    axios.get(`http://localhost:5353/muplace/mudata/${Muplace_name}`)
      .then((res) => {
        Setdetail(res.data[0].review);
      })
      .catch((err) => alert(err));

  }, [detail]);

  const check_finish = (isFinish) => {
    Setaddreview(isFinish)
  }


  const sumreview=()=>{
    let sum =0;
     for(let i= 0;i<detail.length;i++)
     {
         sum+=detail[i].score
     }

     return sum / detail.length
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
    return pages;
  };


  let Reviewd = (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <span style={{ color: '#faaf00', fontSize: '40px' }}>★</span>
      <span style={{ margin: '0 0.5rem', fontSize: '30px' }}>{sumreview().toFixed(2)} • {detail.length} Reviews</span>
    </div>
  </div>
  )

//https://media.discordapp.net/attachments/1130047272508465273/1164158784046911498/image.png?ex=6542325b&is=652fbd5b&hm=34d3ee5ae415d18976b94fca7e67358183624112e20a65bfbfcb679cc5cede42&=&width=445&height=385
  return (
    <div className="review-container">
      <h2 style={{fontWeight: 'bold'}}>Review</h2>
      {detail.length === 0 ? <h2>No review</h2> :  Reviewd}

      {addreview ? (
      <Add_Review check_finish={check_finish} Muplace_name={Muplace_name} />
    ) : (
      <>
        {currentReviews.map((data, index) => {
        return (
          <div key={index} className="review-item">
            <img className="avatar" src={`http://localhost:5353/image/user/profile/${data.username}`} alt={data.username} />
            <div className="review-content">
              <h4 className="username">{data.username}</h4>
              <Rating className="rating" readOnly name='read-only' value={data.score} />
              <p className="review-text">{data.detail}</p>
            </div>
          </div>
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

    </div>
  );
}
 