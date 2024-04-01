


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Image, Modal, Form, Carousel } from 'react-bootstrap';
import './List_guide.css';
import Guide_detail from './Guide_detail';
import Swal from 'sweetalert2';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import Add_post from './Add_post_guide';
import { Muplace_Context } from '../../context/MuContext';
import {useNavigate} from 'react-router-dom'

export default function ListGuide() {
  
    const [showModal, setShowModal] = useState(false);
    const { guideStatus,SERVER_URL } = useContext(Muplace_Context)
    const [list_all_guide, Setlistallguide] = useState([]);
    const navigate = useNavigate()
    const usrID = localStorage.getItem('usr_id');
    const muplace = localStorage.getItem('muplace')

    console.log(guideStatus);

    useEffect(() => {
       
        axios.get(`${SERVER_URL}/guide_detail/get_list_guide/${localStorage.getItem('muplace')}`)
            .then(res => Setlistallguide(res.data))
            .catch(err => alert(err))
    }, []);

    const onDelete=(id_guide)=>{
                      
           Swal.fire({
                title:'ต้องการลบโพสใช่หรือไม่',
                icon:'warning',
                showCancelButton:true,
                confirmButtonText:'ใช่',
                cancelButtonText:'ไม่'
           })
           .then(async result => {
                if(result.isConfirmed){
                      Setlistallguide(prev => prev.filter(data => data.id_guide !== id_guide));

                            let deletedata = await axios.delete(`${SERVER_URL}/guide_detail/delete-post/${id_guide}/${muplace}`);
                           return Swal.fire({icon:'success',text:'ลบโพสเเล้ว'})
                }
                
           })
           .catch(err => Swal.fire({icon:'error', text:err}))
      
    }
   console.log(list_all_guide);
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>CHOOSE YOUR GUIDE</h1>
                    </Col>
                    <Col>
                       { guideStatus && <Button  variant='warning' className='add-post' onClick={() => setShowModal(true)}>
                            เพิ่มโพส
                        </Button>}
                    </Col>
                </Row>
                <br />

                {guideStatus && <Modal style={{zIndex:1050}}  show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton >
                        <br/>
                        <Modal.Title><h4><b>เพิ่มโพส</b></h4></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       
                        <Add_post />
                    </Modal.Body>
                    
                </Modal>
                }
                
                {list_all_guide == 0 && 
                    <h1>ยังไม่มีไกด์ในขณะนี้ครับ</h1>
                }
                {list_all_guide.length != 0 && list_all_guide.map((data) => (
                   <Accordion>
                   <AccordionSummary
                       aria-controls="panel1-content"
                       id="panel1-header"
                       style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                   >
                       <div style={{ display: 'flex', alignItems: 'center' }}>
                           <Image
                               src={`${SERVER_URL}/image/guide/profile/${data.id_guide}/${data.profile_pic}`}
                               roundedCircle
                               className='avatar'
                           />
               
                           <span style={{ marginLeft: 10 }}>
                               <b>นาย {data.firstname} {data.lastname}</b>
                               
                           </span>
                       </div>
               
                      { usrID && usrID === data.id_guide && 
                      <Button onClick={() => onDelete(data.id_guide)} variant='danger' style={{ marginLeft: 'auto', padding: '5px 10px' }}>
                            Delete
                       </Button>}

                   </AccordionSummary>
               
                   <AccordionDetails>
                       <Guide_detail  data={data}/>
                   </AccordionDetails>
               </Accordion>
               
                ))}
             
            </Container>

        </div>


    )
}
