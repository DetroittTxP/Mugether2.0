import React,{useEffect,useState,useContext} from 'react'
import { Muplace_Context } from '../context/MuContext'



export default function Mudetail() {

  const [Muplace,Setmuplace] = useState(localStorage.getItem('muplace'))
  const {per_muplace} = useContext(Muplace_Context)

  useEffect(() => {
      if(per_muplace !== ""){
        localStorage.setItem('muplace', per_muplace)
        Setmuplace(per_muplace)
      }
      else{
        Setmuplace(localStorage.getItem('muplace'))
      }
      
  },[per_muplace])
  return ( 
    <div style={{ paddingTop: '0.5px', paddingLeft:'90px'}}>
          <h1>{Muplace}</h1>
    </div>
  )
}
