// Menu.jsx
import React, { useEffect, useState } from 'react';
import './menu.css';
import GuideDashboard from './GuideDashboard';
import StudentDashboard from './StudentDashboard';
import { useNavigate } from 'react-router-dom';
import CommitteeDetails from './CommitteeDetails';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useStateValue } from './StatePovider';
import GuideStudentForm from './GuideStudentForm';
import { Dashboard } from '@mui/icons-material';
import PhasesTab from './PhaseTab';
import ScheduleMeeting from './ScheduleMeeting';
import StudentSelector from './StudentSelector';
import MessageBox from './MessageBox';
import { useAuthStateValue } from '../context/AuthStateProvider';
import ViewGrades from './ViewGrades';
import { CoordinatorDashboard } from './CoordinatorDashboard';
import { StudentSelectorChair } from './StudentSelectorChair';


const Menu =({ role, changeDashboard })=> {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const[state,dispatch]=useStateValue();
  const [{ user }, authdispatch] = useAuthStateValue();
  
  const navigate = useNavigate();
  const handleDashboardChange = (dashboardComponent) => {
    changeDashboard(dashboardComponent);
  };
  useEffect(() => {
    setActiveMenuItem('Dashboard')
    if(user && user.role==='Guide'){
      changeDashboard(<GuideDashboard/>)
    }else if(user && user.role==='Chairperson'){
      changeDashboard(null)
    }if(user && user.role==='Coordinator'){
      changeDashboard(null)
    }
    
  }, [user]);
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    if (menuItem === 'Logout') {
      // Remove token from localStorage
      localStorage.removeItem('token');
      window.location.reload()
      navigate('/login')
    }
  };

  let menuItems = null;

  switch (role) {
    case 'Student':
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() => {
            handleMenuItemClick('Dashboard')
            handleDashboardChange(<StudentDashboard/>)
          } 
        }>Dashboard</li>
          <li className={activeMenuItem === 'My Courses' ? 'menu-item active' : 'menu-item'} onClick={() =>{
             handleMenuItemClick('My Courses')
             handleDashboardChange(<CommitteeDetails/>)
             }}>My Committee</li>
          <li className={activeMenuItem === 'Logout' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Logout')}>Logout</li>
        </ul>
      );
      break;
    case 'Guide':
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() => {
            handleMenuItemClick('Dashboard')
            handleDashboardChange(<GuideDashboard/>)
        }}>Dashboard</li>
          <li className={activeMenuItem === 'Add Students' ? 'menu-item active' : 'menu-item'} onClick={() => {
            handleMenuItemClick('Add Students')
            handleDashboardChange(<GuideStudentForm/>)
            }}>Add Students</li>

            <li className={activeMenuItem === 'Student Evaluations' ? 'menu-item active' : 'menu-item'} onClick={() => {
            handleMenuItemClick('Student Evaluations')
            handleDashboardChange(
              <div>
                <h1 style={{textAlign:"center"}}>Student Evaluations</h1>
                <StudentSelector/>
              </div>)
            }}>Student Evaluations</li>

          <li className={activeMenuItem === 'Schedule a Meeting' ? 'menu-item active' : 'menu-item'} onClick={() => {
            handleMenuItemClick('Schedule a Meeting')
            handleDashboardChange(
            <div>
              <h1 style={{textAlign:"center"}}>Schedule a Meeting</h1>  
              <ScheduleMeeting/>
              </div>)
            }}>Schedule a Meeting</li>
          <li className={activeMenuItem === 'Logout' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Logout')}>Logout</li>
        </ul>
      );
      break;
    case 'Chairperson':
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() =>{
             handleMenuItemClick('Dashboard')
             handleDashboardChange(<StudentSelectorChair/>)
             }}>Dashboard</li>
          <li className={activeMenuItem === 'Reports' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Reports')}>Reports</li>
          <li className={activeMenuItem === 'Logout' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Logout')}>Logout</li>
        </ul>
      );
      break;
    case 'Coordinator':
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() => {
            handleMenuItemClick('Dashboard')
            handleDashboardChange(<CoordinatorDashboard/>)
            }}>Dashboard</li>
          <li className={activeMenuItem === 'Manage Courses' ? 'menu-item active' : 'menu-item'} 
          onClick={() =>{
             handleMenuItemClick('Manage Courses')
             handleDashboardChange(<ViewGrades/>)
             }}>View Grades</li>
          <li className={activeMenuItem === 'Logout' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Logout')}>Logout</li>
        </ul>
      );
      break;
    default:
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() => {
            handleMenuItemClick('Dashboard')
            handleDashboardChange(<div><MessageBox message={"please select your role from the above dropdown"}/></div>)
            }}>Dashboard</li>
          <li className={activeMenuItem === 'Logout' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Logout')}>Logout</li>
        </ul>
      );
  }

  return (
    <div className={state.togglemodal?"menu-sidebar":"menu-sidebar open"}>
      {menuItems}
    </div>
  );
};

export default Menu;
