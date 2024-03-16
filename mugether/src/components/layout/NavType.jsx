
import React, { useState, useRef } from 'react';
import { Nav, } from 'react-bootstrap';
import {useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

export default function NavType({SelectedTypeMu,show_guide}) {
  const location = useLocation()
  const [showguide,Setshowguide] = useState(true);
  const guideRef = useRef(null);

  

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

  ]

  const typeMudetail = [
    {
      type: 'ไกด์',
      icon: 'https://cdn-icons-png.flaticon.com/128/2953/2953363.png',
      path: '/guide',
      fn: () => {
        show_guide(showguide);
        if(showguide && guideRef.current){
          scroll.scrollTo(guideRef.current.offsetTop + 500 ,{
            smooth: false,
          });
        }
      }
    },
   
    {
      type: 'ร้านค้า',
      icon: 'https://cdn-icons-png.flaticon.com/128/1584/1584911.png',
      path: '/shop',
      // fn: () => {
      //   show_guide(showguide);
      //   if(showguide && guideRef.current){
      //     scroll.scrollTo(guideRef.current.offsetTop + 500 ,{
      //       smooth: true,
      //     });
      //   }
      // }
    }
  ]
  
  let type1= () => {
     if(location.pathname ==='/'){
      return typeMu;
     }
     else{
      return typeMudetail;
     }
  }

  let type = type1();

  return (
    <div>
      <br/>
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
            onClick={() => {
                Setshowguide(!showguide)
                data.fn();
            }}
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
      <div ref={guideRef}></div>
    </div>
    
  );
}



