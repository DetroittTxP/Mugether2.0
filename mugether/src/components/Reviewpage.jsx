import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ReactStars from 'react-rating-stars-component';

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
    </div>
  )
}
