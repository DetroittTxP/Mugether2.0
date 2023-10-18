import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Reviewpage({Muplace_name}) {
  
  const [detail,Setdetail] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5353/muplace/mudata/${Muplace_name}`)
    .then(res => Setdetail(res.data))
    .catch(err => alert(err))
  },[])

  return (
    <div>
         
    </div>
  )
}
