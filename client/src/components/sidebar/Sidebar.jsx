import React, { useState } from 'react'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import InsightsIcon from '@mui/icons-material/Insights';
import Groups3Icon from '@mui/icons-material/Groups3';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import "./Sidebar.scss"
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';

const Sidebar = () => {

    const [tab,setTab] = useState('dashboard')

    const logout = ()=>{
        window.open("http://localhost:6005/logout","_self");
        setUserdata({});
    }

  return (
    <div className='side-nb'>
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" id='eeee1'>
            <div className="nav nav-pills flex-column mb-auto" id='eeee3'>
            <Link to={"/"} style={{textDecoration: "none"}}>
                <li className='li-item' onClick={()=>{setTab('')}}>
                    <a className={ tab=="" ? "nav-link active" : "nav-link link-dark"}>
                    {/* <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg> */}
                    <DashboardIcon className="bi me-2" height="15px" width="16px"/>
                    My Dashboard
                    </a>
                </li>
            </Link>
            <Link to={"/profile"} style={{textDecoration: "none"}}>
                <li className='li-item' onClick={()=>{setTab('profile')}}>
                    <a className={ tab=="profile" ? "nav-link active" : "nav-link link-dark"}>
                    {/* <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg> */}
                    <AccountBoxIcon className="bi me-2" height="15px" width="16px"/>
                    Profile
                    </a>
                </li>
            </Link>
            <Link to={"/mystats"} style={{textDecoration: "none"}}>
                <li className='li-item' onClick={()=>{setTab('mystats')}}>
                    <a className={ tab=="mystats" ? "nav-link active" : "nav-link link-dark"}>
                    {/* <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg> */}
                    <AutoGraphIcon className="bi me-2" height="15px" width="16px"/>
                    My Stats
                    </a>
                </li>
            </Link>
            <Link to={"/team/new"} style={{textDecoration: "none"}}>
                <li className='li-item' onClick={()=>{setTab('createteam')}}>
                    <a className={ tab=="createteam" ? "nav-link active" : "nav-link link-dark"} aria-current="page">
                        {/* <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg> */}
                        <AddIcon className="bi me-2" width="16" height="16"/>
                        Create Team
                    </a>
                </li>
            </Link>
            <Link to={"/team"} style={{textDecoration: "none"}}>
                <li className='li-item' onClick={()=>{setTab('team')}}>
                    <a className={ tab=="team" ? "nav-link active" : "nav-link link-dark"} aria-current="page">
                        {/* <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg> */}
                        <Groups3Icon className="bi me-2" width="16" height="16"/>
                        Team
                    </a>
                </li>
            </Link>
            <Link to={"/teamstats"} style={{textDecoration: "none"}}>
                <li className='li-item' onClick={()=>{setTab('teamstats')}}>
                    <a className={ tab=="teamstats" ? "nav-link active" : "nav-link link-dark"} aria-current="page">
                        {/* <svg className="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg> */}
                        <InsightsIcon className="bi me-2" width="16" height="16"/>
                        Team Stats
                    </a>
                </li>
            </Link>
                
                
                
            </div>
            <hr/>
            <div className="dropdown" id='eeee4'>
                <Button variant="danger" onClick={logout}>Logout</Button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar