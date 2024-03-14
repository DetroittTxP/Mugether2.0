import React from 'react'
import '../ReviewPage.css';
import Rating from '@mui/material/Rating';

export default function Shopreview({reviewdata}) {
  return (
    <div className="review-container">
   
   

   
    
        {reviewdata.map((data,i) => (
                 <React.Fragment key={i}> 
                 <div  className="review-item">
                   <img className="avatar" src={`http://localhost:5353/image/user/profile/${data.review_username}`} alt='profile image' />
                   <div className="review-content">
                     <h4 className="username">{data.review_username}</h4>
                     <Rating className="rating" readOnly name='read-only' value={data.review_score} />
                     <p className="review-text">{data.review_detail}</p>
                   </div>
                 </div>
     
               </React.Fragment>
        ))}
       
  


    
  </div>
  )
}
