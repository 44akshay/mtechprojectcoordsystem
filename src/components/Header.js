import React from 'react';
import nitclogo from '../assets/nitclogo.png';
import './header.css'; // Import your CSS file
import { useAuthStateValue } from '../context/AuthStateProvider';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useStateValue } from './StatePovider';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';



export const Header = () => {
  const [{ user }, authdispatch] = useAuthStateValue();
  const[state,dispatch]=useStateValue();
  const handleonclick=()=>{
    dispatch({type:"TOGGLE_MODAL"})
  }
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="project-info">
          <div style={{cursor:"pointer"}} onClick={()=>handleonclick()}><MenuOutlinedIcon fontSize='large' />
          </div>
          <div className="logo-container">
            <img src={nitclogo} alt="NITC Logo" className="nitc-logo" />
          </div>
          <div style={{fontWeight:"bold",fontSize:"25px",lineHeight:"50px",textAlign:"center",marginLeft:"10px"}}>Project Coordinator System</div>
        </div>
        <div className="user-info">
          <div style={{marginRight:"10px",cursor:"pointer"}}>
        <AccountCircleRoundedIcon  color='info' fontSize='large'/>
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

