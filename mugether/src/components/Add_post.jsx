import React, { useState } from 'react'
import axios from 'axios';
import { Form } from 'react-bootstrap'

export default function Add_post() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const muplace = localStorage.getItem('muplace')
    const [detail,Setdetail] = useState({});



    const SelectPicture = (event) => {
        
        if (event.target.files.length > 5) {
            alert("You can only upload a maximum of 5 images.");
            event.target.value = null; // Reset the file input
        } else {
            setSelectedFiles([...event.target.files]);
        }
    };

    const SubmitPost=(event)=>{
        event.preventDefault();
        ////เดะมาทำต่อ
    }

    const onChange = (event) => {
        Setdetail((data) => {
          return {
            ...data,
            [event.target.id]: event.target.value
    
          }
        }
        )
      }

    return (
        <Form onSubmit={SubmitPost}>
            <Form.Group controlId='muPlace'>
                <Form.Control type='hidden' value={muplace}/>
            </Form.Group>
            <Form.Group controlId="postDetail">
                <Form.Label>รายละเอียดกิจกรรม</Form.Label>
                <Form.Control onChange={onChange} as="textarea" rows={3} />
            </Form.Group>
            <Form.Group  className="mb-3">
                <Form.Label>เพิ่มรูปภาพของคุณ (ไม่เกิน 5 รูป)</Form.Label>
                <Form.Control type="file" multiple onChange={SelectPicture} />
            </Form.Group>
        </Form>
    )
}
