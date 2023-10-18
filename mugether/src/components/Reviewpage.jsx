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
    <div style={{ marginLeft: 200 }}>
         <h2>{detail.length} reviews</h2>

         {detail.map((data,index) => {
                return (
                    <div>
                         <img width={50} src='https://cdn.discordapp.com/attachments/1130047272508465273/1164158784046911498/image.png?ex=6542325b&is=652fbd5b&hm=34d3ee5ae415d18976b94fca7e67358183624112e20a65bfbfcb679cc5cede42&'/>
                         <h4>{data.username}</h4>
                         
                         <Rating readOnly name='read-only' value={data.score}/>
                         <h5>{data.detail}</h5>
                          
                         <hr />
                    </div>
                )
         })}
         
    </div>
  )
}
