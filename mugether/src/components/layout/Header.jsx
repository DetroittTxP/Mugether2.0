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
import Shopicon from '../../assets/Shopicon.png'
import Editprofile from '../../assets/Editprofile.png'
import Submenu from '../../assets/Submenu.png'
import Guideedit from '../../assets/Guideedit.png'
import Shopdetail from '../../assets/Shopdetail.png'
import Shopeditdata from '../../assets/Shopeditdata.png'
import Addproduct from '../../assets/Addproduct.png'
import Regguide from '../../assets/Regguide.png'
import Regshop from '../../assets/Regshop.png'
import Fav from '../../assets/Fav.png'
import Logout from '../../assets/Logout.png'
import Login from '../../assets/Login.png'
import Register from '../../assets/Register.png'
import Shop from '../../assets/Shop.png'
import Search from '../../assets/Search.png'

export default function Header({ handleFav, showguide }) {

  const usr_data = localStorage.getItem('usr');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showedit, Setshowedit] = useState(false);
  const [editType, Setedittype] = useState(null);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(window.innerWidth > 768);
  const guide_type = localStorage.getItem('guide_type');

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
    localStorage.removeItem('id_user')
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

  const switchguidetype =()=>{
      switch(guide_type){
            case 'guide':
               return <> ไกด์ </>;
            case 'muler':
              return <> รับจ้างมู </>;
            case 'both':
              return  <> ทั้งหมด </>;
            default:
              return null;       
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
              <img src={Corrrect} style={{ width: '30px' }}/> ไกด์ - {switchguidetype()}
            </p> 
            : null}
        </span>
        </div>
      </Menu.Item>
      <Menu.Item key='go to shop'>
        <a onClick={() => navigate('/shop')} style={{ textDecoration: 'none' }}>
          <img src={Shopicon} style={{ width: '30px' }} />
          <span>ร้านค้าแนะนำ</span>
        </a>
      </Menu.Item>
      <Menu.Item key="edit">
        <a onClick={() => onEditClick('user')} style={{ textDecoration: 'none' }}>
          <img src={Editprofile} style={{ width: '30px' }} />
          <span>แก้ไขโปรไฟล์ผู้ใช้</span>
        </a>
      </Menu.Item>
      {guideStatus && <Menu.SubMenu icon={<img src={Submenu} style={{ width: '30px' }} />} title="แก้ไขข้อมูลไกด์" key="editGuide">
        <Menu.Item onClick={() => onEditClick('guide')} key="edit guide profile">
          <img src={Guideedit} style={{ width: '30px' }} />
          <span>แก้ไขโปรไฟล์ไกด์</span>
        </Menu.Item>

        {/* <Menu.Item onClick={() => navigate('/guide/profile')}  key="profile guide">
          <img src={Guideedit} style={{ width: '30px' }} />
          <span>โปรไฟล์ไกด์ของคุณ</span>
        </Menu.Item> */}
        
      </Menu.SubMenu>}
      {shopStatus && <Menu.SubMenu title="แก้ไขข้อมูลร้านค้า" icon={<img src={Shopdetail} style={{ width: '30px' }} />} key="editShop">
        <Menu.Item key='editShopProfile' onClick={() => onEditClick('shop')}>
          <img src={Shopeditdata} style={{ width: '30px' }} />
          แก้ไขโปรไฟล์ร้านค้า
        </Menu.Item>
      </Menu.SubMenu>}
      {shopStatus && <Menu.Item key="addshoplist">
        <a onClick={() => navigate('/add-shop')} style={{ textDecoration: 'none' }}>
          <img src={Addproduct} style={{ width: '30px' }} />
          <span>เพิ่มรายการสินค้า</span>
        </a>
      </Menu.Item>}

      {!guideStatus && <Menu.Item key="reg-guide">
        <a onClick={() => navigate('/reg-guide')} style={{ textDecoration: 'none' }}>
          <img src={Regguide} style={{ width: '30px' }} />
          สมัครเป็นไกด์
        </a>
      </Menu.Item>}
      {!shopStatus && <Menu.Item key="reg-shop">
        <a onClick={() => navigate('/reg-shop')} style={{ textDecoration: 'none' }}>
          <img src={Regshop} style={{ width: '30px' }} />
          <span>สมัครร้านค้า</span>
        </a>
      </Menu.Item>}
      <Menu.Item onClick={() => {
        const fav = JSON.parse(localStorage.getItem('fav'));
        fav ? localStorage.setItem('fav', false) : localStorage.setItem('fav', true);;
        return handleFav(!fav)
      }} key="favorite" >
        <img src={Fav} style={{ width: '30px' }} />
        <span>รายการที่ถูกใจ</span>
      </Menu.Item>
      <Menu.Item key="logout">
        <a onClick={handleLogout} style={{ textDecoration: 'none' }}>
          <img src={Logout} style={{ width: '30px' }} />
          <span>ออกจากระบบ</span>
        </a>
      </Menu.Item>

    </Menu>
  );

  const non_login = (
    <>
  { pathname !=='/admin' &&  <Menu style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px' }}>
      <Menu.Item key="login">
        <a onClick={() => navigate('/login')} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src={Login} style={{ width: '30px' }} />
          <span>เข้าสู่ระบบ</span>
        </a>
      </Menu.Item>
      <Menu.Item key="register">
        <a onClick={() => navigate('/register')} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src={Register} style={{ width: '30px' }} />
          <span>สมัครสมาชิก</span>
        </a>
      </Menu.Item>
      <Menu.Item key="shop">
        <a onClick={() => navigate('/shop')} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src={Shop} style={{ width: '30px' }} />
          <span>ร้านค้า</span>
        </a>
      </Menu.Item>
    </Menu>}
    </>
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


const adminmenu = (
  <Menu>
  <Menu.Item key="manage-users">
    <a onClick={() => {
         localStorage.setItem('showregisshop', false);
         localStorage.setItem('showguideregis', true);
         return  window.location.reload();
    }}  style={{ textDecoration: 'none' }}>
      รายชื่อคนสมัครไกด์
    </a>
  </Menu.Item>
  <Menu.Item  onClick={() => {
         localStorage.setItem('showregisshop', true);
         localStorage.setItem('showguideregis', false);
         return  window.location.reload();
  }} key="manage-muplaces">
    <a style={{ textDecoration: 'none' }}>
      รายชื่อคนสมัครร้านค้า
    </a>
  </Menu.Item>
  <Menu.Item>
    <a onClick={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usr_id');
        localStorage.removeItem('admin')
        return window.location.href = '/admin/login'
    }} style={{ textDecoration: 'none' }}>
        ออกจากระบบ
      </a>
  </Menu.Item>
</Menu>
)

  const switchmenu = () =>{
    console.log(pathname);
       if(usr_data){
        return loged_in;
       }

       if(!usr_data && pathname !== '/admin'){
          return non_login;
       }

       if(pathname === '/admin'){
         return adminmenu;
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
            <Image className='logo' rounded src={Logo}/>
            
          </Navbar.Brand>
          <div className="search-wrapper">
            {isMobileSearchVisible || isDesktopView ? (
              <>
               { pathname !== '/admin' &&  <Dropdown overlayClassName='scroll-dropdown' menu={{ items: searchdata(), }}>
                <Nav>
                  <Form.Control onChange={onChange} placeholder={(pathname === '/shop' || pathname === '/shopdetail' ? 'ค้นหาสินค้า...' : 'ค้นหาสถานที่มู...')} type="text" style={{ width: isDesktopView ? '450px' : '120px'}} />
                </Nav>
              </Dropdown>}
              </>
            
            ) : null}
            {!isDesktopView && (
              <button className="search-icon" onClick={toggleMobileSearch}>
                <img src={Search} alt="Search" className='search-icon-1' />
              </button>
            )}
          </div>
          <Dropdown overlay={switchmenu()} trigger={['click']} placement="bottomRight">
            <button className='menu-apps'>
              <AppsIcon />
            </button>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
}