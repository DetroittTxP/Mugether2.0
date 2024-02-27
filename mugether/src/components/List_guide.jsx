


import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button,Image, Modal, Form} from 'react-bootstrap';
import './List_guide.css';
import Guide_detail from './Guide_detail';

import { Accordion, AccordionDetails,  AccordionSummary } from '@mui/material'
import Add_post from './Add_post';
import { Muplace_Context } from '../context/MuContext';

export default function ListGuide  ()  {
    const [guidedata, setGuideData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const {guideStatus} = useContext(Muplace_Context)
    console.log(guideStatus);
    useEffect(() => {
        axios.get(`http://localhost:5353/guide/list-guide/${localStorage.getItem('muplace')}`)
            .then(res => setGuideData(res.data))
            .catch(err => alert(err));
    }, []);

    

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>CHOOSE YOUR GUIDE</h1>
                    </Col>
                    <Col>
                    <Button variant='primary' className='add-post' onClick={() => setShowModal(true)}>
                        ADD POST
                    </Button>
                    </Col>
                </Row>
                <br/>

            { guideStatus &&    <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Add_post/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                        <Button variant="primary">Post</Button>
                    </Modal.Footer>
                </Modal>
}
                {guidedata.map((data) => (
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
                ))}
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

