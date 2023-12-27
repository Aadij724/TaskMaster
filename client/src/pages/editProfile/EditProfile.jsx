import React, { useState,useEffect } from 'react'
import "./EditProfile.scss"
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const EditProfile = () => {

  const [userdata, setUserdata] = useState({});
  console.log("User data :", userdata);

  const handleGetUser = async () => {
    try {
        const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
        console.log("At Frontend user get :",response.data.user);
        // setUserdata(response.data.user)
        // console.log("At frintend handleGetUser userdata :",userdata);
        return response.data.user;
    } catch (error) {
        console.log("error", error)
    }
  }

  const getData = async () => {
    const user = await handleGetUser();
    setUserdata({...user});
    console.log("At frintend handleGetUser userdata :",userdata);
  }

  useEffect(() => {

    getData();
    console.log("userdata:",userdata);
    
  }, [])


  const [sleepHours,setSleepHours] = useState();
  const [freeHours,setFreeHours] = useState();
  const [officeHours,setOfficeHours] = useState();
  const [extraOfficeHours,setExtraOfficeHours] = useState();
  const [hobieHours,setHobieHours] = useState();
  const [hobies,setHobies] = useState();
  const [goals,setGoals] = useState();
  const [skills,setSkills] = useState();
  const [designation,setDesignation] = useState();
  const [screenTime,setScreenTime] = useState();
  const [exerciseHours,setExerciseHours] = useState();
  

  const handleEditProfile = async ()=> {

    const skillsArray = skills.split(',').map(entity => entity.trim());
    const goalsArray = goals.split(',').map(entity => entity.trim());
    const hobiesArray = hobies.split(',').map(entity => entity.trim());

    const updProfile = {
      sleepHours: sleepHours,
      officeHours: officeHours,
      extraOfficeHours: extraOfficeHours,
      exerciseHours: exerciseHours,
      hobieHours: hobieHours,
      designation: designation,
      skills: skillsArray,
      goals: goalsArray,
      hobies: hobiesArray,
      screenTime: screenTime,
      freeHours: freeHours,
    }

    try {
      const updatedProfile = await axios.post(`http://localhost:6005/users/${userdata._id}`, updProfile, {withCredentials:true} );
      console.log("At frontend updated profile ",updatedProfile);
    } catch (err) {
      console.log("At frontend err updated profile ",err);
    }

    setTimeout(()=>{
      setDesignation('')
      setExerciseHours()
      setExtraOfficeHours()
      setFreeHours()
      setGoals('')
      setHobieHours()
      setHobies('')
      setOfficeHours()
      setScreenTime()
      setSkills('')
      setSleepHours()
    },1000)
    
  }

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
                    Edit Profile
                  </div>
                  <Form>

                    <Row>
                      <Form.Label column="lg" lg={3}>
                        Name
                      </Form.Label>
                      <Col>
                        <Form.Control size="lg" type="text" value={userdata.name} disabled placeholder="Name" />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Email
                      </Form.Label>
                      <Col>
                        <Form.Control type='text' value={userdata.email} disabled placeholder="Project Details"  />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Designation
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" value={designation} onChange={(e)=>setDesignation(e.target.value)} placeholder="Position in Organisation" />
                      </Col>
                    </Row>
                    <br />
                    
                    <Row>
                      <Form.Label column lg={3}>
                        Sleep Hours
                      </Form.Label>
                      <Col>
                        <Form.Control type="number" value={sleepHours} onChange={(e)=>setSleepHours(e.target.value)} placeholder="no. of sleep hours" />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Label column lg={3}>
                        Free Hours
                      </Form.Label>
                      <Col>
                        <Form.Control type="number" value={freeHours} onChange={(e)=>setFreeHours(e.target.value)} placeholder="no. of free hours" />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Label column lg={3}>
                        Office Hours
                      </Form.Label>
                      <Col>
                        <Form.Control type="number" value={officeHours} onChange={(e)=>setOfficeHours(e.target.value)} placeholder="no. of office hours" />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Label column lg={3}>
                        Extra Office Hours
                      </Form.Label>
                      <Col>
                        <Form.Control type="number" value={extraOfficeHours} onChange={(e)=>setExtraOfficeHours(e.target.value)} placeholder="no. of extra office hours" />
                      </Col>
                    </Row>
                    <br />
                    
                    <Row>
                      <Form.Label column lg={3}>
                        Skills
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="Skills" />
                      </Col>
                    </Row>
                    <br />

                  </Form>
                </div>
                <div className='righty'>
                  <Form>
                    

                    <Row>
                      <Form.Label column lg={3}>
                        Hobbies
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" value={hobies} onChange={(e)=>setHobies(e.target.value)} placeholder="Hobbies" />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Hobbie Hours
                      </Form.Label>
                      <Col>
                        <Form.Control type="number" value={hobieHours} onChange={(e)=>setHobieHours(e.target.value)} placeholder="no. of hobbie hours" />
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Form.Label column lg={3}>
                        Goals
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" value={goals} onChange={(e)=>setGoals(e.target.value)} placeholder="Goals" />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Screen Time
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" value={screenTime} onChange={(e)=>setScreenTime(e.target.value)} placeholder="screen time in hours" />
                      </Col>
                    </Row>
                    <br />

                    <Row>
                      <Form.Label column lg={3}>
                        Exercise Hours
                      </Form.Label>
                      <Col>
                        <Form.Control type="text" value={exerciseHours} onChange={(e)=>setExerciseHours(e.target.value)} placeholder="exercise hours" />
                      </Col>
                    </Row>
                    <br />
                    
                    <br/>

                    <div className="d-grid gap-2 submit-btn-btn">
                      <Button variant="danger" size="md" onClick={handleEditProfile}>
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

export default EditProfile