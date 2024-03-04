import React, { useState, useEffect, useContext } from 'react'
import { Container, Nav, Navbar, Form,Modal ,Image} from 'react-bootstrap'
import { Button, Dropdown, Menu } from 'antd';
import Logo from '../../assets/LogoMugether.png'
import { LuLogIn } from "react-icons/lu";
import { Muplace_Context } from '../../context/MuContext';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { TbEdit } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import EditProfile from '../user/EditProfile';
import AppsIcon from '@mui/icons-material/Apps';
import { FaUserEdit } from "react-icons/fa";
import { LiaUserAstronautSolid } from "react-icons/lia";
import { MdFavorite } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import './header.css'


export default function Header() {
  const usr_data = localStorage.getItem('usr');
  const navigate = useNavigate();
  const [showedit,Setshowedit] = useState(false);
  const [editType,Setedittype] = useState(null);
  
  const { muplace,guideStatus,shopStatus } = useContext(Muplace_Context)
  const [Muplace, Setmuplace] = useState([])
  

  const onEditClick=(type)=>{
     Setshowedit(true);
     Setedittype(type)
  }

  const handleLogout = async () => {
    localStorage.removeItem('usr');
    localStorage.removeItem('token')
    localStorage.removeItem('usr_id')
    await Swal.fire('logout ok')
    navigate('/')
  }

  const loged_in = (
    <Menu>
      <Menu.Item key="profile">
        <div>
          <Image roundedCircle width={50} height={50} src={`http://localhost:5353/image/user/profile/${usr_data}`} />
          <span style={{ marginLeft: 10 }}>
              {usr_data} <br/>
              {guideStatus ? <p>(Guide)</p> : null}
              {shopStatus ? <p>(Shop)</p> : null}
          </span>
        </div>
      </Menu.Item>
      <Menu.Item key="edit">
        <a onClick={() => onEditClick('user')} style={{ textDecoration: 'none' }}>
          <TbEdit /> Edit Profile
        </a>
      </Menu.Item>
      {guideStatus &&  <Menu.Item key="editGuide">
        <a onClick={() => onEditClick('guide')}  style={{ textDecoration: 'none' }}>
          <TbEdit /> Edit Guide Profile
        </a>
      </Menu.Item>}
      {shopStatus && <Menu.Item key="editShop">
        <a  onClick={() => onEditClick('shop')} style={{ textDecoration: 'none' }}>
          <TbEdit /> Edit Shop profile
        </a>
      </Menu.Item>}

    { !guideStatus && <Menu.Item key="reg-guide">
        <a href='/reg-guide' style={{ textDecoration: 'none' }}>
          <LiaUserAstronautSolid/> Register Guide
        </a>
      </Menu.Item>}
      { !shopStatus && <Menu.Item key="reg-shop">
        <a href='/req-shop' style={{ textDecoration: 'none' }}>
          <LiaUserAstronautSolid/> Register Shop
        </a>
      </Menu.Item>}
      <Menu.Item key="logout">
        <a onClick={handleLogout} style={{ textDecoration: 'none' }}>
          <IoMdLogOut /> Log Out
        </a>
      </Menu.Item>
    </Menu>
  );

  const non_login = (
    <Menu style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '10px' }}>
      <Menu.Item key="login">
        <a href='/login' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <LuLogIn style={{ fontSize: '24px' }} />
          <span>LOGIN</span>
        </a>
      </Menu.Item>
      <Menu.Item key="register">
        <a href='/register' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <FaUserEdit style={{ fontSize: '24px' }} />
          <span>REGISTER</span>
        </a>
      </Menu.Item>
      <Menu.Item key="favorite">
        <a href='#' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <MdFavorite style={{ fontSize: '24px' }} />
          <span>FAVORITE</span>
        </a>
      </Menu.Item>
      <Menu.Item key="shop">
        <a href='#' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CiShop style={{ fontSize: '24px' }} />
          <span>SHOP</span>
        </a>
      </Menu.Item>
    </Menu>
  );
  
  
  const toggle =(status)=>{
     Setshowedit(status)
  }
  

  
  const onChange = (e) => {
    let newdata = muplace.sort((a, b) => a.name.localeCompare(b.name, 'th')).filter(data => data.name.toLowerCase().includes(e.target.value))

    Setmuplace(newdata.map(data => ({
      key: data._id.toString(),
      label: (
        <a onClick={() => {
          localStorage.setItem('muplace', data.name)
          localStorage.setItem('showmap',data.name)
        }} href='/mudetail' style={{ textDecoration: 'none' }}>
          <h6>{data.name}</h6>
        </a>
      )
    })))
  }


  return (
    <div>
      <EditProfile showedit={showedit} toggle={toggle} editType={editType} />
      <Navbar   bg="light" expand="lg" fixed="top" style={{ borderBottom: '2px solid #ccc', padding: '30px', zIndex: '50' }}>
        <Container>
          <Navbar.Brand onClick={() => localStorage.removeItem('showmap')} href="/">
            <Image rounded src={Logo} height={100} width={100} style={{ borderRadius: '50%' }} />
          </Navbar.Brand>
          <div>
            <Dropdown overlayClassName='scroll-dropdown' menu={{ items: Muplace, }}>
              <Nav  >
                <Form.Control onChange={onChange} type="text" placeholder="ค้นหาสถานที่มู..." style={{ width: 600 }} />
              </Nav>

            </Dropdown>
          </div>
          <Dropdown overlay={usr_data ? loged_in : non_login} trigger={['click']} placement="bottomRight">
            <Button>
              <AppsIcon />
            </Button>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
}
