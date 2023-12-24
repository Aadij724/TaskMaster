import React from 'react'
// import { Modal, Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const TaskModal = ({show,onHide,info}) => {
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
        {
          info?.assignedTo=="none" ?
          <Form>
            <Row>
              <Form.Label column="sm" lg={3}>
                <h5>Assign To : </h5>
              </Form.Label>
              <Col>
                <Form.Control size="sm" type="text" placeholder="Member name" />
              </Col>
              <Col>
                <Button variant="success" size="sm">
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