
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Image, Modal, Form, Carousel, Tab, Tabs } from 'react-bootstrap';
import '../Guide/List_guide.css';
import Swal from 'sweetalert2';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { Muplace_Context } from '../../context/MuContext';

export default function List_shop() {
  const { SERVER_URL } = useContext(Muplace_Context)
  const [listshop_nearby, setlistshopnearby] = useState([]);
  const muplace = localStorage.getItem('muplace');


  useEffect(() => {
      axios.get(`${SERVER_URL}/shop/muplace/${muplace}`)
      .then(res => {
          console.log(res.data);
          setlistshopnearby(res.data);
      })
      .catch(err => alert(err))
  }, [])


  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h1>ร้านค้าใกล้เคียง</h1>
          </Col>
          <br />
          <br />
          <br />

          {listshop_nearby.length !== 0 && listshop_nearby.map((data,i) => {
               

               return (
                 <Accordion>
                      <AccordionSummary
                         aria-controls="panel1-content"
                         id="panel1-header"
                         style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}

                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Image    roundedCircle className='avatar'src={`${SERVER_URL}/shop/profile_img/${data._id}/${data.profile_shop_pic}`}/>

                              <span style={{ marginLeft: 10 }}>
                                        <b>{data.shop_name}</b>

                                    </span>
                        </div>



                      </AccordionSummary>
                 </Accordion>
               )
          })}




        </Row>
      </Container>
    </div>
  )
}
