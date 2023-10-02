
import React from 'react';
import { Nav, Container } from 'react-bootstrap';

export default function NavType({SelectedType}) {
  
  const type = [
    {
      type: 'โชคลาภ',
      icon: 'https://cdn-icons-png.flaticon.com/512/6584/6584542.png'
    },
    {
      type: 'การเงิน',
      icon: 'https://cdn-icons-png.flaticon.com/128/2953/2953363.png'
    },
    {
      type: 'การงาน',
      icon: 'https://cdn-icons-png.flaticon.com/128/1584/1584911.png'
    },
    {
      type: 'ความรัก',
      icon: 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png'
    },
    {
      type: 'สุขภาพ',
      icon: 'https://cdn-icons-png.flaticon.com/128/2966/2966334.png'
    },
    {
      type: 'การเรียน',
      icon: 'https://cdn-icons-png.flaticon.com/128/29/29302.png'
    },
    {
      type: 'การเดินทาง',
      icon: 'https://cdn-icons-png.flaticon.com/128/3097/3097136.png'
    },
  ]

  return (
    <Nav
    className='justify-content-center'
    variant="underline"
    onSelect={(selectedKey) => SelectedType(selectedKey)}
    style={{  display: 'flex', justifyContent: 'center' }}
  >
    {type.map((data, index) => (
      <Nav.Item
        style={{
          marginRight: index < type.length - 1 ? '120px' : '0', 
          marginTop: '50px', // ขยับ NavType ลงมา
        }}
        key={data.type}
      >
        <div style={{ textAlign: 'center' }}>
          <img height={40} width={40} src={data.icon} alt={data.type} />
          <Nav.Link eventKey={data.type} style={{ color: 'black' }}>
            {data.type}
          </Nav.Link>
        </div>
      </Nav.Item>
    ))}
  </Nav>
  );
}
