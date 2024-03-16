import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Form, Modal, Button, Image, Carousel } from 'react-bootstrap'
import Swal from 'sweetalert2';
import SwalLoading from '../util/SwalLoading';

export default function Add_post() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const muplace = localStorage.getItem('muplace')
    const usr_id = localStorage.getItem('usr_id')
    const [post, Setpost] = useState({ muplace: muplace });
    const [activity, setactivity] = useState(Array.from({ length: 1 }).fill(''));
    const [imagePreview, SetimagePreview] = useState([]);

    useEffect(() => {
        setactivity(activity)
    }, [activity])

    const SelectPicture = async (event) => {
        const files = Array.from(event.target.files)

        if (files) {
            files.forEach(img => {
                const reader = new FileReader();

                reader.onload = (load) => {
                    const url = load.target.result;
                    SetimagePreview(prev => [...prev, url])
                }

                reader.readAsDataURL(img);
            })
        }

        for (let i = 0; i < event.target.files.length; i++) {
            let file = event.target.files[i];

            if (!file.type.startsWith('image/')) {
                event.target.value = null;
                return alert('please upload image only')
            }
        }

        if (event.target.files.length > 5) {
            alert("You can only upload a maximum of 5 images.");
            event.target.value = null; // Reset the file input
        } else {
            setSelectedFiles([...event.target.files]);
        }
    };



    const SubmitPost = async (event) => {
        event.preventDefault();
        const img_data = new FormData();

        if (selectedFiles.length === 0 || selectedFiles.length != 5) {
            return alert('โปรดอัพรูปก่อนโพสต์ไกด์')
        }
        for (let i = 0; i < selectedFiles.length; i++) {
            img_data.append('posts-img', selectedFiles[i]);
        }


        try {
            SwalLoading();

            let inserted_image = await axios.post(`http://localhost:5353/upload-img/guide/post/${usr_id}`, img_data);
            const { photos } = inserted_image.data
            let update_post_detail = await axios.post(`http://localhost:5353/guide_detail/create_post/${usr_id}`, { post, photos })
            console.log(update_post_detail);
            Swal.close();
            Swal.fire({
                icon: 'success',
                text: 'เพิ่มโพสสำเร็จ'
            })
        }
        catch (err) {
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

    const onAcitityChange = (e, index) => {
        const newdata = [...activity];
        newdata[index] = e.target.value;
        setactivity(newdata);

        Setpost(prev => {
            return {
                ...prev,
                [e.target.id]: activity
            }
        })

    }

    const onDeleteActivty = (i) => {
        setactivity(prev => prev.filter((v, index) => index !== i));
    }


    return (
        <div >


            <Form onSubmit={SubmitPost}>
                <Form.Group className="mb-3" controlId='postPhotos'>
                    <Form.Label>เพิ่มรูปภาพของคุณ (ไม่เกิน 5 รูป)</Form.Label>
                    <Form.Control type="file" accept='image/*' multiple onChange={SelectPicture} />
                </Form.Group>


                

                <Form.Group controlId='muPlace'>
                    <Form.Control type='hidden' value={muplace} />
                </Form.Group>

                <Form.Group controlId="postDetail">
                    <Form.Label>รายละเอียด</Form.Label>
                    <Form.Control onChange={onChange} as="textarea" rows={3} />
                </Form.Group>
                <br />
                <Form.Group className="mb-3" controlId='postActivity'>
                    <Form.Label>กิจกรรม</Form.Label>
                    {activity.map((data, index) => (
                        <div>

                            <div className="input-fields">
                                <Form.Control

                                    value={data}
                                    placeholder={index === 0 ? "เช่น พาไปดูลิงวัด" : null}
                                    onChange={(event) => onAcitityChange(event, index)}
                                    required
                                />

                                {index !== 0 &&
                                    <div key={index} onClick={() => onDeleteActivty(index)} className="password-toggle" >
                                        ลบ
                                    </div>}
                            </div>








                            {index !== activity.length - 1 && <br />}
                        </div>
                    ))}
                </Form.Group>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={() => setactivity([...activity, ''])} style={{ width: 75 }} variant='warning' className='push-actity'>+</Button>
                </div>

                <br />





                <Modal.Footer>

                    <Button type='submit' variant="warning">Post</Button>
                </Modal.Footer>
            </Form>
        </div>
    )
}



{/* <Form.Control type='text' 
                                        placeholder={index === 0 ? "เช่น พาไปดูลิงวัด" : null}  
                                        onChange={event => onAcitityChange(event,index)} >

                                            
                                          
                                        </Form.Control>

                
                          { index !== activity.length -1 && <br/>} */}