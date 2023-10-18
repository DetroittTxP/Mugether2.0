import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ReactStars from 'react-rating-stars-component';
import Rating from '@mui/material/Rating';
export default function Reviewpage({Muplace_name}) {
  
  const [detail,Setdetail] = useState([]);
  const [rating,Setrating] = useState(0);


  useEffect(() => {
    axios.get(`http://localhost:5353/muplace/mudata/${Muplace_name}`)
    .then(res => {
        Setdetail(res.data[0].review)
        
    })
    .catch(err => alert(err))
  },[])

  return (
    <div>
         <h2>{detail.length} reviews</h2>

         {detail.map((data,index) => {
                return (
                    <div>
                         <h4>{data.username}</h4>
                         <Rating readOnly name='read-only' value={data.score}/>
                         <h5>{data.detail}</h5>
                         <hr/>
                    </div>
                )
         })}
    </div>
  )
}
