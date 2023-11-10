import React from 'react'
import Signup from './components/Signup'
import {Route,Routes} from "react-router-dom"
import Login from './components/Login'
import Welcome from './components/Welcome'
import { useSelector } from "react-redux";
import Header from './components/Header'
import Home from './components/Home'
export default function App() {
  const isLogin = useSelector((state) => state.isLoggedIn);
  console.log(isLogin)
  return (
    <div>
      <Header/>
      <Routes>
        
        <Route path='/signup'  element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        {isLogin && <Route path='/welcome' element={<Welcome/>} />} 
      </Routes>
    </div>
  )
}
