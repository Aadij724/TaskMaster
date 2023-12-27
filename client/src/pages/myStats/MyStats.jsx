import React, {useState,useEffect} from 'react';
import "./Mystats.scss";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import StackedBarChart from '../../components/stackedBarChart/StackedBarChart.jsx';
import PieChartRes from '../../components/pieChart/PieChartRes.jsx';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PieChart2 from '../../components/pieChart2/PieChart2.jsx';
import AreaChart from '../../components/areaChart/AreaChart.jsx';
import RadarChartRes from '../../components/radarChartRes/RadarChartRes.jsx';

const MyStats = () => {


  //////////////////////////

  const [userdata, setUserdata] = useState({});
  console.log("User data :", userdata);

  const handleGetUser = async () => {
      try {
          const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
          console.log("At Frontend user get :",response.data.user);
          return response.data.user;
      } catch (error) {
          console.log("error", error)
      }
  }

  ////////////////////////////

  const [teamdata, setTeamdata] = useState({});
  console.log("Team data :", teamdata);

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

  ///////////////////////

  const [userTasks,setUserTasks] = useState([]);
  console.log("User Tasks : ", userTasks);

  const getTasks = async (username)=> {
    try {
      const tasksObj = await axios.get(`http://localhost:6005/users/${username}/tasks`, {assignedTo: username}, {withCredentials:true});
      console.log("User tasks at Frontend :",tasksObj);
      const tasks = tasksObj.data;
      return tasks;   

    } catch (err) {
      console.log("Some error in tasks user at frontend ",err);
    }
  };

  //////////////////

  const [stackedBarChart, setStackedBarChart] = useState(false);

  const getData = async()=>{
    const user = await handleGetUser();
    setUserdata({...user});
    console.log("At frontend handleGetUser userdata :",user);

    const teamid = user.teamId;
    console.log("Team Id : ",teamid);

    const team = await handleGetTeam(teamid);
    setTeamdata({...team});
    // new_members = team.teamMem;

    const tasks = await getTasks(user.name);
    setUserTasks([...tasks]);
    console.log("At frontend user tasks:",userTasks);

    setStackedBarChart(true);
  }


  useEffect(() => {
      // const completedTasks = userTasks.filter(task => task.status === "completed");
      // const toBeDoneTasks = userTasks.filter(task => task.status === "tobedone");

      // const noOfCompletedTasks = completedTasks.length;
      // const noOfTbdTasks = toBeDoneTasks.length;
      
    getData();
    console.log("userdata: ",userdata);
    console.log('user tasks: ',userTasks);
    console.log("team data : ",teamdata);
    
    console.log("At frontend My Stats useEffect")
    // setStackedBarChart(true)
    // setStackedBarChart(true)

  }, [])


  return (
    <div className='home'>
        <div className='nav-nb'>
            <Navbar />
        </div>
        <div className='h-body'>
            <Sidebar className="side-nb"/>
            <div className='home-content'>
              <div className='my-stats'>
                <div className='my-stats-head'>
                  My Statistics
                </div>
                <div className='my-stats-body'>
                  <div className='my-stats-details'>
                    <div className='dd2'>
                        Name : <span>{userdata.name && userdata.name}</span>
                    </div>
                    <div className='dd2'>
                        Email : <span>{userdata.email && userdata.email}</span>
                    </div>
                    <div className='dd2'>
                        Designation : <span>{userdata.designation && userdata.designation}</span>
                    </div>
                    <div className='dd2 dd3'>
                        Skills : <span>{userdata.skills && userdata.skills.join(', ') }</span>
                    </div>
                    <div className='dd2 dd3'>
                        Goals : <span>{userdata.goals && userdata.goals.join(', ')}</span>
                    </div>
                    <div className='dd2 dd3'>
                        Hobbies : <span>{userdata.hobies && userdata.hobies.join(', ')}</span>
                    </div>
                    <div className='dd2 dd4'>
                        Exercise Hours : <span>{userdata.exerciseHours && userdata.exerciseHours}</span>
                    </div>
                    <div className='dd2 dd4'>
                        Office Hours : <span>{userdata.officeHours && userdata.officeHours}</span>
                    </div>
                    <div className='dd2 dd4'>
                        Extra Office Hours : <span>{userdata.extraOfficeHours && userdata.extraOfficeHours }</span>
                    </div>
                    <div className='dd2 dd4'>
                        Free Hours : <span>{userdata.freeHours && userdata.freeHours}</span>
                    </div>
                    <div className='dd2 dd4'>
                        Sleep Hours : <span>{userdata.sleepHours && userdata.sleepHours}</span>
                    </div>
                    <div className='dd2 dd4'>
                        Hobbie Hours : <span>{userdata.hobieHours && userdata.hobieHours}</span>
                    </div>
                    <div className='dd2 dd4'>
                        Screen Time : <span>{userdata.screenTime && userdata.screenTime}</span>
                    </div>
                  </div>
                  <div className='my-stats-components'>
                    <div className='my-stats-div-1'>
                      <div className='stackedBarChart-my-stats'>
                        {
                          userTasks ?
                          <StackedBarChart teamId={teamdata._id} userdata={userdata} tasks={userTasks}/> :
                          <StackedBarChart/>
                        }
                      </div>
                      
                      <div className='pieChartRes-my-stats'>
                        {
                          userTasks ?
                          <PieChartRes teamId={teamdata._id} userdata={userdata} tasks={userTasks}/> :
                          "No pie chart "
                        }
                        
                      </div>
                    </div>
                    <div className='my-stats-div-2'>
                      <div className='pieChart2-my-stats'>
                        {
                          userdata.skills ?
                          (<PieChart2 userdata={userdata} teamId={teamdata._id} tasks={userTasks}/>) :
                          <>No pie chart 2</>
                        }
                      </div>
                      <div className='areaChart-my-stats'>
                        <AreaChart tasks={userTasks}/>
                      </div>
                      <div className='radarChart-my-stats'>
                        <RadarChartRes tasks={userTasks}/>
                      </div>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default MyStats