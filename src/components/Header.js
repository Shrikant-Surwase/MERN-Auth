import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { useSelector } from "react-redux";
export default function Header() {
    const isLogin = useSelector((state) => state.isLoggedIn);
  return (
    <div className='navbar'>
        <h1><Link to="/home">MernAuth</Link></h1>
        <ul className='nav-list'>
           {
            isLogin && <>
             
            <li className='list-item'><Link to='/home'>logout</Link></li>
            </>
           }
           {
            !isLogin && <>
            <li className='list-item'><Link to='/login'>Login</Link></li>
            <li className='list-item'><Link to='/signup'>signup</Link></li>
            </>
           }
        </ul>
    </div>
  )
}
