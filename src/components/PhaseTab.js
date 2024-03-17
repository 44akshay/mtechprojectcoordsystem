  import React, { useState, useEffect } from 'react';
  import './phase.css';
  import phaseimg from '../assets/phaseimg.jpg';
  import PhaseComponent from './PhaseComponent';
import PhasePopup from './PhasePopup';

  const PhasesTab = ({phaseno,phasesData}) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    
    useEffect(() => {
      console.log(isPopupOpen); // This will log the updated value of isPopupOpen after the state has been updated
    }, [isPopupOpen]);

    const handlePopupOpen = () => {
      setPopupOpen(true);
    };

    const handlePopupClose = () => {
      setPopupOpen(false);
    };
    

    return (
      <div className="center-container">
        <div onClick={()=>handlePopupOpen()}  className="box-container">
          <div className="box">
            <img src={phaseimg} alt="Phase" className="image" />
            <div className="phase-details">
              <h3>Phase {phaseno}</h3>
              <p className="date">Start Date: </p>
              <p className="date">End Date: </p>
            </div>
          </div>
        </div>
        <PhasePopup isOpen={isPopupOpen} onClose={handlePopupClose} data={phasesData} phase={phaseno} />
      </div>
    );
  };

  export default PhasesTab;
