


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
    const [guidedata, setGuideData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { guideStatus } = useContext(Muplace_Context)
    const [list_all_guide, Setlistallguide] = useState([]);
    const navigate = useNavigate()
    const usrID = localStorage.getItem('usr_id');
    const muplace = localStorage.getItem('muplace')

    console.log(guideStatus);

    useEffect(() => {
        axios.get(`http://localhost:5353/guide/list-guide/${localStorage.getItem('muplace')}`)
            .then(res => setGuideData(res.data))
            .catch(err => alert(err));


        axios.get(`http://localhost:5353/guide_detail/get_list_guide/${localStorage.getItem('muplace')}`)
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

                            let deletedata = await axios.delete(`http://localhost:5353/guide_detail/delete-post/${id_guide}/${muplace}`);
                           return Swal.fire({icon:'success',text:'ลบโพสเเล้ว'})
                }
                
           })
           .catch(err => Swal.fire({icon:'error', text:err}))
      
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>CHOOSE YOUR GUIDE</h1>
                    </Col>
                    <Col>
                       { guideStatus && <Button variant='warning' className='add-post' onClick={() => setShowModal(true)}>
                            ADD POST
                        </Button>}
                    </Col>
                </Row>
                <br />

                {guideStatus && <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton >
                        <Modal.Title>Add Post</Modal.Title>
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
                               src={`http://localhost:5353/image/guide/profile/${data.id_guide}/${data.profile_pic}`}
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
                       <Guide_detail data={data}/>
                   </AccordionDetails>
               </Accordion>
               
                ))}
                {/* {guidedata.map((data) => (
                    <Accordion onChange={() => Setusername_guide(data.username)}>
                        <AccordionSummary
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Image 
                                src={`http://localhost:5353/image/guide/profile/${data.username}/${data.profile_pic}`} 
                                roundedCircle
                                className='avatar'
                                />   
                                            
                            <span style={{marginLeft:10}}>
                                <b>นาย {data.firstname} {data.lastname}</b>
                            </span>
                        </AccordionSummary>

                        <AccordionDetails>
                        <Guide_detail username={data.username} />
                            </AccordionDetails>
                    </Accordion>
                ))} */}
            </Container>

        </div>


    )
}


// export default function ListGuide() {
//     const [guidedata, setGuideData] = useState([]);
//     const [username_guide, Setusername_guide] = useState('');

//     useEffect(() => {
//         axios.get('http://localhost:5353/guide/list-guide')
//             .then(res => setGuideData(res.data))
//             .catch(err => alert(err));
//     }, []);

//     return (
//         <div>
//             <List_guide2 />
//         </div>
//         // <Container className="mt-4">
//         //     <h2 style={{ textDecoration: 'underline' }}>CHOOSE YOUR GUIDE</h2>

//         //     <Row className="row-cols-1 row-cols-md-4 g-4 justify-content-center">
//         //         {guidedata.map((data, index) => (
//         //             <Col key={index} className="text-center">
//         //                 <img
//         //                     src={`http://localhost:5353/image/guide/profile/${data.username}/${data.profile_pic}`}
//         //                     height={100}
//         //                     width={100}
//         //                     alt={`Profile of ${data.username}`}
//         //                     className="avatar"
//         //                 />
//         //                 <div className="mt-3">
//         //                     <b>นาย {data.firstname} {data.lastname}</b>
//         //                     <br />
//         //                     <Button onClick={() => Setusername_guide(data.username)} variant="warning" style={{ color: 'white' }}>เลือก</Button>
//         //                 </div>
//         //             </Col>
//         //         ))}
//         //     </Row>
//         //     <hr />
//         //     {/* WAIT FOR CSS */}
//         //     {username_guide && <Guide_detail username={username_guide} />}

//         // </Container>
//     );
// }

