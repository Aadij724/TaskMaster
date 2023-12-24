import React, { useState } from 'react'
import "./Tasks.scss"
import TaskModal from '../taskModal/TaskModal'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { tasksP } from '../../data';

const Tasks = () => {
  const tasks = tasksP;

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


    const tasksList = [];
    tasks.forEach(task => {
      tasksList.push(
        <div id={task.id} className={"list-group-item list-group-item-action item1"}>
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
            {/* <button className='view-btn'>
              View
            </button>  */}
            {
              task.status=="completed" ?
              <button className={'mrk-btn dis'} onClick={handleComplete} >
                Completed
              </button> :
              <button className={'mrk-btn'} onClick={handleComplete}>
                Mark as Completed
              </button>
            }
            
          </div>
          
          
        </div>
      )
    });



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
        
        <TaskModal info={selectedInfo} show={modalShow} onHide={handleCloseModal} />
    </div>
  )
}

export default Tasks