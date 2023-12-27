
import React, {useState,useEffect} from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import "./PieChartRes.scss"
import axios from 'axios';


const PieChartRes = ({tasks,userdata,teamId}) => {

  // const completedTasks = tasks.filter(task => task.status == "completed");
  // const toBeDoneTasks = tasks.filter(task => task.status == "tobedone");

  // const new_data = [
  //   { id: 0, value: noOfCompletedTasks, label: 'Taks Completed' },
  //   { id: 1, value: noOfTbdTasks, label: 'Tasks To be Done' },
  // ];

  const [dataChart,setDataChart] = useState([]);
  const [noOfCompletedTasks,setNoOfCompletedTasks] = useState(3);
  const [noOfTbdTasks,setNoOfTbdTasks] = useState(3);

  useEffect(()=>{

    console.log("At pieChart useEffect : ",tasks)
    console.log("At pieChart useEffect userdata :",userdata)

    const completedTasks = tasks.filter(task => task.status == "completed");
    const toBeDoneTasks = tasks.filter(task => task.status == "tobedone");

    setNoOfCompletedTasks(Number(completedTasks.length));
    setNoOfTbdTasks(Number(toBeDoneTasks.length));

    const new_data = [
      { id: 0, value: noOfCompletedTasks, label: 'Tasks Completed' },
      { id: 1, value: noOfTbdTasks, label: 'Tasks To be Done' },
    ];

    console.log("noOfCompletedTasks :",noOfCompletedTasks,"noOfTbdTasks :",noOfTbdTasks)
    console.log("Data Chart :",dataChart)
    setDataChart(new_data)
    console.log("Tasks :",tasks)

  },[tasks]);


  return (
    <div>
      {
        dataChart ?
        <PieChart className='pie-chart-tasks'
          series={[
          {
              data: dataChart,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
          ]}
          height={200}
        /> : 
        <></>
      }
    </div>
    
    
    

    
  )
}

export default PieChartRes

