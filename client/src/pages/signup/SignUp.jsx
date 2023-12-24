import React, { useState } from "react";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    
  }

  const googleAuth = ()=>{
    window.open(
      `http://localhost:8800/api/auth/google`,
      "_self",
    )
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="">Username</label>
        <input name="username" type="text" placeholder="johndoe" onChange={e=>{setUsername(e.target.value)}} />
        
        <label htmlFor="">Email</label>
        <input name="email" type="text" placeholder="johndoe@gmail.com" onChange={e=>{setEmail(e.target.value)}} />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={e=>{setPassword(e.target.value)}}
        />
        <button type="submit">SignUp</button>
      </form>
      
      <button className="btnGoogle" onClick={googleAuth}>
          <GoogleIcon className="icon"/>
          <span> Sign Up With Google</span>
      </button>
      <Link to={"/login"}>Already a user? Sign in</Link>
    </div>
  )
}

export default SignUp