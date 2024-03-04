import React, { useState } from 'react'
import axios from 'axios';
import { Form,Modal,Button } from 'react-bootstrap'
import Swal from 'sweetalert2';
import SwalLoading from '../util/SwalLoading';

export default function Add_post() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const muplace = localStorage.getItem('muplace')
    const usr_id = localStorage.getItem('usr_id')
    const [post,Setpost] = useState({muplace:muplace});



    const SelectPicture = (event) => {
        for(let i =0;i<event.target.files.length;i++){
            let file = event.target.files[i];

            if(!file.type.startsWith('image/'))
            {
                event.target.value = null;
                return alert('please upload image only')
            }

    }
        if (event.target.files.length != 5) {
            alert("You can only upload a maximum of 5 images.");
            event.target.value = null; // Reset the file input
        } else {
            setSelectedFiles([...event.target.files]);
        }
    };

  

    const SubmitPost=async(event)=>{
        event.preventDefault();
        const img_data = new FormData();
        
        if(selectedFiles.length === 0 || selectedFiles.length !=5)
        {
            return alert('โปรดอัพรูปก่อนโพสต์ไกด์')
        }
        for(let i =0 ;i<selectedFiles.length;i++)
        {
            img_data.append('posts-img',selectedFiles[i]);
        }

  
        try{
            SwalLoading();
            
            let inserted_image = await axios.post(`http://localhost:5353/upload-img/guide/post/${usr_id}`,img_data);
            const {photos} = inserted_image.data
            let update_post_detail = await axios.post(`http://localhost:5353/guide_detail/create_post/${usr_id}`,{post,photos})
           console.log(update_post_detail);
            Swal.close();
        }
        catch(err)
        {
            alert(err)
        }
        
    }

    const onChange = (event) => {
        
        Setpost((data) => {
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
            <Form.Group  className="mb-3" controlId='postPhotos'>
                <Form.Label>เพิ่มรูปภาพของคุณ (ไม่เกิน 5 รูป)</Form.Label>
                <Form.Control type="file" accept='image/jpeg' multiple onChange={SelectPicture} />
            </Form.Group>
            <Modal.Footer>
                        
            <Button type='submit' variant="primary">Post</Button>
            </Modal.Footer>
        </Form>
    )
}
