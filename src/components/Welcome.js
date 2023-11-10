import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
   const isLogin = useSelector((state)=>state.isLoggedIn)
    return (
     <div>

{
        isLogin && 
        <div style={{
            display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <h1 style={{color:"red",margin:"12px 12px"}}>Welcome Home</h1>
          
        </div>
}
        
     {
        !isLogin && <>
        <div style={{
            display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <h1 style={{color:"red",margin:"12px 12px"}}>Welcome Home</h1>
          
        </div>
        <div style={{
            display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <h1 style={{color:"red",margin:"12px 12px"}}>Please Signup</h1>
        </div>
        </>
     }
     </div>


  )
}
