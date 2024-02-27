import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'
import NavType from './components/NavType'
import Listitem from './components/Listitem'
import { Muplace_Context } from './context/MuContext'
import axios from 'axios'
import { Route, Routes, useLocation } from 'react-router-dom'
import ShopV2 from './components/ShopV2'
import Mudetail from './components/Mudetail'
import Login from './components/Login'
import Register from './components/Register'
import Regguide from './components/Reg_guide'
import Swal from 'sweetalert2';


const Checktimeout=(timeout,onLogout)=>{
    let idleTime = null;

    const resetTime=()=>{
        clearTimeout(idleTime);
        idleTime = setTimeout(() => {
          localStorage.removeItem('token');
          let token = localStorage.getItem('token');
          if(!token)
          {
            onLogout();
          }
           
        },timeout)
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

  const location = useLocation();
  const [global_muplace, Setmuplace] = useState([]);
  const [global_shop, Setshop] = useState([]);
  const [selectedMuType, Setselectedmutype] = useState('')
  const [selectedMuplace, SetSelecttedMuplace] = useState('');
  const [showguide,Setshowguide] = useState(false);
  const [logoutAlertShown, setLogoutAlertShown] = useState(false);
  const guideStatus = JSON.parse(localStorage.getItem('guide'));
  const shopStatus = JSON.parse(localStorage.getItem('shop'));


  Checktimeout(1800000,() => {
    if (!logoutAlertShown) {
      Swal.fire({
        text: 'User logged out due to inactivity',
      });
      localStorage.removeItem('usr');
      setLogoutAlertShown(true); // Ensure the alert is only shown once
    }
  });


  //fetch global MUPLACE 
  useEffect(() => {

    axios.get('http://localhost:5353/muplace/mudata')
      .then(res => {
        Setmuplace(res.data.filter(e => e.name !== "วัดดาวดึงษาราม"))
      })
      .catch(err => alert(err))

  }, [])

  
  const data_context = {
     muplace:global_muplace,
     per_muplace:selectedMuplace,
     guideStatus:guideStatus,
     shopStatus:shopStatus
  }



  const SelectedTypeMu = (type) => {
    Setselectedmutype(type)
  }

  const SelectedMuplace = (muplace) => {
    SetSelecttedMuplace(muplace)
  }

  const show_guide = (showed) =>{
       Setshowguide(showed);
  }



  return (
    <Muplace_Context.Provider value={data_context} >
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />

      {location.pathname !== '/shop' &&location.pathname !== '/login'&& location.pathname !== '/register' && location.pathname !== '/logout' &&<NavType show_guide={show_guide} SelectedTypeMu={SelectedTypeMu} />}
      <br />
      <br />



      <Routes>
        <Route path='/' element={<Listitem SelectedMuplace={SelectedMuplace} SelectedMuType={selectedMuType} />} />
        <Route path='/shop' element={<ShopV2 />} />
        <Route path='/mudetail' element={<Mudetail showguide={showguide} />} />
        <Route path='/login' element={<Login />}  />
        <Route path='/register' element={<Register />}  />
        <Route path='/reg-guide' element={<Regguide />}  />
        
      </Routes>
      <div>

      </div>


    </Muplace_Context.Provider>
  )
}
