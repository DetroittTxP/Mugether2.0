import React, { useEffect, useState, useContext } from 'react'
import { Navbar, Container, Nav, NavDropdown, Table, Image, Button, Tab, Tabs } from 'react-bootstrap';
import './adminpage.css'
import axios from 'axios';
import { Muplace_Context } from '../../context/MuContext';
import swal from 'sweetalert2';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const RegisGuideList = ({ setstate }) => {
  const { SERVER_URL } = useContext(Muplace_Context)
  const [regislist, setRegislist] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageinfo, Setimageinfo] = useState([{ key: '', name: '' }])
  const [index, setIndex] = useState(0);
  const updateIndex = ({ index: current }) => setIndex(current);


  useEffect(() => {
    axios.get(`${SERVER_URL}/admin/listregisguide`)
      .then(res => {
        setRegislist(res.data.filter(data => data.status === 'pending'));
        setstate(res.data)
      })
      .catch(err => {
        return alert(err)
      })
  }, [])



  const deleteee = async (id, id_user, email) => {
    swal.fire({
      icon: 'question',
      text: 'ต้องการลบรายชื่อสมัครไกด์ ? ',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: 'orange'
    })
      .then(async res => {

        if (!res.isConfirmed) return;

        let deleteee = await axios.delete(`${SERVER_URL}/admin/listregisguide/delete/${id}/${id_user}/${email}`);

        if (deleteee.data.status === 'ok') {
          setRegislist(prev => prev.filter(data => data._id !== id));
          return swal.fire({
            icon: 'success',
            text: 'ลบรายชื่อสำเร็จ'
          })
        }

      })
  }


  const Accept = async (guide) => {


    let guide11 = {
      _id: guide.id_user,
      firstname: guide.firstname,
      lastname: guide.lastname,
      mu_location: guide.mu_place,
      contact: {
        tel: guide.tel,
        email: guide.email,
        lineID:guide.lineID || ""
      },
      guide_type:guide.guide_type
    }


    swal.fire({
      icon: 'question',
      text: 'ต้องการยืนยันการสมัครไกด์ ? ',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
      confirmButtonColor: 'orange'
    })
      .then(async res => {
        if (!res.isConfirmed) return;


        try {

          let okguide = await axios.post(`${SERVER_URL}/guide_detail/create_guide`, { guide: guide11 })
          console.log(okguide.data);
          if (okguide.data.status === 'success') {
            await swal.fire({
              text: 'ยืนยันไกด์สำเร็จ'
            })
            return window.location.reload();
          }
          else {
            return console.log(okguide.data);
          }
        }
        catch (err) {
          alert('err at accpet', err)
        }

      })
  }


  return (
    <Container >

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: `${SERVER_URL}/admin/listregisguide/image/${imageinfo.key}/${imageinfo.name}` },
        ]}
        index={index}
        on={{ view: updateIndex }}
      />



      <h1>รายชื่อคนสมัครไกด์</h1>
      <Table   responsive striped bordered hover style={{ overflow: 'hidden', whiteSpace: 'nowrap', }}  >
        <thead>
          <tr>
            {/* <th>Username ที่ใช้สมัคร</th> */}
            <th>ID ผู้ใช้งาน</th>
            <th>ประเภท</th>
            <th>ชื่อ</th>
            <th>อีเมล์</th>
            <th>ไอดีไลน์</th>
            <th>รหัสประจำตัว</th>
            <th>สถานที่มู</th>
            <th>รูปประจำตัว</th>
           
            <th>คำสั่ง</th>
            <th>สถานนะ</th>
          </tr>
        </thead>
        <tbody >
          {regislist.map((guide, id) => (
            <tr key={id}>
              <td>{guide.id_user}</td>
              <td>{guide.guide_type || '-'}</td>
              <td>{guide.firstname} - {guide.lastname}</td>
              <td>{guide.email}</td>
              <td>{guide.lineID || ' - '}</td>
              <td>{guide.id_card}</td>
              <td>
                <ul>
                  {guide.mu_place.map((places) => (
                    <li>{places}</li>
                  ))}
                </ul>
              </td>
              <td>
                <Image style={{ cursor: 'pointer' }} onClick={() => {
                  setOpen(true)
                  Setimageinfo({
                    key: guide.id_user,
                    name: guide.image_guide
                  })
                }} width={100} height={100} src={`${SERVER_URL}/admin/listregisguide/image/${guide.id_user}/${guide.image_guide}`} />
              </td>
              <td>
                <Button onClick={() => Accept(guide)} variant="success" size="small" >
                  ยืนยัน
                </Button>
                {' '}
                <Button onClick={() => deleteee(guide._id, guide.id_user, guide.email)} variant="danger" size="small" >
                  ปฏิเสธ
                </Button>
              </td>
              <td>
                {guide.status === 'accept' ? 'ยืนยันสำเร็จ' : 'รอการยืนยัน'}
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
    </Container>

  )
}


const Accpetlist = ({ list }) => {
  const { SERVER_URL } = useContext(Muplace_Context)
  const [open, setOpen] = useState(false);
  const [imageinfo, Setimageinfo] = useState([{ key: '', name: '' }])
  const [index, setIndex] = useState(0);
  const updateIndex = ({ index: current }) => setIndex(current);



  return (
    <Container>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: `${SERVER_URL}/admin/listregisguide/image/${imageinfo.key}/${imageinfo.name}` },
        ]}
        index={index}
        on={{ view: updateIndex }}
      />

      <Table style={{ textAlign: 'center', overflow: 'hidden', whiteSpace: 'nowrap' }} striped bordered hover>
        <thead>
          <th>ID ผู้ใช้งาน</th>
          <th>ประเภท</th>
          <th>ชื่อ</th>
          <th>อีเมล์</th>
          <th>รหัสประจำตัว</th>
          <th>สถานที่มู</th>
          <th>รูปประจำตัว</th>
          <th>ไอดีไลน์</th>
          <th>สถานนะ</th>
        </thead>

        <tbody>
          {list.map((guide, id) => (
            <tr key={id}>
              <td>{guide.id_user}</td>
              <td>{guide.guide_type || '-'}</td>
              <td>{guide.firstname} {' '} {guide.lastname}</td>
              <td>{guide.email}</td>
              <td>{guide.id_card}</td>
              <td>{guide.lineID || ' - '}</td>
              <td>
                <ul>
                  {guide.mu_place.map((places) => (
                    <li>{places}</li>
                  ))}
                </ul>
              </td>

              <td>
                <Image style={{ cursor: 'pointer' }} onClick={() => {
                  setOpen(true)
                  Setimageinfo({
                    key: guide.id_user,
                    name: guide.image_guide
                  })
                }} width={100} height={100} src={`${SERVER_URL}/admin/listregisguide/image/${guide.id_user}/${guide.image_guide}`} />
              </td>
              <td>ยืนยันการสมัครเเล้ว </td>

            </tr>
          ))}
        </tbody>

      </Table>
    </Container>
  )
}


export default function Adminpage() {
  const [list, setlist] = useState([]);


  const setstate = (state) => {
    setlist(state);
  }



  return (
    <div>
      <Tabs defaultActiveKey='pendingConfirmation'>
        <Tab eventKey="pendingConfirmation" title="กำลังรอการยืนยันไกด์">
          <RegisGuideList setstate={setstate} />
        </Tab>
        <Tab eventKey="confirmed" title="ยืนยันแล้ว">
          <Accpetlist list={list.filter(e => e.status === 'accept')} />
        </Tab>

      </Tabs>


    </div>

  )
}
