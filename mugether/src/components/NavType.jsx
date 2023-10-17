
import React from 'react';
import { Nav, Container } from 'react-bootstrap';
import { useNavigate,useLocation } from 'react-router-dom';

export default function NavType({SelectedTypeMu}) {
  const location = useLocation()


  const typeMu = [
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

  const typeMudetail = [
    {
      type: 'Guide',
      icon: 'https://cdn-icons-png.flaticon.com/128/2953/2953363.png',
      path: '/guide'
    },
    {
      type: 'รับจ้างมู',
      icon: 'https://cdn-icons-png.flaticon.com/128/1584/1584911.png',
      path: '/rubjark'
    },
    {
      type: 'ร้านค้า',
      icon: 'https://cdn-icons-png.flaticon.com/128/1584/1584911.png',
      path: '/shop'
    },
  ]
  

  let type1= () => {
     if(location.pathname ==='/'){
      return typeMu;
     }
     else{
      return typeMudetail;
     }
  }

  let type = type1()
  
  return (
    <Nav
    className='justify-content-center'
    variant="underline"
    onSelect={(selectedKey) => {

        SelectedTypeMu(selectedKey);
        
    }}
    style={{  display: 'flex', justifyContent: 'center' }}
  >
    {type.map((data, index) => (
      <Nav.Item
        style={{
          marginRight: index < type.length - 1 ? '110px' : '0', 
          marginTop: '50px', // ขยับ NavType ลงมา
        }}
        key={data.type}
      >
        <div style={{ textAlign: 'center' }}>

   
          
          <Nav.Link eventKey={data.type} style={{ color: 'black' }}>
            <img style={{marginBottom:15}} height={30} width={30} src={data.icon} alt={data.type} />    
            <br/>  
             
            {data.type}
          </Nav.Link>
          
        </div>
      </Nav.Item>
    ))}
  </Nav>
  );
}



