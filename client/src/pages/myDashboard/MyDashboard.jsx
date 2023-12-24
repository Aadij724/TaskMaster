import React from 'react'
import Scheduler from '../../components/scheduler/Scheduler'
import Scheduler2 from '../../components/scheduler/Scheduler2'
import "./MyDashboard.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Tasks from '../../components/tasks/Tasks'
import Button from 'react-bootstrap/esm/Button'

const MyDashboard = () => {


  const members = [
    "Rishi Rusia",
    "Aadi Jain",
    "Aastha",
    "Anuj Patwal",
  ]
  const tasksAllotted = 5;
  const progress = 60;

  const members_div = [];
  var i=0;
  members.forEach(member => {
    members_div.push(<div className='member'>{members[i++]}</div>)
  });


  return (
    <div className='home'>
      <div className='nav-nb'>
        <Navbar />
      </div>
      <div className='h-body'>
        <Sidebar className="side-nb"/>
        <div className='home-content'>
          <div className='left'>
            <div className='dashboard'>
              <div className='title'>
                My Dashboard
              </div>
              <div className='above'>
                <div className='lef'>
                  <div className='d nooftasks'>
                    Tasks Allotted: {tasksAllotted}
                  </div>
                  <div className='d prog'>
                    Progress: {progress}
                  </div>
                </div>
                <div className='righ'>
                  <div className='team'>
                    <div className='title'>Team members:</div>
                    <div className='members'>
                      {members_div}
                    </div>
                  </div>
                </div>           
              </div>
              <div className='tasks'>
                <Tasks></Tasks>
              </div>
            </div>
          </div>
          <div className='right'>
              <div className='btns-right-abv'>
                <Button variant="primary">Refresh Schedule using AI</Button>
                <Button variant="success">Integrate on Google Calender</Button>
              </div>
              <Scheduler2 page="personel" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyDashboard