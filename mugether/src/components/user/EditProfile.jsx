import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Container, Row, Col ,Tab,Tabs} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import ReactCrop, { centerCrop, convertToPixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './EditProfile.css'
import { makeAspectCrop } from 'react-image-crop';
import setCanvasPreview from '../util/setCanvasPreview';




export default function EditProfile({ showedit, toggle, editType }) {
  const [visible, setvisible] = useState(false);
  const userID = localStorage.getItem('usr_id');
  const shopID = localStorage.getItem('shop_id');
  const [show, Setshow] = useState(false)

  const [selectedfile, Setfile] = useState(null)
  const username = localStorage.getItem('usr')
  const [editdata, Seteditdata] = useState({ username: username });

  const [editGuide, setEditguide] = useState({ user_id: userID });



  const [editShop, setShop] = useState({ 
    user_id: userID,
    shop_name:null ,
    shop_detail:{
        detail:null ,
        opening:null
    },
    contact:{
        tel:null ,
        address:null ,
        email:null
    },
    profile_shop_pic:null
   });


  const [imgSrc, SetImgSrc] = useState('')
  const [crop, Setcrop] = useState(null)
  const imgRef = useRef(null)
  const canvasRef = useRef(null)









  const MIN_DIMENSION = 150;
  const ASPECT_RATIO = 1;

  const submit_edit = async (e) => {
    e.preventDefault();
    console.log(selectedfile);
    const formData = new FormData();
    formData.append('profile_img', selectedfile);


    try {
      Swal.fire({
        title: 'Loading...',
        html: 'Please wait',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      })

      let update_img, update_usr
      if (editType === 'user') {

          if(selectedfile){
          update_img = await axios.post(`http://localhost:5353/upload-img/user/profile/${username}`, formData);
          }
     
        update_usr = await axios.put(`http://localhost:5353/user/update/profile/`, { editdata })
      }
      else if (editType === 'guide') {
        if(selectedfile){
        update_img = await axios.post(`http://localhost:5353/guide_detail/upload_profile_guide/${userID}`, formData);
         }
        update_usr = await axios.put(`http://localhost:5353/guide_detail/update_profile/${userID}`, {
          editGuide,
          profile_pic: update_img.data.filename
        })
      } else if (editType === 'shop') {
            let filenamne = null;
           if(selectedfile){
                update_img = await axios.post(`http://localhost:5353/shop/upload-edit-profile/${shopID}`, formData)
                filenamne = update_img.data.filename
           }
       
           update_usr = await axios.put(`http://localhost:5353/shop/edit-profile/${userID}`, {
            editShop,
            filename:filenamne
           })
           console.log(update_usr);
      }  


      Swal.close();

      await Swal.fire({
        icon: 'success',
        title: 'Success'
      })

      console.log(update_usr.data);
      console.log(update_img);
    }
    catch (err) {
      alert(err)
    }


  }

  const switchForm = () => {
    switch (editType) {
      case 'user':
        return (
          <>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type={visible ? "text" : "password"}
                    placeholder="🔒  "
                    onChange={onFormchange}
                  />
                  <div className="password-toggle-edit"
                    onClick={() => setvisible(!visible)}>
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}

                  </div>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="re password">
              <Form.Label>Re-password</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type={visible ? "text" : "password"}
                    placeholder="🔒  "
                  />
                  <div className="password-toggle-edit"
                    onClick={() => setvisible(!visible)}>
                    {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}

                  </div>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="text"
                placeholder="✉️  "
                onChange={onFormchange}
              />
            </Form.Group>
          </>
        )
      case 'guide':
        return (
          <>
            
            <Form.Group controlId="firstname">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="✉️  "
                    onChange={onGuideChange}
                  />
                </Form.Group>

              <Form.Group controlId="lastname">
                <Form.Label>lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="✉️  "
                  onChange={onGuideChange}
                />
              </Form.Group>
        </>
        )
      case 'shop':
          return(
            <>
            <Form.Group controlId="shop_name">
              <Form.Label>shopname</Form.Label>
              <Form.Control
                type="text"
                placeholder="🛍️  "
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="detail">
              <Form.Label>shopdetail</Form.Label>
              <Form.Control
                as = "textarea" rows={3}
                placeholder="📃 รายละเอียดของร้านค้า "
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="opening">
              <Form.Label>opening</Form.Label>
              <Form.Control
                type="text"
                placeholder="🕐 เวลาเปิด - ปิด "
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="tel">
              <Form.Label>telephone</Form.Label>
              <Form.Control
                type="text"
                placeholder="☎️ หมายเลขโทรศัพท์ "
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="address">
              <Form.Label>address</Form.Label>
              <Form.Control
                type="text"
                placeholder="📍 ที่อยู่ "
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="email">
              <Form.Label>email</Form.Label>
              <Form.Control
                type="text"
                placeholder="✉️ อีเมล์ "
                onChange={onShopchange}
              />
            </Form.Group>
   
          </>
          )
    }
  }


  const onGuideChange = (e) => {
    setEditguide((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }


  const onShopchange = (e) => {
    setShop((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }



  const handleFileChange = (event) => {
    Setfile(event.target.files[0])
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {


      const imageUrl = reader.result.toString() || "";

      const imageElement = new Image();
      imageElement.src = imageUrl;

      imageElement.addEventListener('load', (event) => {
        const { naturalWidth, naturalHeight } = event.currentTarget;

        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          Swal.fire('Image must > min');
          SetImgSrc("");
          return;
        }
      })
      console.log(imageUrl);
      SetImgSrc(imageUrl)
    });
    reader.readAsDataURL(file);

  };

  const onImageLoad = (event) => {
    const { width, height } = event.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      }, ASPECT_RATIO,
      width,
      height

    );
    const centeredCrop = centerCrop(crop, width, height);
    Setcrop(centeredCrop)
  }

  const onFormchange = (e) => {
    Seteditdata(prev => {
      return {
        ...prev,
        [e.target.id]: e.target.value
      }
    })
  }

  const dataURLtoFile = (dataurl, filename) => {

    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    let blob = new Blob([u8arr], { type: mime });

    let file = new File([blob], filename, { type: mime });
    return file;
  }




  useEffect(() => {
    Setshow(showedit)
  }, [showedit])

  return (


    <Modal show={show} animation={false}>

      <Form onSubmit={submit_edit}>
        <Modal.Header >
          <Modal.Title>

            {
              (editType == 'guide' ? "Edit profile Guide" :
                (editType == 'shop' ? "Edit Profile shop" : "Edit profile"))
            }

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="profile_pic">
            <Form.Label>Profile image</Form.Label>
            <Form.Control
              type="file"
              accept='image/*'
              onChange={handleFileChange}
            />

            {imgSrc && <ReactCrop
              onChange={(pixelCrop, percentCrop) => Setcrop(percentCrop)}
              crop={crop}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
            >
              <img onLoad={onImageLoad} ref={imgRef} src={imgSrc} alt='upload' />

            </ReactCrop>}
             <br/>
             
            { crop && <Button variant='warning' onClick={() => {
              setCanvasPreview(
                imgRef.current,
                canvasRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              )
              const dataURL = canvasRef.current.toDataURL()
              const n = `${localStorage.getItem('usr')}.png`
              const imagefile = dataURLtoFile(dataURL, n)
              Setfile(imagefile);
            }}>
              Crop image
            </Button>}
            
            {crop &&
              <canvas ref={canvasRef} className='mt-4 ms-5'
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: 150,
                  height: 150,
                  borderRadius: "50%"
                }} />

            }
        
          </Form.Group>

          <br />
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="👤  "
              disabled
              value={username}
              onChange={onFormchange}
            />
          </Form.Group>

          {switchForm()}

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            Setshow(false);
            toggle(false)
            editType = null;
          }} variant="secondary" >
            Close
          </Button>

          <Button type="submit"  variant='warning'  >
            Save Changes
          </Button >

        </Modal.Footer>
      </Form>
    </Modal>


  )
}
