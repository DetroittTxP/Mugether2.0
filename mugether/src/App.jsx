import React, { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import './App.css'
import NavType from './components/layout/NavType'
import Listitem from './components/muplace/Listitem'
import { Muplace_Context } from './context/MuContext'
import axios from 'axios'
import { Route, Routes, useLocation } from 'react-router-dom'
import ShopV2 from './components/Shop/ShopV2'
import Mudetail from './components/muplace/Mudetail'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Regguide from './components/Guide/Reg_guide'
import Shopdetail from './components/Shop/Shopdetail'
import Regis_shop from './components/user/Regis_shop'
import Swal from 'sweetalert2';
import Add_Shop from './components/Shop/Add_shop'
import Forgottenpassword from './components/user/ForgottenPassword'
import Footer from './components/layout/Footer'
import Adminpagelogin from './components/admin/Adminpagelogin'
import Adminpage from './components/admin/Adminpage'
import Guideprofilepage from './components/Guide/guideprofilepage'


const Checktimeout = (timeout, onLogout) => {
  let idleTime = null;

  const resetTime = () => {
    clearTimeout(idleTime);
    idleTime = setTimeout(() => {
      localStorage.removeItem('token');
      let token = localStorage.getItem('token');
      if (!token) {
        onLogout();
      }

    }, timeout)
  }

  useEffect(() => {
    window.addEventListener('mousemove', resetTime);
    window.addEventListener('mousemove', resetTime);
    window.addEventListener('keydown', resetTime);

    resetTime();

    return () => {
      clearTimeout(idleTime);
      window.removeEventListener('mousemove', resetTime);
      window.removeEventListener('keydown', resetTime);
    };
  })
}

export default function App() {
  const SERVER_URL = import.meta.env.VITE_MOBILE_LOCALHOST_URL

  const location = useLocation();
  const {pathname} = location;
  const pageStatus = JSON.parse(localStorage.getItem('showguide'))
  const [global_muplace, Setmuplace] = useState([]);
  const [global_shop, Setshop] = useState([]);
  const [selectedMuType, Setselectedmutype] = useState('')
  const [selectedMuplace, SetSelecttedMuplace] = useState('');
  const [showguide, Setshowguide] = useState(false);
  const [logoutAlertShown, setLogoutAlertShown] = useState(false);
  const [favoriteStatus, setfavoritestatus] = useState(false);
  const [listshop, Setlistshop] = useState([]);
  const guideStatus = JSON.parse(localStorage.getItem('guide'));
  const shopStatus = JSON.parse(localStorage.getItem('shop'));
  const usr_id = localStorage.getItem('usr_id');

  useEffect(() => {
    if (!usr_id && location.pathname === '/add-shop') {
      return window.location.href = '/'
    }
  }, [location.pathname])


  useEffect(() => {
    if(pathname !== '/admin'){
      localStorage.removeItem('/admin');
    }

    let maihaiyu = [
      '/reg-guide',
      '/reg-shop',
      '/add-shop',
    ]

    maihaiyu.forEach(path => {
      if (location.pathname === path && !usr_id) {
        return navigate('/');
      }
    })
  }, [])

  Checktimeout(1800000, () => {
    if (!logoutAlertShown) {
      Swal.fire({
        text: 'ออกจากระบบอัตโนมัติ เนื่องจากไม่มีการตอบสนองเป็นระยะเวลานาน',
      });
      
      localStorage.removeItem('usr');
      localStorage.removeItem('token')
      localStorage.removeItem('usr_id')
      localStorage.clear();
      // localStorage.removeItem('shop_id');
      // localStorage.removeItem('shop_item_id');
      // localStorage.removeItem('shop');
      // localStorage.removeItem('guide');
      // localStorage.removeItem('fav');

      setLogoutAlertShown(true);
      return window.location.href = '/'
    }
  });


  //fetch global MUPLACE 
  useEffect(() => {

    axios.get(`${SERVER_URL}/muplace/mudata`)
      .then(res => {
        Setmuplace(res.data.filter(e => e.name !== "วัดดาวดึงษาราม"))
      })
      .catch(err => alert(err))

    axios.get(`${SERVER_URL}/shop/shop_item`)
      .then(res => Setlistshop(res.data))
      .catch(err => alert(err))

  }, [])


  useEffect(() => {
    const adminStat = JSON.parse(localStorage.getItem('admin'))

    if(!adminStat && pathname === '/admin'){
        alert('instrution detected');
        return window.location.href = '/'
    }
  },[])


  const data_context = {
    muplace: global_muplace,
    per_muplace: selectedMuplace,
    guideStatus: guideStatus,
    shopStatus: shopStatus,
    shopList: listshop,
    SERVER_URL: SERVER_URL
  }


  const Handlefav = (fav) => {
    setfavoritestatus(fav);
  }



  const SelectedTypeMu = (type) => {
    Setselectedmutype(type)
  }

  const SelectedMuplace = (muplace) => {
    SetSelecttedMuplace(muplace)
  }

  const show_guide = (showed) => {
    Setshowguide(showed);
  }

  return (
    <Muplace_Context.Provider value={data_context} >
     {    pathname!== '/admin/login' && <  Header showguide={show_guide} handleFav={Handlefav} />}
      <br />
      <br />
      <br />
      <br />
      <br />


      {location.pathname !== '/shop' && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/logout' && <NavType show_guide={show_guide} SelectedTypeMu={SelectedTypeMu} handleFav={Handlefav} />}
      <br />
      <br />


      <Routes>
        <Route path='/' element={<Listitem favstatus={favoriteStatus} SelectedMuplace={SelectedMuplace} SelectedMuType={SelectedTypeMu} />} />
        <Route path='/shop' element={<ShopV2 />} />
        {pageStatus ? (
          <Route path='/mudetail' element={<Mudetail showguide={true} />} />
        ) : (
          <Route path='/mudetail' element={<Mudetail showguide={false} />} />
        )}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reg-guide' element={<Regguide />} />
        <Route path='/shopdetail' element={<Shopdetail />} />
        <Route path='/reg-shop' element={<Regis_shop />} />
        <Route path='/add-shop' element={<Add_Shop />} />
        <Route path='/admin/login' element={<Adminpagelogin/>}/>
        <Route path='/Forgottenpassword' element={<Forgottenpassword />} />
        <Route path='/admin' element={<Adminpage/>}/>
        <Route path='/guide/profile' element={<Guideprofilepage/>}/>
      </Routes>
      <br />
      
      {(location.pathname !== '/login' &&   pathname!== '/guide/profile' &&  pathname!== '/admin/login' &&  pathname!== '/admin' && location.pathname !== '/register' && location.pathname !== '/ForgottenPassword' && location.pathname !=='/add-shop'
      && location.pathname !=='/reg-shop' && location.pathname !=='/reg-guide') && <Footer />}
       

      <div>

      </div>


    </Muplace_Context.Provider>
  )
}
