import React, { useEffect, useState } from 'react';
import nitclogo from '../assets/nitclogo.png';
import './header.css'; // Import your CSS file
import { useAuthStateValue } from '../context/AuthStateProvider';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useStateValue } from './StatePovider';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from 'react-router-dom';



export const Header = () => {
  const [{ user }, authdispatch] = useAuthStateValue();
  const[state,dispatch]=useStateValue();
  const navigate=useNavigate()
  const [selectedRole, setSelectedRole] = useState(null);
  const handleonclick=()=>{
    dispatch({type:"TOGGLE_MODAL"})
  }
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) {  
      navigate('/login')
    } 
    
  },[])
  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    authdispatch({ type: "CHANGE_ROLE", payload: e.target.value });
    console.log(user)
  }
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="project-info">
          {user?<div style={{cursor:"pointer"}} onClick={()=>handleonclick()}><MenuOutlinedIcon fontSize='large' />:
          </div>:""}
          <div className="logo-container">
            <img src={nitclogo} alt="NITC Logo" className="nitc-logo" />
          </div>
          <div style={{fontWeight:"bold",fontSize:"25px",lineHeight:"50px",textAlign:"center",marginLeft:"10px"}}>Project Coordinator System</div>
          <div style={{ width:"300px",lineHeight:"50px",marginLeft:"30px", display:"flex",alignItems:"center",justifyContent:"center"}}>
            {(user && (user.role === "Faculty" || user.role === "Guide" || user.role === "Chairperson" || user.role === "Coordinator")) && <span style={{width:"100px"}}>Login as a</span>}
             {(user && (user.role === "Faculty" || user.role === "Guide" || user.role === "Chairperson" || user.role === "Coordinator")) ? (
              <select
                value={selectedRole}
                onChange={handleRoleChange}
                className="role-select"
              >
                 {!selectedRole && <option value="">Please select a role</option>}
                <option value="Guide">Guide</option>
                <option value="Chairperson">Chairperson</option>
                <option value="Coordinator">Coordinator</option>
              </select>
            ) : ""}
          </div>
        </div>
        <div className="user-info">
          <div style={{marginRight:"10px",cursor:"pointer"}}>
       {user?<AccountCircleRoundedIcon  color='info' fontSize='large'/>:""}
        </div>
          <div className="user-details">
           
            <div className="username">{user?user.user.username:null}</div>
            <div className="coordinator">{user?user.role:""}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

