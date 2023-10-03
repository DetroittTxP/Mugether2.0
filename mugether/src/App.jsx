import React, { useState,useEffect, createContext } from 'react'
import Header from './components/Header'
import Shop from './components/Shop'

import './App.css'
import NavType from './components/NavType'
import Listitem from './components/Listitem'
import { Muplace_Context } from './context/MuContext'
import axios from 'axios'
import { Route,Routes,useLocation } from 'react-router-dom'




export default function App() {
  const location = useLocation();
  const [global_muplace,Setmuplace] = useState([]);

  //fetch global MUPLACE 
  useEffect(() => {
    axios.get('http://localhost:5353/muplace/mudata')
    .then(res => {
        Setmuplace(res.data.filter(e => e.name !== "วัดดาวดึงษาราม"))
    })
    .catch(err => alert(err))
  },[])



  ///////////////// เดี๋ยวมาทำ context ต่อ
  const SelectedType = (type) => {
    console.log(type);
  }


  return (
    <Muplace_Context.Provider value={{muplace:global_muplace}} >
      <Header />
      <br />
      <NavType SelectedType={SelectedType} />
      <br />
      <br />

      

      <Routes>
          <Route path='/' element={  <Listitem />}/>
          <Route path='/shop' element={ <Shop/>}/>
      </Routes>
    
     
    </Muplace_Context.Provider>
  )
}
