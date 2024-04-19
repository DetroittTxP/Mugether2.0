import React,{useContext} from 'react'
import { Container,Row,Col,Image } from 'react-bootstrap' 
import { Muplace_Context } from '../../context/MuContext'
import Testimage from '../../assets/Guideedit.png'
export default function Aboutguide() {
  const {SERVER_URL} = useContext(Muplace_Context)

  return (
    <Container>
          <Row>
              <Col className='d-flex justify-content-center align-items-center' md={4}>
                   <Image style={{ maxWidth: '100%', height: 'auto' }}  src={Testimage} alt='testimage'/>
              </Col>

              <Col style={{marginLeft:50}} md={6}>
                   test
              </Col>
           
            </Row>  
    </Container>
  )
}
