import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import newRequest from "../../../utils/newRequest.util";


function Login() {
  
  const loginwithgoogle = ()=>{
    window.open("http://localhost:6005/auth/google/callback","_self")
  }
  

  return (
    <div className="login">
      <form >
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input name="username" type="text" placeholder="johndoe" />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="johndoe@gmail.com"
        />
        <button type="submit">Login</button>
      </form>
      <button className="btnGoogle" onClick={loginwithgoogle}>
          <GoogleIcon className="icon"/>
          <span> Sign In With Google</span>
      </button>
      <Link to="/signup">New user? Sign up</Link>
      
    </div>
  )
}

export default Login