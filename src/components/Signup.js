import React, { useState } from 'react'
import './signup.css'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
export default function Signup() {
  const history = useNavigate();
    const [input, setInput] = useState({name:"",email:"",password:""});
    const handleChange = (e)=>{
         setInput((prev)=>({
          ...prev,[e.target.name]:e.target.value
         }))
   
    
    }
    const sendRRequest = async() =>{
      const res = await axios.post("http://localhost:5000/api/signup",{
        name:input.name,
        email:input.email,
        password:input.password
      }).catch((err)=>console.log("err"))
      const data = await res.data;
      return data;
    }
    const formSubmit = (e)=>{
      e.preventDefault();
      sendRRequest().then(()=>{console.log("success api called"); history("/login")})
        console.log({
          name: input.name,
            email: input.email,
            password: input.password
        })
    
       
    }
  return (
    <div className='container'>
       
       <h1>signup</h1>
        <form>
            
            <label><b>Name</b></label>
            <input name='name' type="text" value={input.name} onChange={handleChange} placeholder="Enter the name" />
         
            
            <label><b>email</b></label>
            <input name='email' type="email" value={input.email} onChange={handleChange} placeholder="Enter the email" />
            
           
           <label><b>password</b></label>
            <input name='password' type="password" value={input.password} onChange={handleChange} placeholder="Enter the password" />
           
        </form>
        <button type='submit' onClick={formSubmit}>Signup</button>
  
    </div>
  )
}
