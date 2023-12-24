import React from 'react';
import "./Mystats.scss";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const MyStats = () => {
  return (
    <div className='home'>
        <div className='nav-nb'>
            <Navbar />
        </div>
        <div className='h-body'>
            <Sidebar className="side-nb"/>
            <div className='home-content'>
                My Stats
            </div>
        </div>
    </div>
  )
}

export default MyStats