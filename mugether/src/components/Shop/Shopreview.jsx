import React from 'react'
import '../ReviewPage.css';
import Rating from '@mui/material/Rating';

const Addshopreview=()=>{
   
}




export default function Shopreview({reviewdata}) {




  const sumreview=()=>{
    let sum =0;
     for(let i= 0;i<reviewdata.length;i++)
     {
         sum+=reviewdata[i].review_score
     }

     return sum / reviewdata.length
  }



  let Reviewd = (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <span style={{ color: '#faaf00', fontSize: '40px' }}>★</span>
      <span style={{ margin: '0 0.5rem', fontSize: '30px' }}>{sumreview().toFixed(2)} • {reviewdata.length.length} Reviews</span>
    </div>
  </div>
  )

  return (
    <div className="review-container">
   
   

        {reviewdata.length === 0 ? <h2>No review</h2> :  Reviewd}
    
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
