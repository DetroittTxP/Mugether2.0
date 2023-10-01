import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Row,Col,Container} from 'react-bootstrap'
export default function Listitem() {

  const [List_Of_Mu,Setlistofmu] = useState([]);

  useEffect(() => {

  },[])
  

////////////////////////ทำเป็น เเถว เเถวละ  3 หรือมากกว่านั้นิดหน่อย รูปจนกว่าจะหมดทุกรูป
  return (
    <Container fluid>
         <Row>
             <Col className='bg-success' sm={12}>
                  Area 1 
             </Col>
             <Col className='bg-danger' sm={6}>
                  Area 1 
             </Col>
         </Row>
    </Container>
  )
}
