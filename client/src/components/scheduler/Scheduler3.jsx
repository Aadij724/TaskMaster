import React, { useState,useEffect } from 'react'
import "./Scheduler3.scss"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';


const Scheduler3 = ({page,scheduleChangeReq,load}) => {

    const [scheduleType, setScheduleType ] = useState(page)

    //////////////////////////


  const handleGetUser = async () => {
      try {
          const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
          console.log("At Frontend user get :",response.data.user);
          return response.data.user;
      } catch (error) {
          console.log("error", error)
      }
  }

  const handleGetSchedule = async (userdata) => {
        try {
            const schedule1 = await axios.post(`http://localhost:6005/schedule/user/${userdata._id}`, {requestByUser: scheduleChangeReq}, {withCredentials: true});
            console.log("AT Frontend Schedule:",schedule1);
            return schedule1;
        } catch (err) {
            console.log("At Frontend Schedule err ",err)
        }
  }
 
  ////////////////////////////

  const [userdata, setUserdata] = useState({});
  console.log("User data :", userdata);

  const getData = async()=>{
    const user = await handleGetUser();
    setUserdata({...user});
    console.log("At frontend handleGetUser userdata :",user);
  }

  //////////////////////////

  const [schedule, setSchedule] = useState({});
  console.log("Schedule :",schedule );

  const getSchedule = async(userdata) => {
    const schedule1 = await handleGetSchedule(userdata);
    setSchedule(schedule1.data);
    console.log("schedule : ",schedule)
  }

  //////////////////////////////

  const setLists = async() => {
    await Promise.all([
        setTaskOrder1(schedule["Sunday"]),
        setTaskOrder2(schedule["Monday"]),
        setTaskOrder3(schedule["Tuesday"]),
        setTaskOrder4(schedule["Wednesday"]),
        setTaskOrder5(schedule["Thursday"]),
        setTaskOrder6(schedule["Friday"]),
        setTaskOrder7(schedule["Saturday"]),
    ])
    
    
    await Promise.all([
        taskListGen(setTaskList1, taskOrder1),
        taskListGen(setTaskList2, taskOrder2),
        taskListGen(setTaskList3, taskOrder3),
        taskListGen(setTaskList4, taskOrder4),
        taskListGen(setTaskList5, taskOrder5),
        taskListGen(setTaskList6, taskOrder6),
        taskListGen(setTaskList7, taskOrder7),
    ]);
  }

  /////////////////////////////

  const [taskOrder1,setTaskOrder1] = useState({});
  const [taskOrder2,setTaskOrder2] = useState({});
  const [taskOrder3,setTaskOrder3] = useState({});
  const [taskOrder4,setTaskOrder4] = useState({});
  const [taskOrder5,setTaskOrder5] = useState({});
  const [taskOrder6,setTaskOrder6] = useState({});
  const [taskOrder7,setTaskOrder7] = useState({});

  const [taskList1,setTaskList1] = useState([]);
  const [taskList2,setTaskList2] = useState([]);
  const [taskList3,setTaskList3] = useState([]);
  const [taskList4,setTaskList4] = useState([]);
  const [taskList5,setTaskList5] = useState([]);
  const [taskList6,setTaskList6] = useState([]);
  const [taskList7,setTaskList7] = useState([]);
  

  useEffect(() => {
      
    getData();
    console.log("At frontend Scheduler 3 useEffect")
    console.log("userdata: ",userdata);

    getSchedule(userdata).then(()=>{
        console.log("At frontend useEffect Schedule 3 :",schedule);
        setLists().then(()=>{
            console.log("TaskOrder1 :",taskOrder1)
            console.log("TaskList1 :",taskList1);
        })
    })
    
    
  }, [page,load])

//   useEffect(() => {
      
//     getData();
//     console.log("At frontend Scheduler 3 useEffect")
//     console.log("userdata: ",userdata);

//     getSchedule(userdata).then(()=>{
//         console.log("At frontend useEffect Schedule 3 :",schedule);
//         setLists().then(()=>{
//             console.log("TaskOrder1 :",taskOrder1)
//             console.log("TaskList1 :",taskList1);
//         })
//     })
    
    
//   }, [])


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const taskColor = {
      "meeting": "#D50000",
      "habit": "#039BE5",
      "gym": "#8E24AA",
      "bath": "#0B8043",
      "breakfast": "#F4511E",
      "lunch": "#F4511E",
      "dinner": "#F4511E",
      "break": "#7986CB",
      "free": "#33B679",
      "project": "#E67C73",
      "sleep": "#616161",
  };

////////////////////////////////////////////////////////////////



      var hourList = [];

      for (var i = 9; i < 18; i++) {
        var startTime = i % 12 === 0 ? 12 : i % 12; // Convert 0 to 12
        var amPm = i < 12 ? 'AM' : 'PM';

        var timeLabel = i % 12 === 0 ? `${startTime} ${amPm}` : `${startTime} ${amPm}`;

        hourList.push(
          <div key={i} className='hour'>
            {timeLabel}
          </div>
        );
      }

    function calculateDurationInMinutes(timeInterval) {
        const [start, end] = timeInterval.split(' - ');
        const startTime = parseTime(start);
        const endTime = parseTime(end);
        const durationInMinutes = (endTime - startTime + 1440) % 1440; // Ensure positive result for 24-hour format
        return durationInMinutes;
      }
      
      function parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
      }

      function convertTo12HourFormat(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
      
        const period = hours >= 12 ? 'PM' : 'AM';
      
        const hours12 = hours % 12 || 12;
      
        const timeWithoutMinutes = minutes === 0 ? `${hours12}` : `${hours12}:${minutes}`;
      
        const result = `${timeWithoutMinutes} ${period}`;
      
        return result;
      }
    
    


    // var taskOrder1 = {
    //   '9:00 - 10:00': "breakfast",
    //   '10:00 - 12:00': "meeting",
    //   '12:00 - 13:00': "break",
    //   '13:00 - 15:00': "meeting",
    //   '15:00 - 16:00': "lunch",
    //   '16:00 - 17:00': "habit",
    //   '17:00 - 18:00': "project",
    // };

    // const taskList1 = [];

    // var taskOrder2 = {
    //   '09:00 - 10:00': "free", // Non-specific time marked as free
    //   '10:00 - 12:00': "meeting",
    //   '12:00 - 13:00': "break",
    //   '13:00 - 15:00': "free", // Marking 1:00 PM to 3:00 PM as Free
    //   '15:00 - 16:00': "lunch",
    //   '16:00 - 17:00': "habit",
    //   '17:00 - 18:00': "habit",
    // };
    
    // const taskList2 = [];

    // var taskOrder3 = {
    //   '09:00 - 10:00': "free",
    //   '10:00 - 12:00': "meeting",
    //   '12:00 - 13:30': "break", // Extended Tea Break to 1.5 hours
    //   '13:30 - 15:00': "free",
    //   '15:00 - 16:30': "lunch", // Extended Lunch to 1.5 hours
    //   '16:30 - 18:00': "habit",
    // };
  
    // const taskList3 = [];

    ///////////////////////////////////////////////////////////////

    function taskListGen(setTaskList, taskOrder) {
        var taskElements = []; // Create an array to accumulate task elements
      
        for (const timeInterval in taskOrder) {
          const durationInMinutes = calculateDurationInMinutes(timeInterval);
          const details = taskOrder[timeInterval];
      
          const hrs = durationInMinutes / 60;
          const h = durationInMinutes * 1.33 + (hrs - 1) * 8;
      
          const [startTime, endTime] = timeInterval.split(' - ');
          const convertedStartTime = convertTo12HourFormat(startTime);
          const convertedEndTime = convertTo12HourFormat(endTime);
      
          taskElements.push(
            <div key={timeInterval} className={'taski ' + taskOrder[timeInterval]} style={{ height: h + 'px' }}>
              <div className='det'>{details}</div>
              <div className='tt'>{`${convertedStartTime} - ${convertedEndTime}`}</div>
            </div>
          );
        }
      
        setTaskList(taskElements); // Set the state after the loop is completed
      }

    // taskListGen(taskList1, taskOrder1);
    // taskListGen(taskList2, taskOrder2);
    // taskListGen(taskList3, taskOrder3);

