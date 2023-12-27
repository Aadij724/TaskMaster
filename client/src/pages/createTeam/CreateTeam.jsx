import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./CreateTeam.scss"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const CreateTeam = () => {

  
  const availableEmps = {};

  const availEmpFunc = async () => {
    try {
      const aes = await axios.get("http://localhost:6005/users/availableEmps", {withCredentials:true});
      console.log("AvailableEmps at Frontend :",aes);
      const aess=aes.data;

      aess.forEach(ae => {
        availableEmps[ae._id] = ae.name;
      });

      console.log(availableEmps);

      const newOptionList = [];
      Object.keys(availableEmps).forEach((empId) => {
        const empName = availableEmps[empId];
    
        newOptionList.push( <option id={empId} value={empId}>{empName}</option> )
      }); 
      setOptionList(newOptionList);

    } catch (err) {
      console.log("Error at frontend :",err);
    }
  }

  useEffect(()=>{
    availEmpFunc();
  },[])

  

  const setAvailable = async (userid) => {
    try {
      const emp = await axios.put(`http://localhost:6005/users/${userid}/setAvailableEmpAsFalse`, {withCredentials:true});
    } catch (err) {
      console.log("At Frontend err :",err);
    }
  }



  // const availableEmps = {
  //   '21323': "Aadi Jain",
  //   '34241': "Rishi Rusia",
  //   '352523': "Aastha",
  //   '4564': "Anuj Patwal",
  // };

  const [optionList, setOptionList] = useState([]);

  Object.keys(availableEmps).forEach((empId) => {
    const empName = availableEmps[empId];
    optionList.push( <option value={empId}>{empName}</option> )
  }); 


  const [projectName,setProjectName] = useState('')
  const [projectDetails,setProjectDetails] = useState('')
  const [estTime,setEstTime] = useState('')
  const [skillsReq,setSkillsReq] = useState('')

  const handleCreateTeam = async ()=> {

    const team = {
      name: projectName,
      teamMem: dynamicTeam,
      details: projectDetails,
      skillsReq: skillsReq,
      estTime: estTime,
    }

    try {
      const newTeam = await axios.post("http://localhost:6005/teams", team, {withCredentials:true});
      console.log("At Frontend :",newTeam);

      dynamicTeam.forEach( async(id) => {
        const updateUser = await axios.put(`http://localhost:6005/users/${id}`, {teamId: newTeam.data._id}, {withCredentials:true} );
        console.log(newTeam.data._id);
        console.log("At Frontend user updated teamid :",updateUser );
      });
      setDynamicTeam([]);
      setEstTime('');
      setProjectDetails('');
      setProjectName('');
      setSkillsReq('');
      setSelect('Open this select menu')
    } catch (err) {
      console.log("At frontend new Team err:",err);
    }
    
  }

  
  

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

    setDynamicTeam([...dynamicTeam, select]);
    setAvailable(select);
    availEmpFunc();
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
                        <Form.Control size="lg" type="text" value={projectName} onChange={(e)=>setProjectName(e.target.value)} placeholder="Project Name" />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Project Details
                      </Form.Label>
                      <Col>
                        <Form.Control type='text' value={projectDetails} onChange={(e)=>setProjectDetails(e.target.value)} placeholder="Project Details" as="textarea" rows={5} />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Label column lg={3}>
                        Tasks
                      </Form.Label>
                      <Col>
                        <Form.Control type='text' placeholder="Tasks" as="textarea" rows={6} disabled />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Label column lg={3}>
                        Estimated time
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" value={estTime} onChange={(e)=>setEstTime(e.target.value)} placeholder="Estimated time" />
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
                        <Form.Control type="text" value={skillsReq} onChange={(e)=>setSkillsReq(e.target.value)} placeholder="Skills Required" />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Select Team members
                      </Form.Label>
                      <Col>
                        <Form.Select aria-label="Default select example" value={select} onChange={handleSelectChange}>
                          <option>Available Employees</option>
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
                          <Form.Control type='text' placeholder="Members" as="textarea" rows={5} value={dynamicTeam} disabled />
                        </Col>
                      </Row>

                    </div>

                    <br/>

                    <div className="d-grid gap-2 submit-btn-btn">
                      <Button variant="success" size="md" onClick={handleCreateTeam}>
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