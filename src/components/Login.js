import React, { useState } from 'react'
import './signup.css'
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import {useNavigate} from 'react-router-dom'
export default function Signup() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [name,setName] = useState("")
    const [input, setInput] = useState({email:"",password:""});
    const handleChange = (e)=>{
         setInput((prev)=>({
          ...prev,[e.target.name]:e.target.value
         }))
   
    
    }
    const sendRRequest = async() =>{
      const res = await axios.post("http://localhost:5000/api/login",{
       
        email:input.email,
        password:input.password
      }).catch((err)=>console.log("err"))
      const data = await res.data;
      console.log(data)
      return data;
    }
    const formSubmit = (e)=>{
      e.preventDefault();
      sendRRequest().then(() => dispatch(authActions.login())).then(()=>{console.log("success api called"); history("/welcome")})
        console.log({
         
            email: input.email,
            password: input.password
        })
    
       
    }
  return (
    <div className='container'>
       
       <h1>Login</h1>
        <form>
            
            
            <label><b>email</b></label>
            <input name='email' type="email" value={input.email} onChange={handleChange} placeholder="Enter the email" />
            
           
           <label><b>password</b></label>
            <input name='password' type="password" value={input.password} onChange={handleChange} placeholder="Enter the password" />
           
        </form>
        <button type='submit' onClick={formSubmit}>Signup</button>
  
    </div>
  )
}
