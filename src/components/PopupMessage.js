import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export const PopupMessage = ({isOpen,onClose,message}) => {
    
  return (
    <div>
    {isOpen && (
        <div className="modal">
          <div className="modal-content">
          <div className='close'  onClick={()=>onClose()}><CloseIcon/></div>
            {message}
          </div>
        </div>
      )}
      </div>
  )
}
