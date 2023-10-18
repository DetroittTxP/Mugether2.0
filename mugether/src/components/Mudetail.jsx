import React, { useEffect, useState, useContext } from 'react'
import { Muplace_Context } from '../context/MuContext'
import { Container, Row, Col } from 'react-bootstrap'

export default function Mudetail() {

  const [Muplace, Setmuplace] = useState(localStorage.getItem('muplace'))
  const { per_muplace } = useContext(Muplace_Context)

  useEffect(() => {
    if (per_muplace !== "") {
      localStorage.setItem('muplace', per_muplace)
      Setmuplace(per_muplace)
    }
    else {
      Setmuplace(localStorage.getItem('muplace'))
    }

  }, [per_muplace])

  return (
    <div style={{ paddingTop: '0.5px', paddingLeft: '90px' }}>
      <h1>{Muplace}</h1>
      <br />





      <div style={{ display: 'flex',justifyContent:'flex-start', marginLeft: 200 }}>
        <img width={600} height={600} src={`http://localhost:5353/image/mu/${Muplace}/1`} />

        <div style={{ marginLeft: 30, }}>
          <img width={300} height={300} src={`http://localhost:5353/image/mu/${Muplace}/1`} />
          <img style={{ marginLeft: 30 }} width={300} height={300} src={`http://localhost:5353/image/mu/${Muplace}/1`} />
        </div>

        
      </div>


      


    </div>
  )
}
