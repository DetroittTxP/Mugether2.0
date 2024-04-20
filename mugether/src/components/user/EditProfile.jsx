import React, { useEffect, useRef, useState,useContext } from 'react'
import { Modal, Button, Form, Container, Row, Col ,Tab,Tabs} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import ReactCrop, { centerCrop, convertToPixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import './EditProfile.css'
import { makeAspectCrop } from 'react-image-crop';
import setCanvasPreview from '../util/setCanvasPreview';
import {Muplace_Context} from '../../context/MuContext'
import { LineIcon } from 'react-share'
const lineIcon = <LineIcon className='share-icon' href='https://qr-official.line.me/sid/L/026gkuxb.png' size={32} round={true} />

export default function EditProfile({ showedit, toggle, editType }) {
  const {SERVER_URL} = useContext(Muplace_Context)
  const [visible, setvisible] = useState(false);
  const userID = localStorage.getItem('usr_id');
  const shopID = localStorage.getItem('shop_id');
  const [show, Setshow] = useState(false)
  const [selectedfile, Setfile] = useState(null)
  const username = localStorage.getItem('usr')
  const [editdata, Seteditdata] = useState({ username: username });

  const [editGuide, setEditguide] = useState({ 
    user_id: userID
   });

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
  const showcanvas = useRef(0);



  const MIN_DIMENSION = 150;
  const ASPECT_RATIO = 1;
  const submit_edit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('profile_img', selectedfile);
    try {
      Swal.fire({
        title: 'กำลังโหลด...',
        html: 'โปรดรอสักครู่',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      })
      let update_img, update_usr
      if (editType === 'user') {

          if(selectedfile){
          update_img = await axios.post(`${SERVER_URL}/upload-img/user/profile/${username}`, formData);
          }
     
        update_usr = await axios.put(`${SERVER_URL}/user/update/profile/`, { editdata })
      }
      else if (editType === 'guide') {
        if(selectedfile){
             update_img = await axios.post(`${SERVER_URL}/guide_detail/upload_profile_guide/${userID}`, formData);
         }
        update_usr = await axios.put(`${SERVER_URL}/guide_detail/update_profile/${userID}`, {
          editGuide,
          profile_pic: (selectedfile ? update_img.data.filename : null)
        })
      } else if (editType === 'shop') {
            let filenamne = null;
           if(selectedfile){
                update_img = await axios.post(`${SERVER_URL}/shop/upload-edit-profile/${shopID}`, formData)
                filenamne = update_img.data.filename
           }
           update_usr = await axios.put(`${SERVER_URL}/shop/edit-profile/${userID}`, {
            editShop,
            filename:filenamne || null
           })
        
      }  
      Swal.close();
      
      await Swal.fire({
        
        icon: 'success',
        title: 'สำเร็จ',
        style: {
          zIndex: 1051 
        }
      })
    }
    catch (err) {
      alert(err,'123123')
    }
  }





  
  const switchForm =  () => {

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
                    placeholder="🔒 รหัสผ่านใหม่  "
                    onChange={onFormchange}
                    pattern='/^[A-Z][a-zA-Z0-9]{7,}$/'
                    title='รหัสผ่านต้องประกอบด้วย: รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วย 1 ตัวพิมพ์ใหญ่ 1 ตัวพิมพ์เล็ก 1 ตัวเลข'
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
                    placeholder="🔒 ยืนยันรหัสผ่านใหม่ "
                    pattern='/^[A-Z][a-zA-Z0-9]{7,}$/'
                    title='รหัสผ่านต้องประกอบด้วย: รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร ประกอบด้วย 1 ตัวพิมพ์ใหญ่ 1 ตัวพิมพ์เล็ก 1 ตัวเลข'
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
                placeholder="✉️  อีเมลใหม่"
                onChange={onFormchange}
              />
            </Form.Group>
          </>
        )
      case 'guide':
        return (
          <>
            
            <Form.Group controlId="firstname">
                  <Form.Label>ชื่อจริง</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="✉️ ชื่อจริง"
                    onChange={onGuideChange}
                  />
                </Form.Group>

              <Form.Group controlId="lastname">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="✉️ นามสกุล"
                  onChange={onGuideChange}
                />
              </Form.Group>
              <Form.Group controlId="tel">
                <Form.Label>เบอร์โทร</Form.Label>
                <Form.Control
                  placeholder='เบอร์โทร'
                  type="text"
                  onChange={onGuideChange}
                />
              </Form.Group>

              <Form.Group controlId="lineID">
    
                <Form.Label>ไอดีไลน์</Form.Label>
                <Form.Control
                  placeholder='ไอดีไลน์'
                  type="text"
                  onChange={onGuideChange}
                />
              </Form.Group>

              <Form.Group controlId="website">
                <Form.Label>ลิงค์เว็บไซต์</Form.Label>
                <Form.Control
                  placeholder='ลิงค์เว็บไซต์'
                  type="text"
                  onChange={onGuideChange}
                />
              </Form.Group>

              <Form.Group controlId="facebook">
                <Form.Label>เฟสบุ๊ค</Form.Label>
                <Form.Control
                    placeholder='ชื่อหรือลิงค์เฟสบุ๊ค'
                  type="text"
                  onChange={onGuideChange}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>อีเมล์</Form.Label>
                <Form.Control
                  placeholder='อีเมล'
                  type="text"
                  onChange={onGuideChange}
                />
              </Form.Group>
        </>
        )
      case 'shop':
          return(
            <>
            <Form.Group controlId="shop_name">
              <Form.Label>ชื่อร้านค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="🛍️ ชื่อร้านค้า"
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="detail">
              <Form.Label>รายละเอียดร้านค้า</Form.Label>
              <Form.Control
                as = "textarea" rows={3}
                placeholder="📃 รายละเอียดของร้านค้า "
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="opening">
              <Form.Label>เวลาเปิด-ปิด</Form.Label>
              <Form.Control
                type="text"
                placeholder="🕐 เวลาเปิด - ปิด เช่น จ-ศ 9:00am - 5:00pm"
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="tel">
              <Form.Label>เบอร์โทรสัพ</Form.Label>
              <Form.Control
                type="text"
                placeholder="☎️ หมายเลขโทรศัพท์ เช่น 08x-xxx-xxxx"
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="address">
              <Form.Label>ที่อยู่ร้านค้า</Form.Label>
              <Form.Control
                type="text"
                placeholder="📍 ที่อยู่ (ถ้าไม่มีหน้าร้านให้ใส่ว่าหน้าร้านออนไลน์)"
                onChange={onShopchange}
              />
            </Form.Group>
  
            <Form.Group controlId="email">
              <Form.Label>อีเมลล์</Form.Label>
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
          Swal.fire('รูปภาพต้องมีขนาดมากกว่า 150 pixels');
          SetImgSrc("");
          return;
        }
      })
   
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


    <Modal style={{zIndex:1050}}  show={show} animation={false}>

      <Form  onSubmit={submit_edit}>
        <Modal.Header >
          <Modal.Title>

            {
              (editType == 'guide' ? "แก้ไขโปรไฟล์ไกด์" :
                (editType == 'shop' ? "แก้ไขโปรไฟล์ร้านค้า" : "แก้ไขโปรไฟล์ผู้ใช้"))
            }

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group controlId="profile_pic">
            <Form.Label>รูปภาพโปรไฟล์</Form.Label>
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
             
            { crop&&  <Button variant='warning' onClick={() => {
            
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
               Crop Image
            </Button>}
            
            {crop  && 
              <canvas ref={canvasRef} className='mt-4 ms-2'
                style={{
                  border: "1px ",
                  objectFit: "contain",
                  width: 150,
                  height: 150,
                  borderRadius: "50%"
                }} />

            }
            <br/>
        
          </Form.Group>

          <br />
          <Form.Group controlId="username">
            <Form.Label>ชื่อผู้ใช้งาน</Form.Label>
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
            ปิด
          </Button>

          <Button type="submit"  variant='warning'  >
            บันทึกการแก้ไข
          </Button >

        </Modal.Footer>
      </Form>
    </Modal>


  )
}
