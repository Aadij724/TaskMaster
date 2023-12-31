import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import EditProfile from './pages/editProfile/EditProfile.jsx'
import Login from './pages/login/Login.jsx'
import MyStats from './pages/myStats/MyStats.jsx'
import Profile from './pages/profile/Profile.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import TeamStats from './pages/teamStats/TeamStats.jsx'
import { useEffect, useState } from 'react'
import axios from "axios"
import MyDashboard from './pages/myDashboard/MyDashboard.jsx'
import Team from './pages/team/Team.jsx'
import CreateTeam from './pages/createTeam/CreateTeam.jsx'

function App() {
  

  const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
            setUserdata({...response.data.user})
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {
              userdata ?
              <Route index element={<MyDashboard/>} /> :
              <Route index element={<Login/>} />
            }
            
            <Route path="signup" element={userdata ? <MyDashboard/>: <SignUp/>} />
            <Route path="login" element={<Login/>} />
            <Route path="editprofile" element={userdata ? <EditProfile/> : <Navigate to={"/login"}/> } />
            <Route path="team">
              <Route index element={<Team/>} />
              <Route path="new" element={<CreateTeam/>} />
            </Route>
            <Route path="mystats" element={userdata ? <MyStats/> : <Navigate to={"/login"}/> } />
            <Route path="teamstats" element={userdata ? <TeamStats/> : <Navigate to={"/login"}/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
