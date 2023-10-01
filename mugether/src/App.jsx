import React,{useState} from 'react'
import Header from './components/Header'

import './App.css'
import NavType from './components/NavType'
import Listitem from './components/Listitem'

export default function App() {

  const SelectedType = (type) =>{
      console.log(type);
  }


  return (
    <>
       <Header/>
       <br/>
       <NavType SelectedType={SelectedType}/>   
        <br/>
        <br/>
       <Listitem/>
    </>
  )
}
