import React, { useState } from 'react'
import "./Scheduler2.scss"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Scheduler2 = ({page}) => {


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

    // const hourList = [];
    //   for( var i=0; i<24; i++ ) {
    //       hourList.push(<div key={i} className='hour'>{i}:00 - {i+1}:00</div>)
    //   }


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
        // Split the time string into hours and minutes
        const [hours, minutes] = timeString.split(':').map(Number);
    
        // Determine AM or PM
        const period = hours >= 12 ? 'PM' : 'AM';
    
        // Convert hours to 12-hour format
        const hours12 = hours % 12 || 12;
    
        // Create the time string without minutes if they are 0
        const timeWithoutMinutes = minutes === 0 ? `${hours12}` : `${hours12}:${minutes}`;
    
        // Format the result
        const result = `${timeWithoutMinutes} ${period}`;
    
        return result;
      }
    
      
    //   var taskOrder3 = {
    //     '00:00 - 07:00': "Sleep",
    //     '07:00 - 08:30': "Wake up, bath",
    //     '08:30 - 09:30': "Breakfast",
    //     '09:30 - 10:00': "Free",
    //     '10:00 - 12:00': "Meeting 1",
    //     '12:00 - 13:30': "Tea Break", // Extended Tea Break to 1.5 hours
    //     '13:30 - 15:00': "Free",
    //     '15:00 - 16:30': "Lunch", // Extended Lunch to 1.5 hours
    //     '16:30 - 18:00': "Habit",
    //     '18:00 - 19:00': "Break",
    //     '19:00 - 20:00': "Gym", // Reduced Gym to 1 hour
    //     '20:00 - 21:00': "Dinner",
    //     '21:00 - 22:00': "TV",
    //     '22:00 - 00:00': "Sleep",
    // };
    
      
    //   const taskList3 = [];
    
    // var i=0;
    
    // for (const timeInterval in taskOrder3) {
    //     const durationInMinutes = calculateDurationInMinutes(timeInterval);
    //     console.log(durationInMinutes);
    //     const details = taskOrder3[timeInterval];

    //     const hrs = durationInMinutes/60;
    //     var h = (durationInMinutes * 1.33) + ((hrs-1)*12)  ;
    //     i++;

    //     taskList3.push( <div key={durationInMinutes + i} className='task' style={{height: h +'px'}}>{details}</div> )
    // }


  //   var taskOrder2 = {
  //     '00:00 - 07:00': "Sleep",
  //     '07:00 - 08:30': "Wake up, bath",
  //     '08:30 - 09:30': "Breakfast",
  //     '09:30 - 10:00': "Free", // Non-specific time marked as free
  //     '10:00 - 12:00': "Meeting 1",
  //     '12:00 - 13:00': "Tea Break",
  //     '13:00 - 15:00': "Free", // Marking 1:00 PM to 3:00 PM as Free
  //     '15:00 - 16:00': "Lunch",
  //     '16:00 - 17:00': "Habit 1",
  //     '17:00 - 18:00': "Habit 2",
  //     '18:00 - 19:00': "Break",
  //     '19:00 - 20:00': "Gym",
  //     '20:00 - 21:00': "Dinner",
  //     '21:00 - 22:00': "TV",
  //     '22:00 - 00:00': "Sleep",
  // };
  
    
  //   const taskList2 = [];
  
  // var i=0;
  
  // for (const timeInterval in taskOrder2) {
  //     const durationInMinutes = calculateDurationInMinutes(timeInterval);
  //     console.log(durationInMinutes);
  //     const details = taskOrder2[timeInterval];

  //     const hrs = durationInMinutes/60;
  //     var h = (durationInMinutes * 1.33) + ((hrs-1)*12)  ;
  //     i++;

  //     taskList2.push( <div key={durationInMinutes + i} className='task' style={{height: h +'px'}}>{details}</div> )
  // }

  // var taskOrder = {
  //   '00:00 - 8:00': "sleep",
  //   '8:00 - 9:00': "bath",
  //   '9:00 - 10:00': "breakfast",
  //   '10:00 - 12:00': "meeting",
  //   '12:00 - 13:00': "break",
  //   '13:00 - 15:00': "meeting",
  //   '15:00 - 16:00': "lunch",
  //   '16:00 - 17:00': "habit",
  //   '17:00 - 18:00': "project",
  //   '18:00 - 19:00': "break",
  //   '19:00 - 20:00': "gym",
  //   '20:00 - 21:00': "dinner",
  //   '21:00 - 22:00': "break",
  //   '22:00 - 00:00': "sleep",
  // };
  
  // const taskList = [];

// var i=0;

// for (const timeInterval in taskOrder) {
//     const durationInMinutes = calculateDurationInMinutes(timeInterval);
//     console.log(durationInMinutes);
//     const details = taskOrder[timeInterval];

//     const hrs = durationInMinutes/60;
//     var h = (durationInMinutes * 1.33) + ((hrs-1)*12)  ;
//     i++;

