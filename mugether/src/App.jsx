import React, { useState, createContext } from 'react'
import Header from './components/Header'

import './App.css'
import NavType from './components/NavType'
import Listitem from './components/Listitem'
import { Muplace_Context } from './context/MuContext'

export default function App() {






  ///////////////// เดี๋ยวมาทำ context ต่อ
  const SelectedType = (type) => {
    console.log(type);
  }


  return (
    <Muplace_Context.Provider>
      <Header />
      <br />
      <NavType SelectedType={SelectedType} />
      <br />
      <br />
      <Listitem />
    </Muplace_Context.Provider>
  )
}
