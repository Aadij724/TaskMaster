import React,{useState,useEffect} from 'react'
import Scheduler from '../../components/scheduler/Scheduler'
import Scheduler2 from '../../components/scheduler/Scheduler2'
import "./MyDashboard.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Tasks from '../../components/tasks/Tasks'
import axios from 'axios'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Scheduler3 from '../../components/scheduler/Scheduler3'

const MyDashboard = () => {

  const [userdata, setUserdata] = useState({});
  console.log("User data :", userdata);
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


  const tasksAllotted = 6;
  const progress =80

  const [scheduleChangeReq,setScheduleChangeReq] = useState('');
  const [disableControl,setDisableControl] = useState(false);

  const handleRefresh = ()=> {
    setDisableControl(true);
  }

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
                    Progress: {progress} %
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
                <Tasks teamid={teamdata._id} userId={userdata._id} username={userdata.name} />
              </div>
            </div>
          </div>
          <div className='right'>
              <div className='btns-right-abv'>
                <Form>
                  <Row>
                    <Col>
                      <Form.Control type="text" disabled={disableControl} value={scheduleChangeReq} onChange={(e)=>setScheduleChangeReq(e.target.value)} placeholder="reschedule any task ?" />
                    </Col>
                    <Col>
                      <Button variant="primary" disabled={disableControl} onClick={handleRefresh}>Reschedule tasks using AI</Button>
                    </Col>
                  </Row>
                </Form>
                    
                {/* <Button variant="success">Integrate on Google Calender</Button>  */}
              </div>
              <Scheduler3 page="personel" load={disableControl} scheduleChangeReq={scheduleChangeReq} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyDashboard