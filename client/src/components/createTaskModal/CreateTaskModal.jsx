import React, { useState } from 'react'
// import { Modal, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';


const CreateTaskModal = ({teamid,teamname,show,onHide}) => {

    const [title,setTitle] = useState('');
    const [details,setDetails] = useState('');
    const [estTimeReq,setEstTimeReq] = useState('');
    const [assignTo,setAssignTo] = useState('none');
    const [skillsReq,setSkillsReq] = useState('');

    const handleCreateTask = async ()=> {

        const task = {
            title: title,
            details: details,
            estTimeReq: estTimeReq,
            assignedTo: assignTo,
            skillsReq: skillsReq,
            status: "tobedone",
            teamId: teamid,
        };

        try {
            const resp = await axios.post("http://localhost:6005/tasks/", task, {withCredentials:true});
            console.log("At frontend task created :",resp);
        } catch (err) {
            console.log("some err at task creation");
        }

        setTitle('');
        setDetails('');
        setAssignTo('none');
        setEstTimeReq();
        setSkillsReq('');
        setTimeout( ()=>onHide(), 1000);
        
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
          {`Create Task ( ${teamname && teamname} )`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Row>
                <Form.Label column="sm" lg={3}>
                    <h5>Title : </h5>
                </Form.Label>
                <Col>
                    <Form.Control size="md" value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="task title" />
                </Col>
            </Row>
            <Row>
                <Form.Label column="sm" lg={3}>
                    <h5>Details : </h5>
                </Form.Label>
                <Col>
                    <Form.Control size="md" value={details} onChange={(e)=>setDetails(e.target.value)} type="text" placeholder="task details" />
                </Col>
            </Row>
            <Row>
                <Form.Label column="sm" lg={3}>
                    <h5>Est Time Required(in hrs) : </h5>
                </Form.Label>
                <Col>
                    <Form.Control size="md" value={estTimeReq} onChange={(e)=>setEstTimeReq(e.target.value)} type="number" placeholder="time req in hrs" />
                </Col>
            </Row>
            <Row>
                <Form.Label column="sm" lg={3}>
                    <h5>Status : </h5>
                </Form.Label>
                <Col>
                    <Form.Control size="md" value="tobedone" type="text" disabled />
                </Col>
            </Row>
            <Row>
                <Form.Label column="sm" lg={3}>
                <h5>Assign To : </h5>
                </Form.Label>
                <Col>
                <Form.Control size="md" type="text" value={assignTo} onChange={(e)=>setAssignTo(e.target.value)} placeholder="Member name" />
                </Col>
            </Row>
            <Row>
                <Form.Label column="sm" lg={3}>
                <h5>Skills Required : </h5>
                </Form.Label>
                <Col>
                <Form.Control size="md" value={skillsReq} type="text" onChange={(e)=>setSkillsReq(e.target.value)} placeholder="skills required" />
                </Col>
            </Row>
        </Form>
        
        {/* <h4>Status - {info?.assignedTo && info.assignedTo}</h4> */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleCreateTask} > Submit </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateTaskModal