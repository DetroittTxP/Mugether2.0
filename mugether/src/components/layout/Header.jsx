import React, { useState, useContext, useEffect } from 'react';
import { Container, Navbar, Form, Image, Nav } from 'react-bootstrap';
import { Dropdown, Menu } from 'antd';
import Logo from '../../assets/LogoMugether.png';
import { Muplace_Context } from '../../context/MuContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../user/EditProfile';
import AppsIcon from '@mui/icons-material/Apps';
import { useLocation } from 'react-router-dom';
import './header.css'
import Corrrect from '../../assets/correct.png'

export default function Header({ handleFav, showguide }) {

  const usr_data = localStorage.getItem('usr');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showedit, Setshowedit] = useState(false);
  const [editType, Setedittype] = useState(null);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > 768);

  window.addEventListener('resize', () => {
    setIsDesktopView(window.innerWidth > 768);
  });

  const { muplace, guideStatus, shopStatus, shopList, SERVER_URL } = useContext(Muplace_Context)
  const [Muplace, Setmuplace] = useState([])
  const [Shoplist, Setshoplist] = useState([]);

  const onEditClick = (type) => {
    Setshowedit(true);
    Setedittype(type)
  }
  const toggleMobileSearch = () => {
    setIsMobileSearchVisible((prevState) => !prevState);
  };

  const handleLogout = async () => {

    localStorage.removeItem('usr');
    localStorage.removeItem('token')
    localStorage.removeItem('usr_id')
    // localStorage.removeItem('shop_id');
    // localStorage.removeItem('shop_item_id');
    // localStorage.removeItem('shop');
    localStorage.removeItem('guide');
    
    await Swal.fire('ออกจากระบบสำเร็จ')
    let maihaiyu = [
      '/reg-guide',
      '/reg-shop',
      '/add-shop',
    ]

    maihaiyu.forEach(path => {
      if(location.pathname === path){
         return navigate('/');
      }
    })
    
    window.location.reload();
    //navigate('/')
  }

  const searchdata = () => {
    if (pathname === '/shop' || pathname === '/shopdetail') {

      return Shoplist
    } else {
      return Muplace
    }
  }


  const loged_in = (
    <Menu>
      <Menu.Item key="profile">
        <div>

          <Image roundedCircle width={50} height={50} src={`${SERVER_URL}/image/user/profile/${usr_data}`} />
          <span style={{ marginLeft: 10 }}>
            {usr_data} <br /><br />
            {shopStatus ? 
            <p style={{ display: 'inline-block', marginRight: '10px' }}>
              <img src={Corrrect} style={{ width: '30px' }} /> ร้านค้า 
            </p> 
            : null}
            {guideStatus ? 
            <p style={{ display: 'inline-block' }}>
              <img src={Corrrect} style={{ width: '30px' }}/> ไกด์
            </p> 
            : null}
        </span>
        </div>
      </Menu.Item>
      <Menu.Item key='go to shop'>
        <a onClick={() => navigate('/shop')} style={{ textDecoration: 'none' }}>
          <img src="https://cdn-icons-png.flaticon.com/128/8771/8771926.png" style={{ width: '30px' }} />
          <span>ร้านค้าแนะนำ</span>
        </a>
      </Menu.Item>
      <Menu.Item key="edit">
        <a onClick={() => onEditClick('user')} style={{ textDecoration: 'none' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/3845/3845895.png" style={{ width: '30px' }} />
          <span>แก้ไขโปรไฟล์ผู้ใช้</span>
        </a>
      </Menu.Item>
      {guideStatus && <Menu.SubMenu icon={<img src="https://cdn-icons-png.flaticon.com/512/2268/2268568.png" style={{ width: '30px' }} />} title="แก้ไขข้อมูลไกด์" key="editGuide">
        <Menu.Item onClick={() => onEditClick('guide')} key="edit guide profile">
          <img src="https://cdn-icons-png.flaticon.com/512/3284/3284607.png" style={{ width: '30px' }} />
          <span>แก้ไขโปรไฟล์ไกด์</span>
        </Menu.Item>
      </Menu.SubMenu>}
      {shopStatus && <Menu.SubMenu title="แก้ไขข้อมูลร้านค้า" icon={<img src="https://cdn-icons-png.flaticon.com/512/3176/3176363.png" style={{ width: '30px' }} />} key="editShop">
        <Menu.Item key='editShopProfile' onClick={() => onEditClick('shop')}>
          <img src="https://cdn-icons-png.flaticon.com/512/1043/1043450.png" style={{ width: '30px' }} />
          แก้ไขโปรไฟล์ร้านค้า
        </Menu.Item>
      </Menu.SubMenu>}
      {shopStatus && <Menu.Item key="addshoplist">
        <a onClick={() => navigate('/add-shop')} style={{ textDecoration: 'none' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/5956/5956828.png" style={{ width: '30px' }} />
          <span>เพิ่มรายการสินค้า</span>
        </a>
      </Menu.Item>}

      {!guideStatus && <Menu.Item key="reg-guide">
        <a onClick={() => navigate('/reg-guide')} style={{ textDecoration: 'none' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/3284/3284607.png" style={{ width: '30px' }} />
          สมัครเป็นไกด์
        </a>
      </Menu.Item>}
      {!shopStatus && <Menu.Item key="reg-shop">
        <a onClick={() => navigate('/reg-shop')} style={{ textDecoration: 'none' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/5956/5956828.png" style={{ width: '30px' }} />
          <span>สมัครร้านค้า</span>
        </a>
      </Menu.Item>}
      <Menu.Item onClick={() => {
        const fav = JSON.parse(localStorage.getItem('fav'));
        fav ? localStorage.setItem('fav', false) : localStorage.setItem('fav', true);;
        return handleFav(!fav)
      }} key="favorite" >
        <img src='https://cdn-icons-png.flaticon.com/128/4340/4340223.png' style={{ width: '30px' }} />
        <span>รายการที่ถูกใจ</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <a onClick={handleLogout} style={{ textDecoration: 'none' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png" style={{ width: '30px' }} />
          <span>ออกจากระบบ</span>
        </a>
      </Menu.Item>

    </Menu>
  );

  const non_login = (
    <Menu style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px' }}>
      <Menu.Item key="login">
        <a onClick={() => navigate('/login')} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828466.png" style={{ width: '30px' }} />
          <span>เข้าสู่ระบบ</span>
        </a>
      </Menu.Item>
      <Menu.Item key="register">
        <a onClick={() => navigate('/register')} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/3456/3456426.png" style={{ width: '30px' }} />
          <span>สมัครสมาชิก</span>
        </a>
      </Menu.Item>
      <Menu.Item key="shop">
        <a onClick={() => navigate('/shop')} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://cdn-icons-png.flaticon.com/512/1356/1356559.png" style={{ width: '30px' }} />
          <span>ร้านค้า</span>
        </a>
      </Menu.Item>
    </Menu>
  );

  const toggle = (status) => {
    Setshowedit(status)
  }

  const onChange = (e) => {

    switch (pathname) {
      case '/shop':
      case '/shopdetail':
     
        let shopdata = shopList.map(shop => (
          shop.shop_items.map(item => (
            {
              shop_id: shop._id,
              item_id: item._id,
              item_name: item.item_name
            }
          ))
        )).flat().filter(data => data.item_name.toLowerCase().includes(e.target.value));

        Setshoplist(shopdata.map((data, i) => ({
          key: data.item_id,
          label: (
            <a onClick={() => {
              localStorage.setItem('shop_id', data.shop_id);
              localStorage.setItem('shop_item_id', data.item_id);
              if(location.pathname === '/shopdetail'){
                return window.location.reload();
              }
              return navigate('/shopdetail')
            }} style={{ textDecoration: 'none' }}>
              <h6>{data.item_name}</h6>
            </a>
          )
        })))
      
      default:
        let newdata = muplace.sort((a, b) => a.name.localeCompare(b.name, 'th')).filter(data => data.name.toLowerCase().includes(e.target.value))

        Setmuplace(newdata.map(data => ({
          key: data._id.toString(),
          label: (
            <a onClick={() => {
              localStorage.setItem('muplace', data.name)
              localStorage.setItem('showmap', data.name)
              navigate('/mudetail')
            }} style={{ textDecoration: 'none' }} >
              <h6>{data.name}</h6>
            </a>
          )
        })))

    }
  }


  return (
    <div>
      <EditProfile showedit={showedit} toggle={toggle} editType={editType} />
      <Navbar bg="white" expand="lg" fixed="top" style={{ borderBottom: '2px solid #ccc', padding: '10px', zIndex: '50' }}>
        <Container>
          <Navbar.Brand style={{ cursor: 'pointer', maxWidth: '600px'}} onClick={() => {
            localStorage.removeItem('showmap');
            navigate('/');
            localStorage.setItem('showguide',false);
            showguide(false);
            const fav = JSON.parse(localStorage.getItem('fav'));
            localStorage.setItem('fav', false)
            localStorage.removeItem('type_mu')
            handleFav(!fav)
            return window.location.reload();
          }}>
            <Image rounded src={Logo} height={150} width={150} style={{ borderRadius: '50%' }} />
            
          </Navbar.Brand>
          <div className="search-wrapper">
            {isMobileSearchVisible || isDesktopView ? (
              <Dropdown overlayClassName='scroll-dropdown' menu={{ items: searchdata(), }}>
                <Nav>
                  <Form.Control onChange={onChange} placeholder={(pathname === '/shop' || pathname === '/shopdetail' ? 'ค้นหาสินค้า...' : 'ค้นหาสถานที่มู...')} type="text" style={{ width: isDesktopView ? '600px' : '100%' }} />
                </Nav>
              </Dropdown>
            ) : null}
            {!isDesktopView && (
              <button className="search-icon" onClick={toggleMobileSearch}>
                <img src="https://cdn.discordapp.com/attachments/1130047272508465273/1218588605304541324/search-interface-symbol.png?ex=66083613&is=65f5c113&hm=a03b369df92cd68ac1a5517fa71a852442ff1160dfb65f22f0a7117446937969&" alt="Search" style={{ width: '30px' }} />
              </button>
            )}

          </div>
          <Dropdown overlay={usr_data ? loged_in : non_login} trigger={['click']} placement="bottomRight">
            <button className='menu-apps'>
              <AppsIcon />
            </button>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
}