import React, { useState } from 'react';
import './guidedashboard.css';
import ScheduleMeeting from './ScheduleMeeting';
import GuideStudentStatus from './GuideStudentStatus';
import GuideStudentForm from './GuideStudentForm';

const AddStudent = () => (
    <div>
        <GuideStudentForm/>
    </div>
  );

const StudentStatus = () => (
  <div>
    <GuideStudentStatus/>
  </div>
);  

const ScheduleMeetings = () => (
  <div>
    <ScheduleMeeting/>
  </div>
);

const GuideDashboard = () => {
  const [currentScreen, setCurrentScreen] = useState('studentstatus');

  const handleButtonClick = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div>
      <div className='guidedashboard'>
      <div
          className={currentScreen === 'addstudent' ? 'selected' : ''}
          onClick={() => handleButtonClick('addstudent')}
        >
            Add Student
        </div>
        <div
          className={currentScreen === 'studentstatus' ? 'selected' : ''}
          onClick={() => handleButtonClick('studentstatus')}
        >
          Student Status
        </div>
        <div
          className={currentScreen === 'scedulemeeting' ? 'selected' : ''}
          onClick={() => handleButtonClick('scedulemeeting')}
        >
          Schedule Meeting
        </div>
      </div>
      {currentScreen === 'addstudent' && <AddStudent />}
      {currentScreen === 'studentstatus' && <StudentStatus />}
      {currentScreen === 'scedulemeeting' && <ScheduleMeetings />}
    </div>
  );
};

export default GuideDashboard;
