import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export const Popupbox = ({isOpen,onClose,component: Component, data}) => {
  return (
    <div>
    {isOpen && (
        <div className="modal">
          <div className="modal-content">
          <div className='close'  onClick={()=>onClose()}><CloseIcon/></div>
          <Component {...data} onClose={onClose} />
          </div>
        </div>
      )}
      </div>
  )
}
