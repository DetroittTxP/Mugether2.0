import React, { useState, useRef } from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';


export default function NavType({ SelectedTypeMu, show_guide }) {
  const location = useLocation();
  const [showguide, Setshowguide] = useState(false);
  const guideRef = useRef(null);
  const navigate = useNavigate();

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
    }
  ];

  const typeMudetail = [
    {
      type: 'ไกด์',
      icon: 'https://cdn-icons-png.flaticon.com/128/2953/2953363.png',
      path: '/guide',
      fn: () => {
        show_guide(showguide);
        if (showguide && guideRef.current) {
          scroll.scrollTo(guideRef.current.offsetTop + 500, {
            smooth: false
          });
        }
      }
    },
    {
      type: 'ร้านค้า',
      icon: 'https://cdn-icons-png.flaticon.com/128/1584/1584911.png',
      path: '/shop'
    }
  ];

  let type1 = () => {
    if (location.pathname === '/shopdetail') {
      return typeMudetail.filter(data => data.type !== 'ไกด์');
    } else if (location.pathname === '/') {
      return typeMu;
    } else {
      return typeMudetail;
    }
  };

  let type = type1();

  return (
    <div style={{ marginTop: '50px' }}>
      <br />
      {!location.pathname.includes('/ForgottenPassword') &&
        !location.pathname.includes('/reg-guide') &&
        !location.pathname.includes('/reg-shop') &&
        !location.pathname.includes('/add-shop') && 
        !location.pathname.includes('/admin') &&
        !location.pathname.includes('/admin/login')&&
        (
          <Nav
            className='justify-content-center'
            variant='underline'
            onSelect={selectedKey => {
              SelectedTypeMu(selectedKey);
              localStorage.setItem('type_mu', selectedKey);
            }}
            style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {type.map((data, index) => (
              <Nav.Item
                onClick={() => {
                  Setshowguide(!showguide);
                  localStorage.setItem('showguide', showguide);
                  if (data.path === '/shop') {
                    navigate(data.path);
                  } else {
                    data.fn();
                  }
                }}
                style={{
                  marginRight: '10px',
                  marginBottom: '10px',
                  minWidth: '120px'
                }}
                key={data.type}
              >
                <div style={{ textAlign: 'center' }}>
                  <Nav.Link eventKey={data.type} style={{ color: 'black' }}>
                    <img
                      style={{ marginBottom: 15 }}
                      height={30}
                      width={30}
                      src={data.icon}
                      alt={data.type}
                    />
                    <br />
                    {data.type}
                  </Nav.Link>
                </div>
              </Nav.Item>
            ))}
          </Nav>
        )}
      <div ref={guideRef}></div>
    </div>
  );
}
