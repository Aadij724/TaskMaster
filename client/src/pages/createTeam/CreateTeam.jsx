import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./CreateTeam.scss"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const CreateTeam = () => {

  const availableEmps = {
    '21323': "Aadi Jain",
    '34241': "Rishi Rusia",
    '352523': "Aastha",
    '4564': "Anuj Patwal",
  };

  const optionList = [];

  Object.keys(availableEmps).forEach((empId) => {
    const empName = availableEmps[empId];

    optionList.push( <option value={empId}>{empName}</option> )
  });  

  const [select, setSelect] = useState('');
  
  const [dynamicTeam,setDynamicTeam] = useState([]);

  const handleSelectChange = (event)=> {
    setSelect(event.target.value);
  }

  // const handleAddMem = () => {
  //   setDynamicTeam( (prev)=>{
  //     return prev.push(select);
  //   })
  //   console.log(select);
  // }

  const handleAddMem = () => {

    setDynamicTeam([...dynamicTeam, availableEmps[select]]);
  };


  return (
    <div className='home'>
        <div className='nav-nb'>
            <Navbar />
        </div>
        <div className='h-body'>
            <Sidebar className="side-nb"/>
            <div className='home-content'>
                <div className='lefty'>
                  <div className='head'>
                    Create Team
                  </div>
                  <Form>

                    <Row>
                      <Form.Label column="lg" lg={3}>
                        Project Name
                      </Form.Label>
                      <Col>
                        <Form.Control size="lg" type="text" placeholder="Project Name" />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Project Details
                      </Form.Label>
                      <Col>
                        <Form.Control type='text' placeholder="Project Details" as="textarea" rows={5} />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Label column lg={3}>
                        Tasks
                      </Form.Label>
                      <Col>
                        <Form.Control type='text' placeholder="Tasks" as="textarea" rows={6} />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Label column lg={3}>
                        Estimated time
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="Estimated time" />
                      </Col>
                    </Row>
                    <br />

                  </Form>
                </div>
                <div className='righty'>
                  <Form>
                    <Row>
                      <Form.Label column lg={3}>
                        Skills Required
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="Skills Required" />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Select Team members
                      </Form.Label>
                      <Col>
                        <Form.Select aria-label="Default select example" value={select} onChange={handleSelectChange}>
                          <option>Open this select menu</option>
                          {optionList}
                        </Form.Select>
                      </Col>
                    </Row>
                    <br/>
                    <div className='add-btn-btn'>
                      <Button variant="primary" onClick={handleAddMem}>Add Member</Button>
                    </div>
                    <br/>
                    <div className='team-mem-div'>
                      <Row>
                        <Form.Label column="lg" lg={3}>
                          Team
                        </Form.Label>
                        <Col>
                          <Form.Control type='text' placeholder="Tasks" as="textarea" rows={5} value={dynamicTeam} disabled />
                        </Col>
                      </Row>

                    </div>

                    <br/>

                    <div className="d-grid gap-2 submit-btn-btn">
                      <Button variant="success" size="md">
                        Submit
                      </Button>
                    </div>
                    
                  </Form>

                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateTeam