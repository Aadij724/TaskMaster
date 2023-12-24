import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./Team.scss";
import Scheduler2 from "../../components/scheduler/Scheduler2.jsx";
import TasksTeam from '../../components/tasksTeam/TasksTeam.jsx';
import { teams } from '../../data.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Team = () => {

  const variant1 = 'Dark';
  const variant2 = 'Secondary';

  const members = [
    "Rishi Rusia",
    "Aadi Jain",
    "Aastha",
    "Anuj Patwal",
  ]
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
              <div className='left project-left-div'>
                <div className='top-left-project-div'>
                  
                  <div className='heading-left-team'>
                    Team Under My Supervision -
                  </div>
                  <div className='ttt'>
                    <div className='ll'>
                      <div className='project-details-div'>
                        <Card
                          bg={variant1.toLowerCase()}
                          key={variant1}
                          text={variant1.toLowerCase() === 'light' ? 'dark' : 'white'}
                          className="mb-2"
                        >
                          <Card.Body>
                            <Card.Title>Project Name</Card.Title>
                            <Card.Text>
                              dslfhsdf yusfgyusb ufbuy bu ufsu fbeubf uyebifjnwihf iurh yuerug erugf yueryug
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                    <div className='rr'>
                      <div className='dd1 skl-req-div'>
                        Skills Req: <span>React</span>
                      </div>
                      <div className='dd1 est-req-div'>
                        Estimated Time: <span>2hrs</span>
                      </div>
                      <div className='team'>
                        <div className='title'>Team members:</div>
                        <div className='members'>
                          {members_div}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className='down-left-project-div'>
                  <div className='tasks'>
                    <TasksTeam/>
                  </div>
                </div>
              </div>
                
              <div className='team-right'>
                  <div className='btns-right-abv'>
                    <Button variant="primary">Refresh Schedule using AI</Button>
                    <Button variant="success">Integrate on Google Calender</Button>
                  </div>
                  <Scheduler2 page="team"/>
                
                
              </div>
            </div>
        </div>
    </div>
  )
}

export default Team