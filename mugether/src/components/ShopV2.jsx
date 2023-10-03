import React from 'react'
import { Nav, Container } from 'react-bootstrap';

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


  return (
    <div>
       <Nav
    className='justify-content-center'
    variant="underline"
    onSelect={(selectedKey) => {
        alert(`selected ${selectedKey}`);
        SelectedType(selectedKey);

        
        
    }}
    style={{  display: 'flex', justifyContent: 'center' }}
  >
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
            <img style={{marginBottom:15}} height={40} width={40} src={data.icon} alt={data.type} />    
            <br/>  
             
            {data.type}
          </Nav.Link>
          
        </div>
      </Nav.Item>
    ))}
  </Nav>
      
         
         

    </div>
  )
}
