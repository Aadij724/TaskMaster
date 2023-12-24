import React from 'react'

const EditProfile = () => {
  return (
    <div className='home'>
        <div className='nav-nb'>
            <Navbar />
        </div>
        <div className='h-body'>
            <Sidebar className="side-nb"/>
            <div className='home-content'>
                Edit Profile Page
            </div>
        </div>
    </div>
  )
}

export default EditProfile