// Menu.jsx
import React, { useState } from 'react';
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


const Menu =({ role, changeDashboard })=> {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const[state,dispatch]=useStateValue();
  const navigate = useNavigate();
  const handleDashboardChange = (dashboardComponent) => {
    changeDashboard(dashboardComponent);
  };
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    if (menuItem === 'Logout') {
      // Remove token from localStorage
      localStorage.removeItem('token');
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
    case 'guide':
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Dashboard')}>Dashboard</li>
          <li className={activeMenuItem === 'My Students' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('My Students')}>My Students</li>
          <li className={activeMenuItem === 'Logout' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Logout')}>Logout</li>
        </ul>
      );
      break;
    case 'chairperson':
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Dashboard')}>Dashboard</li>
          <li className={activeMenuItem === 'Reports' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Reports')}>Reports</li>
          <li className={activeMenuItem === 'Logout' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Logout')}>Logout</li>
        </ul>
      );
      break;
    case 'coordinator':
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Dashboard')}>Dashboard</li>
          <li className={activeMenuItem === 'Manage Courses' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Manage Courses')}>Manage Courses</li>
          <li className={activeMenuItem === 'Logout' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Logout')}>Logout</li>
        </ul>
      );
      break;
    default:
      menuItems = (
        <ul>
          <li className={activeMenuItem === 'Dashboard' ? 'menu-item active' : 'menu-item'} onClick={() => handleMenuItemClick('Dashboard')}>Dashboard</li>
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
