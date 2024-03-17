import React from 'react';
import './phase.css';
import PhaseComponent from './PhaseComponent';
import CloseIcon from '@mui/icons-material/Close';

const PhasePopup = ({ isOpen, onClose, data, phase,rollno }) => {

  return (
    <>
    
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
          <div className='close'  onClick={()=>onClose()}><CloseIcon/></div>
            <PhaseComponent data={data} phase={phase} rollno={rollno} close={onClose} />
          </div>
        </div>
      )}
    </>
  );
};

export default PhasePopup;
