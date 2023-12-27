
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./StackedBarChart.scss";
import axios from 'axios';


const StackedBarChart = ({tasks,userdata,teamId}) => {

  const [userTasksList,setUserTasksList] = useState([]);
  console.log("User Tasks : ", userTasksList);

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

  const [dataChart,setDataChart] = useState([]);

  const getData = async(username)=>{
    
    const tasks = await getTasks(username);
    console.log("At frontend user tasks:",tasks);

    setUserTasksList(tasks);

    const new_data = await tasks.filter(task => task.status == 'completed')
                        .map(task => ({
                                name: task.title,
                                EstimatedTimeRequired: task.estTimeReq,
                                ActualTimeTaken: task.actualTimeTaken,
                              })
                        );

    setDataChart(new_data);
    
  }

      // const completedTasks = tasks.filter(task => task.status === "completed");
      // const toBeDoneTasks = tasks.filter(task => task.status === "tobedone");

      // const noOfCompletedTasks = completedTasks.length;
      // const noOfTbdTasks = toBeDoneTasks.length;

      // const data = tasks.filter(task => task.status == 'completed')
      //                   .map(task => ({
      //                           name: task.title,
      //                           EstimatedTimeRequired: task.estTimeReq,
      //                           ActualTimeTaken: task.actualTimeTaken,
      //                         })
      //                   );


    useEffect(()=>{
      getData(userdata.name);
  
    },[teamId]);

  return (
      <ResponsiveContainer width="100%" height="100%">

        <BarChart
          width={500}
          height={300}
          data={dataChart}
          margin={{
            top: 5,
            right: 2,
            left: 2,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="EstimatedTimeRequired" stackId="a" fill="#8884d8" />
          <Bar dataKey="ActualTimeTaken" stackId="a" fill="#82ca9d" />
          
        </BarChart>
      </ResponsiveContainer>

  )
}

export default StackedBarChart