//     taskList.push( <div key={durationInMinutes + i} className={'task'+ } style={{height: h +'px'}}>{details}</div> )
// }


    var taskOrder1 = {
      // '00:00 - 8:00': "sleep",
      // '8:00 - 9:00': "bath",
      '9:00 - 10:00': "breakfast",
      '10:00 - 12:00': "meeting",
      '12:00 - 13:00': "break",
      '13:00 - 15:00': "meeting",
      '15:00 - 16:00': "lunch",
      '16:00 - 17:00': "habit",
      '17:00 - 18:00': "project",
      // '18:00 - 19:00': "break",
      // '19:00 - 20:00': "gym",
      // '20:00 - 21:00': "dinner",
      // '21:00 - 22:00': "break",
      // '22:00 - 00:00': "sleep",
    };

    const taskList1 = [];

    var taskOrder2 = {
      // '00:00 - 07:00': "sleep",
      // '07:00 - 08:30': "bath",
      // '08:30 - 09:00': "breakfast",
      '09:00 - 10:00': "free", // Non-specific time marked as free
      '10:00 - 12:00': "meeting",
      '12:00 - 13:00': "break",
      '13:00 - 15:00': "free", // Marking 1:00 PM to 3:00 PM as Free
      '15:00 - 16:00': "lunch",
      '16:00 - 17:00': "habit",
      '17:00 - 18:00': "habit",
      // '18:00 - 19:00': "break",
      // '19:00 - 20:00': "gym",
      // '20:00 - 21:00': "dinner",
      // '21:00 - 22:00': "break",
      // '22:00 - 00:00': "sleep",
    };
    
    const taskList2 = [];

    var taskOrder3 = {
      // '00:00 - 07:00': "sleep",
      // '07:00 - 08:30': "bath",
      // '08:30 - 09:00': "breakfast",
      '09:00 - 10:00': "free",
      '10:00 - 12:00': "meeting",
      '12:00 - 13:30': "break", // Extended Tea Break to 1.5 hours
      '13:30 - 15:00': "free",
      '15:00 - 16:30': "lunch", // Extended Lunch to 1.5 hours
      '16:30 - 18:00': "habit",
      // '18:00 - 19:00': "break",
      // '19:00 - 20:00': "gym", // Reduced Gym to 1 hour
      // '20:00 - 21:00': "dinner",
      // '21:00 - 22:00': "break",
      // '22:00 - 00:00': "sleep",
    };
  
    const taskList3 = [];

    ///////////////////////////////////////////////////////////////

    function taskListGen (  taskList, taskOrder) {
      var i=0;
      for (const timeInterval in taskOrder) {
        i++;
        const durationInMinutes = calculateDurationInMinutes(timeInterval);
        console.log(durationInMinutes);
        const details = taskOrder[timeInterval];
    
        const hrs = durationInMinutes/60;
        var h = (durationInMinutes * 1.33) + ((hrs-1)*8)  ;
        i++;
    
        const [startTime, endTime] = timeInterval.split(' - ');
        const convertedStartTime = convertTo12HourFormat(startTime);
        const convertedEndTime = convertTo12HourFormat(endTime);

        taskList.push(
          <div key={durationInMinutes + i} className={'task '+ taskOrder[timeInterval]} style={{height: h +'px'}}>
            <div className='det'>{details}</div>
            <div className='tt'>{`${convertedStartTime} - ${convertedEndTime}`}</div>
          </div> 
        )
      }
    }

    taskListGen(taskList1, taskOrder1);
    taskListGen(taskList2, taskOrder2);
    taskListGen(taskList3, taskOrder3);

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

  const daysList = []
  const days = {
    "Sun": 10,
    "Mon": 11,
    "Tue": 12,
    "Wed": 13,
    "Thu": 14,
    "Fri": 15,
    "Sat": 16
  }
  for( var day in days ) {
    daysList.push(
      <div className='day' style={{width:"12%"}}>
        <div className='name'>{day}</div>
        <div className='number'>{days[day]}</div>
      </div>
    )
  }

  //////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////

  const [scheduleType, setScheduleType ] = useState(page)

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
                  <div className='dayt'>
                    <div className='name'>Monday</div>
                    <div className='number'>11</div>
                  </div>
                }
              </div>
              <div className='days'>
                {scheduleType=='team' ? memberList : daysList}
              </div>
            </div>
            <div className='main'>
                <div className='timeline'>{hourList}</div>
                <div className='lists'>
                  { scheduleType=='personel' && <div key={1} className='list' style={{width:"12%"}}>{taskList1}</div> }
                  { scheduleType=='personel' && <div key={2} className='list' style={{width:"12%"}}>{taskList2}</div> }
                  { scheduleType=='personel' && <div key={3} className='list' style={{width:"12%"}}>{taskList3}</div> }
                  { scheduleType=='personel' && <div key={4} className='list' style={{width:"12%"}}>{taskList1}</div> }
                  { scheduleType=='personel' && <div key={5} className='list' style={{width:"12%"}}>{taskList2}</div> }
                  { scheduleType=='personel' && <div key={6} className='list' style={{width:"12%"}}>{taskList3}</div> }
                  { scheduleType=='personel' && <div key={7} className='list' style={{width:"12%"}}>{taskList1}</div> }
                  

                  { scheduleType=='team' && <div key={1} className='list' style={{width:"22%"}}>{taskList1}</div> }
                  { scheduleType=='team' && <div key={2} className='list' style={{width:"22%"}}>{taskList2}</div> }
                  { scheduleType=='team' && <div key={3} className='list' style={{width:"22%"}}>{taskList3}</div> }
                  { scheduleType=='team' && <div key={4} className='list' style={{width:"22%"}}>{taskList1}</div> }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Scheduler2