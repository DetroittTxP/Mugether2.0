import React, { useEffect, useState } from 'react'
import { Modal,Button } from 'react-bootstrap'


const Edit_form = () =>{

}



export default function EditProfile({showedit,toggle}) {

  const [show,Setshow] = useState(false)
   
  useEffect(() => {
     Setshow(showedit)
  },[showedit])

  return (
    <Modal show={show}  animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button onClick={() =>{
             Setshow(false);
             toggle(false)
          }}   variant="secondary" >
            Close
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button >
        </Modal.Footer>
      </Modal>
  )
}
