import React, { useState, useEffect } from 'react';
import './phase.css';
import PhaseComponent from './PhaseComponent';

const PhasesTab = ({ phasesData }) => {
  const [activePhase, setActivePhase] = useState(1);
  
  const handlePhaseClick = (phase) => {
    setActivePhase(phase);
  };

  return (
    <div className="container">
      <div className="phases-tab">
        {Object.keys(phasesData).filter(key => key.startsWith('Phase')).map((phaseKey, index) => (
          <div key={index} className={`phase ${activePhase === index + 1 ? 'active' : ''}`} onClick={() => handlePhaseClick(index + 1)}>Phase {index + 1}</div>
        ))}
      </div>
      { activePhase===1 && phasesData[`Phase${1}`] && (
        <PhaseComponent phase={1} data={phasesData[`Phase${1}`]} />
      )}
      {activePhase===2 && phasesData[`Phase${2}`] && (
        <PhaseComponent phase={2} data={phasesData[`Phase${2}`]} />
      )}
      {activePhase===3 && phasesData[`Phase${3}`] && (
        <PhaseComponent phase={3} data={phasesData[`Phase${3}`]} />
      )}

    </div>
  );
};

export default PhasesTab;
