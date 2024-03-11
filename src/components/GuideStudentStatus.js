// GuideStudentStatus.js

import React, { useState } from 'react';
import './GuideStudentStatus.css';

const Phase1Component = () => <div>This is Phase 1 Component</div>;
const Phase2Component = () => <div>This is Phase 2 Component</div>;
const Phase3Component = () => <div>This is Phase 3 Component</div>;

const GuideStudentStatus = () => {
  const [selectedStudent, setSelectedStudent] = useState('akshay');
  const [ongoingPhase, setOngoingPhase] = useState('phase1');
  const [currentComponent, setCurrentComponent] = useState(<Phase1Component />);

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
    setCurrentComponent(null);
  };

  const handlePhaseClick = (phase) => {
    setOngoingPhase(phase);

    switch (phase) {
      case 'phase1':
        setCurrentComponent(<Phase1Component />);
        break;
      case 'phase2':
        setCurrentComponent(<Phase2Component />);
        break;
      case 'phase3':
        setCurrentComponent(<Phase3Component />);
        break;
      default:
        setCurrentComponent(null);
    }
  };

  return (
    <div className="guide-student-status">
      <label>
        Select Student:
        <select value={selectedStudent} onChange={handleStudentChange}>
          <option value="akshay">Akshay</option>
          <option value="mihir">Mihir</option>
          <option value="kapil">Kapil</option>
        </select>
      </label>

      {selectedStudent && (
        <div className="student-info">
          <p style={{ color: 'green' }}>Student: {selectedStudent}</p>
          <p>Ongoing Phase: {ongoingPhase}</p>
        </div>
      )}

      <div className="phases">
        <div className={`phase ${ongoingPhase === 'phase1' ? 'active' : ''}`} onClick={() => handlePhaseClick('phase1')}>
          Phase 1
        </div>
        <div className={`phase ${ongoingPhase === 'phase2' ? 'active' : ''}`} onClick={() => handlePhaseClick('phase2')}>
          Phase 2
        </div>
        <div className={`phase ${ongoingPhase === 'phase3' ? 'active' : ''}`} onClick={() => handlePhaseClick('phase3')}>
          Phase 3
        </div>
      </div>

      {currentComponent && <div className="current-component">{currentComponent}</div>}
    </div>
  );
};

export default GuideStudentStatus;
