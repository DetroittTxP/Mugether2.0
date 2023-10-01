
import React from 'react';
import { Nav, Container } from 'react-bootstrap';

export default function NavType() {

  const type = [
    {
      type:'การเงิน'
    },
    {
      type:'การงาน'
    },
    {
      type:'ความรัก'
    },
    {
      type:'โชคลาภ'
    },
    {
      type:'สุขภาพ'
    },
    {
      type:'การเรียน'
    },
    {
      type:'การเดินทาง'
    },
  ]



  return (
    <Nav 
        className='justify-content-center' 
        variant="underline" 
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    
    
      >
      {type.map(data => (
        <Nav.Item style={{ marginRight: '50px' }}>
            <Nav.Link eventKey={data.type} style={{color:'black'}} >{data.type}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>


  );
}
