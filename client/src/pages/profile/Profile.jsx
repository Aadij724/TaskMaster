import React from 'react'
import "./Profile.scss";
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom';

const Profile = (userDetails) => {
  const user = userDetails.user;
  const logout = () => {
    window.open(
      `http://localhost:8800/api/auth/logout`,
      "_self",
    );
  }

  console.log(`IN Frontend Profile page\nuser: ${user}`)

  return (
    <div className='home'>
        <div className='nav-nb'>
            <Navbar />
        </div>
        <div className='h-body'>
            <Sidebar className="side-nb"/>
            <div className='home-content'>
                Profile Page
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Profile