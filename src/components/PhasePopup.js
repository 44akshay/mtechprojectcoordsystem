import React from 'react';
import './phase.css';
import PhaseComponent from './PhaseComponent';
import CloseIcon from '@mui/icons-material/Close';

const PhasePopup = ({ isOpen, onClose, data, phase }) => {
  return (
    <>
    
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
          <div className='close'  onClick={()=>onClose()}><CloseIcon/></div>
    
            <PhaseComponent data={data} phase={phase} />
          </div>
        </div>
      )}
    </>
  );
};

export default PhasePopup;
