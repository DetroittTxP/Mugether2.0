import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function EditProfile({ showedit, toggle }) {

  const [show, Setshow] = useState(false)
  const [selectedfile, Setfile] = useState(null)
  const username = localStorage.getItem('usr')
  const [editdata, Seteditdata] = useState({username:username});
  const submit_edit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('profile_img', selectedfile);
    
    try{
      Swal.fire({
        title: 'Loading...',
        html: 'Please wait',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      })
        
        let update_img = await axios.post(`http://localhost:5353/upload-img/user/profile/${username}`,formData);
        let update_usr = await axios.put(`http://localhost:5353/user/update/profile/`,{editdata})
        Swal.close();

        await Swal.fire({
          icon: 'success',
          title: 'Success'
        })

        console.log(update_usr.data);
        console.log(update_img);
    }
    catch(err){
      alert(err)
    }
  


  }


  const handleFileChange = (event) => {
    Setfile(event.target.files[0])
    
    // let rename = Date.now() +  username + event.target.files[0].name
    // Seteditdata(prev => {
    //   return {
    //     ...prev,
    //     profile_pic:rename
    //   }
    // })
  };

  const onFormchange=(e)=>{
    Seteditdata(prev => {
      return {
        ...prev,
        [e.target.id]:e.target.value
      }
    })
  }



  useEffect(() => {
    Setshow(showedit)
  }, [showedit])

  return (


    <Modal show={show}  animation={false}>

      <Form onSubmit={submit_edit}>
        <Modal.Header >
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="profile_pic">
            <Form.Label>Profile image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
            />
          </Form.Group>

          <br />
          <Form.Group  controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="👤  "
              disabled
              value={username}
              onChange={onFormchange}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="👤  "
              onChange={onFormchange}
            />
          </Form.Group>

          <Form.Group controlId="re password">
            <Form.Label>Re-password</Form.Label>
            <Form.Control
              type="text"
              placeholder="👤  "


            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="text"
              placeholder="👤  "
              onChange={onFormchange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            Setshow(false);
            toggle(false)
          }} variant="secondary" >
            Close
          </Button>

          <Button type="submit" variant="primary" >
            Save Changes
          </Button >

        </Modal.Footer>
      </Form>
    </Modal>


  )
}
