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



export default function App() {
  const location = useLocation();
  const [global_muplace, Setmuplace] = useState([]);
  const [global_shop, Setshop] = useState([]);
  const [selectedMuType, Setselectedmutype] = useState('')
  const [selectedMuplace, SetSelecttedMuplace] = useState('');

  //fetch global MUPLACE 
  useEffect(() => {
    axios.get('http://localhost:5353/muplace/mudata')
      .then(res => {
        Setmuplace(res.data.filter(e => e.name !== "วัดดาวดึงษาราม"))
      })
      .catch(err => alert(err))

  }, [])



  const SelectedTypeMu = (type) => {
    Setselectedmutype(type)
  }

  const SelectedMuplace = (muplace) => {
    SetSelecttedMuplace(muplace)
  }



  return (
    <Muplace_Context.Provider value={{ muplace: global_muplace, per_muplace: selectedMuplace }} >
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />

      {location.pathname !== '/shop' &&location.pathname !== '/login'&& <NavType SelectedTypeMu={SelectedTypeMu} />}
      <br />
      <br />



      <Routes>
        <Route path='/' element={<Listitem SelectedMuplace={SelectedMuplace} SelectedMuType={selectedMuType} />} />
        <Route path='/shop' element={<ShopV2 />} />
        <Route path='/mudetail' element={<Mudetail />} />
        <Route path='/login' element={<Login />}  />
        
      </Routes>
      <div>

      </div>


    </Muplace_Context.Provider>
  )
}
