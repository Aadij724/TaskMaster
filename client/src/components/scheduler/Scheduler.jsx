import React from 'react'
import "./Scheduler.scss"

const Scheduler = () => {

    const hourList = [];
    for( var i=0; i<24; i++ ) {
        hourList.push(<div key={i} className='hour'>{i}:00 - {i+1}:00</div>)
    }

    const taskList = [];

    var taskOrder = {
        0: [0,480, "Sleep"],
        8: [0,60, "Wake up, bath"],
        9: [0,60, "Breakfast"],
        10: [0,120, "Meeting 1"],
        12: [0,60, "Tea Break"],
        13: [0,120, "Meeting 2"],
        15: [0,60, "Lunch"],
        16: [0,60, "Habit 1"],
        17: [0,60, "Habit 2"],
        18: [0,60, "Break"],
        19: [0,60, "Gym"],
        20: [0,60, "Dinner"],
        21: [0,60, "TV"],
        22: [0,120, "Sleep"],
    }

    var j=0;
    for( var hourno in taskOrder ) {
        var minStart = taskOrder[hourno][0];
        var durationMin = taskOrder[hourno][1];
        var details = taskOrder[hourno][2];

        var t = ((hourno*60 + minStart)*1.40 ) + 1;
        var h = (durationMin * 1.40) -6;

        taskList.push( <div key={j++} className='task' style={{height: h +'px', top: t+'px'}}>{details}</div> )
    }


  return (
    <div className='scheduler'>
        <div className='schedule'>
            <div className='top'>
                days
            </div>
            <div className='main'>
                <div className='timeline'>{hourList}</div>
                <div className='lists'>
                    <div className='list l1'>{taskList}</div>
                    <div className='list l2'>{taskList}</div>
                    <div className='list l3'>{taskList}</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Scheduler