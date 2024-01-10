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
    return user ? Setaddreview(true) : Swal.fire('Login first');
   
  }
//https://media.discordapp.net/attachments/1130047272508465273/1164158784046911498/image.png?ex=6542325b&is=652fbd5b&hm=34d3ee5ae415d18976b94fca7e67358183624112e20a65bfbfcb679cc5cede42&=&width=445&height=385
  return (
    <div className="review-container">
       <h2>Reviews  ★{sumreview().toFixed(2)}   </h2>
      {!addreview && <h2 className="review-title">{detail.length} Reviews     </h2>}

      {addreview && <Add_Review check_finish={check_finish} Muplace_name={Muplace_name} />}
      <br />

      {!addreview && detail.map((data, index) => {
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

      {<div className='button-review'>
        <Button onClick={write_review}>
          <b>{addreview ? "ย้อนกลับ" : "เขียนรีวิว"}</b>
        </Button>
      </div>}

    </div>
  );
}
 