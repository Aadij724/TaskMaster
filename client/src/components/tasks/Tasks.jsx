import React, { useState,useEffect } from 'react'
import "./Tasks.scss"
import TaskModal from '../taskModal/TaskModal'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { tasksP } from '../../data';
import axios from 'axios';

const Tasks = ({userId,username,teamid}) => {

  console.log("At dashboard tasks at frontend, userId:",userId," username:",username)
  const [tasksList,setTasksList] = useState();

  const getTasks = async ()=> {
    try {
      var tasks = []
      const new_tasks = await axios.get(`http://localhost:6005/users/${username}/tasks`, {assignedTo: username}, {withCredentials:true});
      console.log("User tasks at Frontend :",new_tasks);

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
                task.status=="completed" ?
                <button className={'mrk-btn dis'} >
                  Completed
                </button> :
                <button className={'mrk-btn'}>
                  Mark as Completed
                </button>
              }
              
            </div>
          </div>
        )
      });

      setTasksList(new_tasksList);

    } catch (err) {
      console.log("Some error in tasks user at frontend ",err);
    }
  };

  useEffect(()=>{
    getTasks();

  },[teamid]);


  ///////////////////

  const [modalShow, setModalShow] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const handleComplete = ()=> {};

  const handleOpenModal = (info) => {
    setSelectedInfo(info);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setSelectedInfo(null);
    setModalShow(false);
  };

  ///////////////////////////////

  return (
    <div className='tasksl'>
        <div className='head'>
            Tasks assigned to me :
        </div>
        <div className='tasks-list'>
            <div className='tasks-list-body'>

              <div class="list-group">
                {tasksList}
              </div>
            </div>
        </div>
        
        <TaskModal page="personel" info={selectedInfo} show={modalShow} onHide={handleCloseModal} />
    </div>
  )
}

export default Tasks