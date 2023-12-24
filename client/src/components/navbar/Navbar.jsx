import React, {useEffect,useState} from 'react'
import "./Navbar.scss"
import axios from "axios"
import Button from 'react-bootstrap/esm/Button';
import Badge from 'react-bootstrap/Badge';

const Navbar = () => {

    const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });
            setUserdata(response.data.user)
        } catch (error) {
            console.log("error", error)
        }
    }

    // logoout
    const logout = ()=>{
        window.open("http://localhost:6005/logout","_self");
        setUserdata({});
    }

    useEffect(() => {
        getUser()
    }, [])

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <h4>
                Task Master <Badge bg="secondary"> Smart Task Management System</Badge>
            </h4>
            
            <form className="d-flex" role="search">
                {
                    userdata
                    ?   <div className='user'>
                            <div className='userimg_div'>
                                <img className='img_img' src={userdata.image}/>
                            </div>
                            <div className='username_div'>{userdata.displayName}</div>
                        </div>
                    : <Button variant='success' onClick={getUser}>Sign In</Button>
                }
                
            </form>
        </div>
    </nav>
    </div>
  )
}

export default Navbar