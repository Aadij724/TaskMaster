import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./Team.scss";
import Scheduler2 from "../../components/scheduler/Scheduler2.jsx";
import TasksTeam from '../../components/tasksTeam/TasksTeam.jsx';
import { teams } from '../../data.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Team = () => {

  const variant1 = 'Dark';
  const variant2 = 'Secondary';


  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);
  const [teamdata, setTeamdata] = useState({});
  console.log("Team data :", teamdata);


  const handleGetUser = async () => {
      try {
          const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
          console.log("At Frontend user get :",response.data.user);
          // setUserdata(response.data.user)
          // console.log("At frintend handleGetUser userdata :",userdata);
          return response.data.user;
      } catch (error) {
          console.log("error", error)
      }
  }

  const handleGetTeam = async (teamid) => {
    try {
        const teamRes = await axios.get(`http://localhost:6005/teams/${teamid}`, {withCredentials:true});
        console.log("At Frontend team get :",teamRes.data);
        // setTeamdata(resp)
        return teamRes.data;
    } catch (error) {
        console.log("error", error)
    }
  }

  const getUsernameFromId = async (userid) => {
    try {
      const user = await axios.get(`http://localhost:6005/users/${userid}`, {withCredentials:true});
      console.log("At frontend getUsers: ",user.data.name);
      return user.data.name;
    } catch (err) {
      console.log(err);
    }
  }

  const [members_div,setMembers_div] = useState([]);

  const getData = async()=>{

    var new_members = [];

    const user = await handleGetUser();
    setUserdata({...user});
    console.log("At frintend handleGetUser userdata :",userdata);

    const teamid = user.teamId;
    console.log("Team Id : ",teamid);

    const team = await handleGetTeam(teamid);
    setTeamdata({...team});
    new_members = team.teamMem;

    // const new_members_div = [];
    // new_members.forEach( async(member) => {
    //   const username = await getUsernameFromId(member);
    //   new_members_div.push(<div className='member'>{username}</div>)
    // });

    const new_members_div = await Promise.all(
      new_members.map(async (member) => {
        const username = await getUsernameFromId(member);
        return <div className='member'>{username}</div>;
      })
    );

    setMembers_div(new_members_div);
  }

  useEffect(() => {

      getData();
      console.log("userdata:",userdata);
      console.log("teamdata:",teamdata);
      
  }, [])

  // const members = [
  //   "Rishi Rusia",
  //   "Aadi Jain",
  //   "Aastha",
  //   "Anuj Patwal",
  // ]
  
  // var i=0;
  // members.forEach(member => {
  //   members_div.push(<div className='member'>{members[i++]}</div>)
  // });

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
                            <Card.Title>{teamdata ? teamdata.name : <>Project Name</>}</Card.Title>
                            <Card.Text>
                              {teamdata ? teamdata.details : <>Project Details</>}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                    <div className='rr'>
                      <div className='dd1 skl-req-div'>
                        Skills Req: <span>{teamdata ? teamdata.skillsReq : <>Skills Req</>}</span>
                      </div>
                      <div className='dd1 est-req-div'>
                        Estimated Time: <span>{teamdata ? teamdata.estTime : <>Estimated Time</>}</span>
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
                    <TasksTeam teamid={teamdata._id} teamname={teamdata.name}/>
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