import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import Rating from '@mui/material/Rating';

import './ReviewPage.css';

export default function ReviewPage({ Muplace_name }) {
  const [detail, Setdetail] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5353/muplace/mudata/${Muplace_name}`)
      .then((res) => {
        Setdetail(res.data[0].review);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="review-container">
      <h2 className="review-title">{detail.length} Reviews</h2>

      {detail.map((data, index) => {
        return (
          <div key={index} className="review-item">
            <img className="avatar" src='https://media.discordapp.net/attachments/1130047272508465273/1164158784046911498/image.png?ex=6542325b&is=652fbd5b&hm=34d3ee5ae415d18976b94fca7e67358183624112e20a65bfbfcb679cc5cede42&=&width=445&height=385' alt={data.username} />
            <div className="review-content">
              <h4 className="username">{data.username}</h4>
              <Rating className="rating" readOnly name='read-only' value={data.score} />
              <p className="review-text">{data.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
