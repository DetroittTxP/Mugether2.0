import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Row, Col, Container } from 'react-bootstrap'
import { Typography } from 'antd';
import { Muplace_Context } from '../context/MuContext';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

export default function Listitem() {

     const [List_Of_Mu, Setlistofmu] = useState([]);
     const { muplace } = useContext(Muplace_Context);

     useEffect(() => {
          //get mu place here
          axios.get('http://localhost:5353/muplace/mudata')
               .then(res => Setlistofmu(res.data))
               .catch(err => alert(err))
     }, [])


     ////////////////////////ทำเป็น เเถว เเถวละ  3 หรือมากกว่านั้นิดหน่อย รูปจนกว่าจะหมดทุกรูป
     return (
          <Container style={{ display: 'flex', justifyContent: 'center' }} >

               <Row style={{ justifyContent: 'center' }} >
                    {List_Of_Mu
                         .filter(data => data.name !== 'วัดดาวดึงษาราม')
                         .sort((a, b) => a.name.localeCompare(b.name, 'th'))
                         .map((data, index) => {
                              let top = index > 3 ? { marginTop: 100 } : {};

                              return (
                                   <Col style={top} md={3} >


                                        <a href='#ken'>
                                             <img onClick={() => alert(`มึงกำลังคลิก ${data.name}`)} style={{ borderRadius: 20 }} width={300} height={300} alt={data.name} src={`http://localhost:5353/image/mu/${data.name}/1`} />
                                        </a>

                                        <br />
                                        <br />

                                        <div style={{ fontFamily: "Sarabun" }}>
                                             <h5>{data.name}</h5>
                                             <FaHeart style={{ color: 'red' }} />
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                             <FaMapMarkerAlt style={{ marginRight: '10px' }} />
                                             <span>{data.address}</span>
                                        </div>

                                   </Col>
                              )
                         })}

               </Row>

          </Container>
     )
}
