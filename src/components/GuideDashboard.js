import React, { useState } from 'react';
import './guidedashboard.css';
import ScheduleMeeting from './ScheduleMeeting';
import GuideStudentStatus from './GuideStudentStatus';


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
          className={currentScreen === 'studentstatus' ? 'selected' : ''}
          onClick={() => handleButtonClick('studentstatus')}
        >
          Student status
        </div>
        <div
          className={currentScreen === 'scedulemeeting' ? 'selected' : ''}
          onClick={() => handleButtonClick('scedulemeeting')}
        >
          Schedule Meeting
        </div>
      </div>

      {currentScreen === 'studentstatus' && <StudentStatus />}
      {currentScreen === 'scedulemeeting' && <ScheduleMeetings />}
    </div>
  );
};

export default GuideDashboard;
