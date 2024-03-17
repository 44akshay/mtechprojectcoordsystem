import React, { useState } from 'react';
import './studentselector.css'
import PhasesTab from './PhaseTab';

const StudentSelector = () => {
    const [selectedStudent, setSelectedStudent] = useState('');
  
    const handleSelectChange = (e) => {
      setSelectedStudent(e.target.value);
    };
  
    return (
      <div className="studselectcontainer">
        <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
        <div className="select-wrapper">
          <label htmlFor="studentSelect">Select a student:</label>
          <select id="studentSelect" value={selectedStudent} onChange={handleSelectChange}>
            <option value="">Select a student</option>
            <option value="Akshay">Akshay</option>
            <option value="Tejas">Tejas</option>
            {/* Add more options here */}
          </select>
          {selectedStudent && <p style={{marginLeft:"10px"}}>Selected student: {selectedStudent}</p> }
        
        </div>
        <div>
        {selectedStudent && 
        <div style={{display:"flex"}}>
        <PhasesTab phaseno={1}/>
        <PhasesTab phaseno={2}/>
        <PhasesTab phaseno={3}/>
        </div>
        }
        </div>
        
        </div>
      </div>
    );
  };
  
  export default StudentSelector;
