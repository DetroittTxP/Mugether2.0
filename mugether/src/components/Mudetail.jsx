import React, { useEffect, useState, useContext } from 'react'
import { Muplace_Context } from '../context/MuContext'
import { Container, Row, Col } from 'react-bootstrap'
import Reviewpage from './Reviewpage'


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
    <div>
     <div style={{ paddingTop: '0.5px', paddingLeft: '1px' }}>
     <div style={{ display: 'flex', alignItems: 'center', marginLeft: '200px', justifyContent: 'space-between'}}>
        <h1>{Muplace}</h1>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '300px' }}>
          <FaHeart style={{ marginRight: '10px', color: 'red', cursor: 'pointer' }} onClick={handleSave} />
          <span>Save</span>
          <FacebookShareButton url={window.location.href} quote={`Check out this place: ${Muplace}`}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <span style={{ marginRight: '10px' }}>Share</span>
        </div>
      </div>

      <br />



      <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: 200 }}>
        <img width={600} height={600}
          src={`http://localhost:5353/image/mu/${Muplace}/1`}
          style={{ marginRight: '10px', marginBottom: '10px', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}/>

        <div style={{ marginLeft: 30 }}>
          <img width={300} height={300} src={`http://localhost:5353/image/mu/${Muplace}/2`} />
          <img style={{ marginLeft: 30, borderTopRightRadius: '20px' }}  width={300} height={300} src={`http://localhost:5353/image/mu/${Muplace}/3`} /><br />
          <img style={{ paddingTop: 30 }} width={300} height={300} src={`http://localhost:5353/image/mu/${Muplace}/4`} />
          <img style={{ paddingTop: 30, paddingLeft: 30, borderBottomRightRadius: '20px' }} width={330} height={300} src={`http://localhost:5353/image/mu/${Muplace}/5`} />
        </div>
<<<<<<< HEAD
=======


        <br />
       
        <br />
        <hr/>
        <br/>
        <Reviewpage Muplace_name={Muplace} />
        <br/>
        <br/>
        



>>>>>>> 518e819aef875d069b0753a8cee84e7d4f831043
      </div>
      



      <br />
      <hr />
      <br />

      

      <Reviewpage Muplace_name={Muplace} />


      
      




    </div>
      
    </div>
  )
}
