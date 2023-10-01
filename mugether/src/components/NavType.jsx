
import React from 'react';
import { Nav, Container } from 'react-bootstrap';

export default function NavType({SelectedType}) {
  
  const type = [
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
      type: 'โชคลาภ',
      icon: 'https://cdn-icons-png.flaticon.com/128/10197/10197782.png'
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
    style={{ marginLeft: 40, display: 'flex', justifyContent: 'center' }}
  >
    {type.map(data => (
      <Nav.Item style={{ marginRight: '120px' }} key={data.type}>
        <div style={{ textAlign: 'center' }}>
          <img height={40} width={40} src={data.icon} alt={data.type} />
          <Nav.Link eventKey={data.type} style={{ color: 'black' }}>{data.type}</Nav.Link>
        </div>
      </Nav.Item>
    ))}
  </Nav>
  );
}
