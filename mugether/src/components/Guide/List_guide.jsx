


import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Image, Modal, Form, Carousel, Tab, Tabs } from 'react-bootstrap';
import './List_guide.css';
import Guide_detail from './Guide_detail';
import Swal from 'sweetalert2';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import Add_post from './Add_post_guide';
import { Muplace_Context } from '../../context/MuContext';
import { useNavigate } from 'react-router-dom'

export default function ListGuide() {

    const [showModal, setShowModal] = useState(false);
    const { guideStatus, SERVER_URL } = useContext(Muplace_Context)
    const [list_all_guide, Setlistallguide] = useState([]);
    const [filteredGuides, setFilteredGuides] = useState([]);
    const [guide_type,setguide_type] = useState('guide');

    const navigate = useNavigate()
    const usrID = localStorage.getItem('usr_id');
    const muplace = localStorage.getItem('muplace')
    console.log(list_all_guide);

    useEffect(() => {

        axios.get(`${SERVER_URL}/guide_detail/get_list_guide/${localStorage.getItem('muplace')}`)
            .then(res => {
                Setlistallguide(res.data);
                setFilteredGuides(res.data.filter(type => type.guide_type === guide_type));
            })
            .catch(err => alert(err))
    }, [guide_type]);




    const onDelete = (id_guide) => {

        Swal.fire({
            title: 'ต้องการลบโพสต์ใช่หรือไม่',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่',
            confirmButtonColor: 'orange'
        })
            .then(async result => {
                if (result.isConfirmed) {
                    Setlistallguide(prev => prev.filter(data => data.id_guide !== id_guide));
                    setFilteredGuides(prev => prev.filter(data => data.id_guide !== id_guide));
                    let deletedata = await axios.delete(`${SERVER_URL}/guide_detail/delete-post/${id_guide}/${muplace}`);
                    return Swal.fire({ icon: 'success', text: 'ลบโพสต์เเล้ว' })
                }

            })
            .catch(err => Swal.fire({ icon: 'error', text: err }))

    }
    console.log(list_all_guide);
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>บริการในพื้นที่</h1>
                    </Col>
                    <br />
                    <br />
                    <br />

                    <Col>
                        {guideStatus && <Button variant='warning' className='add-post' onClick={() => setShowModal(true)}>
                            เพิ่มโพสต์
                        </Button>}
                    </Col>

                    <Tabs
                        
                        transition
                        variant='underline'
                        onSelect={(eventKey) => setguide_type(eventKey)}
                        className="mb-3"
                        justify
                        defaultActiveKey='guide'
                    >
                        <Tab eventKey='guide' title="ไกด์" />


                        <Tab eventKey='muler' title="นักรับจ้างมู" />
                        <Tab eventKey='both' title="ทั้งหมด" />


                    </Tabs>
                </Row>
                <br />

                {guideStatus && <Modal style={{ zIndex: 1050 }} show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton >
                        <br />
                        <Modal.Title><h4><b>เพิ่มโพสต์</b></h4></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Add_post />
                    </Modal.Body>

                </Modal>
                }

                {(filteredGuides.length === 0 && guide_type === 'guide') &&
                    <h1>ยังไม่มีไกด์ในขณะนี้</h1>
                }
                {(filteredGuides.length === 0 && guide_type === 'muler') &&
                    <h1>ยังไม่มีนักรับจ้างมูในขณะนี้</h1>
                }

                {filteredGuides.length != 0 && filteredGuides.map((data) => {
                    let guideshow;
                    switch(data.guide_type){
                         case 'guide':
                            guideshow = 'ไกด์'
                            break;
                        case 'muler':
                            guideshow = 'รับจ้างมู'
                            break;
                        default:
                            guideshow = '(ไกด์,รับจ้างมู)'
                            break;    
                    }

                    return (
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
                                        <b>นาย {data.firstname} {data.lastname} {`(${guideshow})`}</b>

                                    </span>
                                </div>

                                {usrID && usrID === data.id_guide &&
                                    <Button onClick={() => onDelete(data.id_guide)} variant='danger' style={{ marginLeft: 'auto', padding: '5px 10px' }}>
                                        ลบโพสต์
                                    </Button>}

                            </AccordionSummary>

                            <AccordionDetails>
                                <Guide_detail   profile_name={{ id_guide: data.id_guide, name: data.profile_pic }} contact={data.contact} data={data} />
                            </AccordionDetails>
                        </Accordion>
                    )

                }


                )}

            </Container>

        </div>


    )
}
