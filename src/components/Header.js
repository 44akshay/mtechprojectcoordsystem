import React from 'react';
import nitclogo from '../assets/nitclogo.png';
import './header.css'; // Import your CSS file

export const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="project-info">
          <div>Project Coordinator System</div>
        </div>
        <div className="user-info">
          <div className="user-details">
            <div className="username">Username</div>
            <div className="coordinator">Coordinator</div>
          </div>
          <div className="logo-container">
            <img src={nitclogo} alt="NITC Logo" className="nitc-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

