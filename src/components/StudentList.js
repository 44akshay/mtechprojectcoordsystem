import React, { useState } from 'react'
import './studentlist.css'
import { Popupbox } from './Popupbox';
import { Studentinfo } from './Studentinfo';
import { useAuthStateValue } from '../context/AuthStateProvider';
import CommiteeCreation from './CommiteeCreation';
const StudentList = ({firstname,rollno}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ user }, authdispatch] = useAuthStateValue();
  

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
        <div className='studlist'>
          <div>
            <p>{firstname}</p>
            <p>{rollno}</p>
           {(user && user.role==="Coordinator")? <div onClick={()=>handleOpen()} style={{fontSize:"10px"}}>Create Committee</div>:<div onClick={()=>handleOpen()}>Get Info</div>}
            </div>
        </div>
        {(user && user.role==="Coordinator")?
        <Popupbox isOpen={isOpen} onClose={handleClose} component={CommiteeCreation} data={{ onClose: handleClose }} />:
        <Popupbox isOpen={isOpen} onClose={handleClose} component={Studentinfo} data={{ onClose: handleClose }} />
        }
    </div>
  ) 
}

export default StudentList