////////////////////////////////////////

  const memberList = []
  const members = {
    "Ram": 1,
    "Lakshman": 2,
    "Bharat": 3,
    "Shanta": 4
  }

  for( var member in members ) {
    memberList.push(
      <div className='day'>
        <div className='name'>{members[member]}</div>
        <div className='number'>{member}</div>
      </div>
    )
  }

// ////////////////////////////////////

  const today = 28;
  const daysList = []
  const days = {
    "Mon": 25,
    "Tue": 26,
    "Wed": 27,
    "Thu": 28,
    "Fri": 29,
    "Sat": 30,
    "Sun": 31,
  }
  for( var day in days ) {
    {
      days[day]==today ?
      daysList.push(
        <div className='day' style={{width:"12%"}}>
          <div className='name'>{day}</div>
          <div className='number' style={{borderBottom: "6px solid #0d6efd"}}>{days[day]}</div>
        </div>
      ) :
      daysList.push(
        <div className='day' style={{width:"12%"}}>
          <div className='name'>{day}</div>
          <div className='number'>{days[day]}</div>
        </div>
      )
    }
    
  }

  //////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////

  

  return (
    <div className='scheduler'>
        <div className='schedule'>
            <div className='head'>
              <span className='monye'>December, 2023</span>
              <ButtonGroup className='teampers' variant="contained" aria-label="outlined primary button group">
                <Button onClick={()=>setScheduleType('team')}>Team</Button>
                <Button onClick={()=>setScheduleType('personel')}>Personel</Button>
              </ButtonGroup>
            </div>
            <div className='top'>
              <div className='today'>
                {
                  scheduleType=="team" && 
                  <div className='dayt' style={{borderBottom: "6px solid #0d6efd"}}>
                    <div className='name'>Thursday</div>
                    <div className='number'>28</div>
                  </div>
                }
              </div>
              <div className='days'>
                {scheduleType=='team' ? memberList : daysList}
              </div>
            </div>
            <div className='main'>
                <div className='timeline'>{hourList}</div>
                {
                    (schedule) ?
                    <div className='lists'>
                        { scheduleType=='personel' && taskOrder1 && <div key={1} className='list' style={{width:"12%"}}>{taskList1}</div>}
                        { scheduleType=='personel' && taskOrder2 && <div key={2} className='list' style={{width:"12%"}}>{taskList2}</div>}
                        { scheduleType=='personel' && taskOrder3 && <div key={3} className='list' style={{width:"12%"}}>{taskList3}</div>}
                        { scheduleType=='personel' && taskOrder4 && <div key={4} className='list' style={{width:"12%"}}>{taskList4}</div>}
                        { scheduleType=='personel' && taskOrder5 && <div key={5} className='list' style={{width:"12%"}}>{taskList5}</div>}
                        { scheduleType=='personel' && taskOrder6 && <div key={6} className='list' style={{width:"12%"}}>{taskList6}</div>}
                        { scheduleType=='personel' && taskOrder7 && <div key={7} className='list' style={{width:"12%"}}>{taskList7}</div>}
                        
                        { scheduleType=='team' && <div key={1} className='list' style={{width:"22%"}}>{taskList1}</div> }
                        { scheduleType=='team' && <div key={2} className='list' style={{width:"22%"}}>{taskList2}</div> }
                        { scheduleType=='team' && <div key={3} className='list' style={{width:"22%"}}>{taskList3}</div> }
                        { scheduleType=='team' && <div key={4} className='list' style={{width:"22%"}}>{taskList4}</div> } 
                    </div> :
                    <div className='lists' style={{color:"black"}}>Loading Lists</div>
                }
            </div>
        </div>
    </div>
  )
}

export default Scheduler3