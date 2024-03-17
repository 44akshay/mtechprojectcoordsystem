import React, { useState } from 'react';
import './guidedashboard.css';
import ScheduleMeeting from './ScheduleMeeting';
import GuideStudentStatus from './GuideStudentStatus';
import GuideStudentForm from './GuideStudentForm';
import StudentList from './StudentList';



const GuideDashboard = () => {
  const [currentScreen, setCurrentScreen] = useState('studentstatus');

  const handleButtonClick = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div>
      <div style={{textAlign:"center"}} className='guidedashboard'>
        <div style={{display:"flex", justifyContent:"center",alignItems:"self-end"}}><h1>Students under me:</h1><small>(maximum allowed:2)</small></div>
        <StudentList/>
        <StudentList/>
      </div>
      
    </div>
  );
};

export default GuideDashboard;
