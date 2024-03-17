import React, { useEffect, useState } from 'react';
import './studentselector.css'
import PhasesTab from './PhaseTab';

const StudentSelector = () => {
    const [selectedStudent, setSelectedStudent] = useState('');
    const [students, setStudents] = useState([]);
    const [url,seturl]=useState(null);
    const [projectdata,setprojectdata]=useState(null);
    useEffect(()=>{
      fetchStudentData();
    },[])
    useEffect(()=>{
      console.log(selectedStudent,"is the value")
      fetchPhaseInfo()
    },[selectedStudent])
    useEffect(()=>{
      console.log(projectdata)
      
    },[projectdata])
    const fetchStudentData = async () => {
      try {
        const token=localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/projects/', {
          headers: {
            Authorization: `Token ${token}`
          }
      });
        if (!response.ok) {
          const data = await response.json()
          console.log(data)
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStudents(data.StudentData); // Assuming data is an array of student objects with firstname, lastname, and email properties
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchPhaseInfo=async()=>{
      const data = {
        rollNoId:selectedStudent
      };
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/projects/projectDetails', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const dataval=await response.json();
      setprojectdata(dataval)
      // const blob = await response.blob(); 
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'project_report.pdf'; 
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
    } else{
      console.error('Failed to fetch PDF file');
    }
  }



  
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
            {students.map((student, index) => (
                <option key={index} value={`${student.rollNoId}`}>
                    {`${student.rollNoId}`}
                 </option>
                        ))}
          </select>
          {selectedStudent && <p style={{marginLeft:"10px"}}>Selected student: {selectedStudent}</p> }
        
        </div>
        <div>
        {selectedStudent && projectdata && 
        <div style={{display:"flex"}}>
        <PhasesTab phaseno={1} phasesData={projectdata.projectdata.Phase1} rollno={selectedStudent}/>
        <PhasesTab phaseno={2} phasesData={projectdata.projectdata.Phase2} rollno={selectedStudent}/>
        <PhasesTab phaseno={3} phasesData={projectdata.projectdata.Phase3} rollno={selectedStudent}/>
        </div>
        }
        </div>
        <div>

        </div>
       
        
        </div>
      </div>
    );
  };
  
  export default StudentSelector;
