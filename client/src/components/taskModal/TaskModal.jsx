import React, { useState } from 'react'
// import { Modal, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';


const TaskModal = ({page,show,onHide,info}) => {

  const [assignTo, setAssignTo] = useState('none');

  const handleAssignTo = async()=> {
    try {
      const updatedTask = await axios.put(`http://localhost:6005/tasks/${info._id}/setAssign`, assignTo, {withCredentials:true});
      console.log("At Frontend assignedTo done",updatedTask);
    } catch (err) {
      console.log("Some error at task assign",err);
    }

    // ()=>onHide();
    // setAssignTo();
    setTimeout(()=>onHide(), 1000);
  }

  return (
    <Modal 
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {info && info.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <p>
          {info && info.details}
        </p>
        <h5>Status - {info && info.status}</h5>
        <h5>Assigned to - {info?.assignedTo}</h5>
        { page=="team" &&
          info?.assignedTo=="none" ?
          <Form>
            <Row>
              <Form.Label column="sm" lg={3}>
                <h5>Assign To : </h5>
              </Form.Label>
              <Col>
                <Form.Control size="sm" value={assignTo || ''} onChange={(e)=>setAssignTo(e.target.value)} type="text" placeholder="Member name" />
              </Col>
              <Col>
                <Button variant="success" onClick={handleAssignTo} size="sm">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>:
          <></>
        }
        {/* <h4>Status - {info?.assignedTo && info.assignedTo}</h4> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TaskModal