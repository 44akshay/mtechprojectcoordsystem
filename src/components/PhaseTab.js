  import React, { useState, useEffect } from 'react';
  import './phase.css';
  import phaseimg from '../assets/phaseimg.jpg';
  import PhaseComponent from './PhaseComponent';
  import PhasePopup from './PhasePopup';

  const PhasesTab = ({phaseno,phasesData,rollno}) => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    console.log(phasesData)
    
    useEffect(() => {
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
        <PhasePopup isOpen={isPopupOpen} onClose={handlePopupClose} data={phasesData} phase={phaseno} rollno={rollno} />
      </div>
    );
  };

  export default PhasesTab;
