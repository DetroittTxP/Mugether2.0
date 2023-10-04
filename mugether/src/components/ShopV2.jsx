import React from 'react'
import { Nav, Container, Col,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import './Shop.css';

export default function ShopV2() {

  const type = [
    {
      type: 'Home',
      icon: 'https://cdn-icons-png.flaticon.com/128/2549/2549900.png'
    },
    {
      type: 'Guide',
      icon: 'https://cdn-icons-png.flaticon.com/128/9636/9636012.png'
    },
    {
      type: 'รับจ้างมู',
      icon: 'https://cdn-icons-png.flaticon.com/128/1830/1830368.png'
    },
    {
      type: 'ร้านค้าของมู',
      icon: 'https://cdn-icons-png.flaticon.com/128/2981/2981011.png'
    },
  ]

  const shoplist = [
    {
      productImage: "https://down-th.img.susercontent.com/file/th-11134207-7r98o-lkosofyofpwe20",
      productName: "พระพิฆเนศปางเสวยสุข แถมฟรี❗️หนูมุสิกะ 1 ตัว"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/930a3347af2a1cca20fdba87460681f2",
      productName: "ท้าวเวสสุวรรณโณ พร้อมตลับ วัดจุฬามณี"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/4e701f668b5f84dc88a9e4449b16a253",
      productName: "องค์พระพิฆเนศประทับพญานาค องค์พระพิฆเนศ"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/th-11134207-7qukw-leqpqvb565ha9d",
      productName: "เท้าเวสสุวรรณโน วัดจุฬามณี"
    },
    // ----------------------------------------
    {
      productImage: "https://down-th.img.susercontent.com/file/th-11134207-7qukz-lkfchlc6uvzvf4",
      productName: "ของไหว้ถวายพระพิฆเนศ ชุดคู่เนยกี +น้ำผึ้งป่า ถวายองค์เทพ"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/th-11134207-7qul2-lkf7qkdmo0or9c",
      productName: "ของไหว้ถวายพระพิฆเนศ ชุดคู่ธัญพืช 9 ชนิด+ข้าวมลคล 9 สี"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/68d7a455631f7cd9e1e5b6b3afedf71b",
      productName: "พานของไหว้ ขนมโมทกะ ลาดู พานดินปั้น ถวายบูชาพระพิฆเนษ"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/51ed71b3b425121303ceb6c95abc64d3",
      productName: "แผ่นยันต์ทองแดง ยันต์มงกุฎพระพุทธเจ้า สุดยอดแห่งมหายันต์"
    },
    // ----------------------------------------
    {
      productImage: "https://down-th.img.susercontent.com/file/e3d2da81774733c1a035b2a81c494632",
      productName: "แผ่นเหล็กท้าวเวสสุวรรณ ท้าวเวสสุวัณ แผ่นโลหะองค์ท้าวเวสสุวรรณ"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/0e84bea9f3308414e61d81a991f7353f",
      productName: "น้ำมันอิ้นคู่ ปลุกเสก❤️‍🔥"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/80e4602ba5d5361d7f4def7471a833bc",
      productName: "พระวางหน้ารถ พระ ครอบแก้ว ท้าวเวสสุวรรณ"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/3cb8f41ae41711aacfc05b5450e3c9f0",
      productName: "ธนบดีเซรามิค ชุดบูชาพระ บายศรี ล้านนา 2 White ชุดสำหรับหิ้งพระ ชุดจัดโต๊ะหมู่บูชา"
    },
    // ----------------------------------------
    {
      productImage: "https://down-th.img.susercontent.com/file/th-11134207-23010-v0o7ikuronmv46",
      productName: "เบี้ยแก้สแตนเลสแท้ บรรจุ ปรอทปลุกเสก กันของเข้าตัว"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/sg-11134201-22110-sbjz3ma2aekvce",
      productName: "ดาบเหล็กน้ำพี้แท้จิ๋ว"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/th-11134207-7r991-llagdoremp7w9f",
      productName: "บ่วงนาคบาศ 2 เศียรทองเหลืองแท้ ราคาส่ง"
    },
    {
      productImage: "https://down-th.img.susercontent.com/file/d96beaffda811e1af006fc435753c5b5",
      productName: "พญานาคราช พญานาค องค์เล็กจิ๋ว ขนาด 1 นิ้ว พกพาได้ เนื้อทองเหลือง รายละเอียดครบ"
    },
  ]




  return (
    <div>
      <Nav
        className='justify-content-center'
        variant="underline"
        onSelect={(selectedKey) => {
          alert(`selected ${selectedKey}`);
          SelectedType(selectedKey);



        }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
   
        {/* nav type */}
        {type.map((data, index) => (
          <Nav.Item
            style={{
              marginRight: index < type.length - 1 ? '90px' : '0',
              marginTop: '10px', // ขยับ NavType ลงมา
            }}
            key={data.type}
          >
            <div style={{ textAlign: 'center' }}>



              <Nav.Link eventKey={data.type} style={{ color: 'black' }}>
                <img style={{ marginBottom: 15 }} height={30} width={30} src={data.icon} alt={data.type} />
                <br />

                {data.type}
              </Nav.Link>

            </div>
          </Nav.Item>
        ))}
      </Nav>
      <br/>

      <br />
      <br />




      {/*  SHOP LIST   */}


      <Container style={{ display: 'flex', justifyContent: 'center' }}>

        <Row style={{ justifyContent: 'center' }}>
          {shoplist.map((data,index) => {
            let top = index > 3 ? { marginTop: 100 } : {};

            return (
              <Col style={top} md={3}>
                <a href='#ken'>
                  <img onClick={() => alert(`มึงกำลังคลิก ${data.productName}`)} style={{ borderRadius: 20 }} width={300} height={300} alt={data.name} src={data.productImage} />
                </a>

                <br />
                <br />

                <div style={{ fontFamily: "Sarabun" }}>
                  <h5>{data.productName}</h5>
                  <FaHeart style={{ color: 'red' }} />
                </div>


              </Col>
            )
          })}
        </Row>


      </Container>

      {/* <div className='card_container'>
         <Card style={{ width: '15em' }}>
      <Card.Img variant="top" src="https://down-th.img.susercontent.com/file/th-11134207-7r98o-lkosofyofpwe20" />
      <Card.Body>
        <Card.Title>พระพิฆเนศปางเสวยสุข แถมฟรี❗️หนูมุสิกะ 1 ตัว</Card.Title>
        <Card.Text>
          จังหวัดลำปาง
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '15em' }}>
      <Card.Img variant="top" src="https://down-th.img.susercontent.com/file/930a3347af2a1cca20fdba87460681f2" />
      <Card.Body>
        <Card.Title>ท้าวเวสสุวรรณโณ พร้อมตลับ วัดจุฬามณี </Card.Title>
        <Card.Text>
          จังหวัดนครนายก
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '15em' }}>
      <Card.Img variant="top" src="https://down-th.img.susercontent.com/file/th-11134207-7qukw-leqpqvb565ha9d" />
      <Card.Body>
        <Card.Title>เท้าเวสสุวรรณโน วัดจุฬามณี</Card.Title>
        <Card.Text>
           จังหวัดเลย
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>

    <Card style={{ width: '15em' }}>
      <Card.Img variant="top" src="https://down-th.img.susercontent.com/file/4e701f668b5f84dc88a9e4449b16a253" />
      <Card.Body>
        <Card.Title>องค์พระพิฆเนศประทับพญานาค องค์พระพิฆเนศ</Card.Title>
        <Card.Text>
            จังหวัดอ่างทอง
        </Card.Text>
        <Button variant="primary">More</Button>
      </Card.Body>
    </Card>
      
    </div> */}


    </div>
  )
}
