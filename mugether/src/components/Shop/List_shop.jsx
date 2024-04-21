
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Image, Form, CardGroup, } from 'react-bootstrap';
import '../Guide/List_guide.css';
import Swal from 'sweetalert2';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { Muplace_Context } from '../../context/MuContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import LinesEllipsis from 'react-lines-ellipsis'

export default function List_shop() {
  const { SERVER_URL } = useContext(Muplace_Context)
  const [listshop_nearby, setlistshopnearby] = useState([]);
  const muplace = localStorage.getItem('muplace');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleExpand = (i) => {
    setExpandedIndex(expandedIndex === i ? null : i);
  };

  useEffect(() => {
    axios.get(`${SERVER_URL}/shop/muplace/${muplace}`)
      .then(res => {
        console.log(res.data);
        setlistshopnearby(res.data);
      })
      .catch(err => alert(err))
  }, [])


  const handleitemclick = (shopid, itemid, id_owner) => {
    localStorage.setItem('shop_id', shopid);
    localStorage.setItem('shop_item_id', itemid);
    localStorage.setItem('id_user', id_owner);
    return window.location.href = '/shopdetail';
  }


  return (
    <div>
      <Container>
        <Row>
          <Col>
            {listshop_nearby.length !== 0 ? <h1>ร้านค้าใกล้เคียง</h1> : <h1>ยังไม่มีร้านค้าใกล้เคียงสถานที่นี้</h1>}
          </Col>
          <br />
          <br />
          <br />

          {listshop_nearby.length !== 0 && listshop_nearby.map((data, i) => {

            const posts = data.shop_items;
            console.log(posts);
            return (
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Image roundedCircle className='avatar' src={`${SERVER_URL}/shop/profile_img/${data.id_user}/${data.profile_shop_pic}`} />

                    <span style={{ marginLeft: 10 }}>
                      <b>{data.shop_name}</b>

                    </span>
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  <Container>
                    <Row>
                      {posts.map((post, i) => (
                        <Col xs={12} sm={6} md={4} lg={4}>

                          <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                height="140"
                                image={`${SERVER_URL}/shop/post_img/${data._id}/${post.item_photo[0]}`}
                                alt="green iguana"
                              />
                              <CardContent   >
                                <Typography gutterBottom variant="h5" component="div">
                                  <b>{post.item_name}</b>
                                </Typography>
                                <Typography variant="body2 " color="text.secondary" >
                                  {post.item_detail.substring(0, 100)}
                                  {expandedIndex === i && ( 
                                    <>
                                      <br />
                                      {post.item_detail.substring(100)}
                                    </>
                                  )}
                                  <Button variant='light'  onClick={() => handleToggleExpand(i)}>
                                    {expandedIndex === i ? 'ดูน้อยลง' : 'ดูเพิ่มเติม'}
                                  </Button>

                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button onClick={() => handleitemclick(data._id, post._id, data.id_user)} variant='warning'>
                                ไปยังสินค้า
                              </Button>

                            </CardActions>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </AccordionDetails>
              </Accordion>
            )
          })}

          {/* src={`${SERVER_URL}/shop/post_img/${data._id}/${post.item_photo[0]}`} */}


        </Row>
      </Container>
    </div>
  )
}
