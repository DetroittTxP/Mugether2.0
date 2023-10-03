import React, { useState, useEffect,useContext } from 'react'
import axios from 'axios'
import { Row, Col, Container } from 'react-bootstrap'
import { Typography } from 'antd';
import { Muplace_Context } from '../context/MuContext';

export default function Listitem() {

     const [List_Of_Mu, Setlistofmu] = useState([]);
     const { muplace } = useContext(Muplace_Context)

     useEffect(() => {
          //get mu place here
          axios.get('http://localhost:5353/muplace/mudata')
               .then(res => Setlistofmu(res.data))
               .catch(err => alert(err))
     }, [])
     

     ////////////////////////ทำเป็น เเถว เเถวละ  3 หรือมากกว่านั้นิดหน่อย รูปจนกว่าจะหมดทุกรูป
     return (
          <Container  style={{ display: 'flex', justifyContent: 'center' }} >

               <Row style={{ justifyContent: 'center' }} >
                    {List_Of_Mu
                    .filter(data => data.name !== 'วัดดาวดึงษาราม')
                    .sort((a, b) => a.name.localeCompare(b.name, 'th'))
                    .map((data, index) => {
                         let top = index > 3 ? { marginTop: 100 } : {};

                         return (
                              <Col style={top} md={3} >
                                   <img style={{ borderRadius: 20}} width={300} height={300} alt={data.name} src={`http://localhost:5353/image/mu/${data.name}/1`} />
                                   <br />
                                   <br />
                           
                                   <div style={{fontFamily:"Sarabun"}}>
                                        <h5 >{data.name}</h5>
                                   </div>

                              </Col>
                         )
                    })}


                    {/* {List_Of_Mu.map((data, index) => {

                         let top = index > 3 ? { marginTop: 100 } : {};

                         return (
                              <Col style={top} md={3} >
                                   <img style={{ borderRadius: 30 }} width={200} height={200} alt={data.name} src={`http://localhost:5353/image/mu/${data.name}/1`} />
                                   <br />
                                   <br />
                                   <h6>{data.name}</h6>

                              </Col>
                         )
                    }

                    )} */}

               </Row>

          </Container>
     )
}
