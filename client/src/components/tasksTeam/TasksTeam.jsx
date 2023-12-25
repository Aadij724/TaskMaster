import React, { useEffect, useState } from 'react'
import "./TasksTeam.scss"
import TaskModal from '../taskModal/TaskModal'
import CreateTaskModal from '../createTaskModal/CreateTaskModal';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { tasksP } from '../../data';
import axios from 'axios';

const TasksTeam = ({teamid,teamname}) => {

  const [tasksList,setTasksList] = useState();

  const getTasks = async ()=> {
    try {
      var tasks = []
      const new_tasks = await axios.get(`http://localhost:6005/teams/${teamid}/tasks`, {withCredentials:true});
      console.log("Team tasks at Frontend :",new_tasks);

      tasks = new_tasks.data;
      const new_tasksList = [];
      tasks.forEach(task => {
        new_tasksList.push(
          <div id={task._id} className={"list-group-item list-group-item-action item1"}>
            {
              task.status=="completed" ?
                <div className={"ttl completed"} onClick={()=>handleOpenModal(task)}>
                  {task.title }
                </div> :
                <div className={"ttl"} onClick={()=>handleOpenModal(task)}>
                  {task.title}
                </div>
            }
            <div>
              {
                task.assignedTo=="none" ?
                <button className={'mrk-btn-t'} >
                  To be Assigned
                </button> :
                <button className={'mrk-btn-t dis-t'} >
                  Assigned to: {task.assignedTo}
                </button> 
              } 
            </div>          
          </div>
        )
      });

      setTasksList(new_tasksList);

    } catch (err) {
      console.log("Some error in tasks team at frontend ",err);
    }
  }
    

  useEffect(()=>{
    getTasks();

  },[teamid])

  /////////////////

  const [modalShow, setModalShow] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const handleAssign = ()=> {};

  const handleOpenModal = (info) => {
    setSelectedInfo(info);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setSelectedInfo(null);
    setModalShow(false);
  };

  ///////////////////////////

  const [showModalCreateTask, setShowModalCreateTask] = useState(false);

  const handleOpenModalCT = ()=>{
    setShowModalCreateTask(true);
  }

  const handleCloseModalCT = ()=> {
    setShowModalCreateTask(false);
  }

  //////////////////////

    
  return (
    <div className='tasksl'>
        <div className='head'>
            Tasks for team :
            <Button className='btn-add-task' onClick={handleOpenModalCT} variant="success">Create Task</Button>
        </div>
        <div className='tasks-list'>
            <div className='tasks-list-body'>

              <div class="list-group">
                {tasksList}
              </div>
            </div>
        </div>
        
        <TaskModal page="team" info={selectedInfo} show={modalShow} onHide={handleCloseModal} />
        <CreateTaskModal teamid={teamid} teamname={teamname} show={showModalCreateTask} onHide={handleCloseModalCT} />
    </div>
  )
}

export default TasksTeam