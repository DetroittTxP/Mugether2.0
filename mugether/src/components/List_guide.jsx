// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// export default function List_guide() {

//     const [guidedata, Setguidedata] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5353/guide/list-guide')
//             .then(res => Setguidedata(res.data))
//             .catch(err => alert(err))
//     }, [])

//     return (
//         <div>
//             <h2 style={{ textDecoration: 'underline' }}>CHOOSE YOUR GUIDE</h2>



//             <div style={{ display: 'grid', gridTemplateRows: 'repeat(6, auto)', gridTemplateColumns: 'repeat(6, auto)', gap: '25px', justifyContent: 'center' }}>
//                 {guidedata.map((data, index) => (
//                     <div key={index} style={{ textAlign: 'center' }}>
//                         <img src={`http://localhost:5353/image/guide/profile/${data.username}/${data.profile_pic}`} height={100} width={100} alt={`Profile of ${data.username}`} />
//                         <br />
//                         <div>
//                             <b>นาย {data.firstname} {data.lastname}</b>
//                             {/* <b>{data.username}</b> */}
//                             <br />
//                             <button type="button" className="btn btn-warning" style={{ color: 'white' }} >เลือก</button>
//                             <br /><br />
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* WAIT FOR CSS */}

//         </div>
//     )
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button,Image } from 'react-bootstrap';
import './ReviewPage.css';
import Guide_detail from './Guide_detail';

import { Accordion, AccordionDetails,  AccordionSummary } from '@mui/material'

export default function ListGuide  ()  {
    const [guidedata, setGuideData] = useState([]);
    const [username_guide, Setusername_guide] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5353/guide/list-guide')
            .then(res => setGuideData(res.data))
            .catch(err => alert(err));
    }, []);


    return (
        <div>
            <h1>CHOOSE YOUR GUIDE</h1><br/>
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
                    {username_guide && <Guide_detail username={username_guide} />}
                        </AccordionDetails>
                </Accordion>
            ))}
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

