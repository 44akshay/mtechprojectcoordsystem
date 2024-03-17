import React, { useEffect, useState } from 'react';
import './guidedashboard.css';
import ScheduleMeeting from './ScheduleMeeting';
import GuideStudentStatus from './GuideStudentStatus';
import GuideStudentForm from './GuideStudentForm';
import StudentList from './StudentList';



const GuideDashboard = () => {
  const [currentScreen, setCurrentScreen] = useState('studentstatus');
  const [students, setStudents] = useState([]);


  useEffect(()=>{
    const fetchData = async () => {
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

    fetchData();

  },[])

  const handleButtonClick = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div>
      <div style={{textAlign:"center"}} className='guidedashboard'>
        <div style={{display:"flex", justifyContent:"center",alignItems:"self-end"}}><h1>Students under me:</h1><small>(maximum allowed:2)</small></div>
        <div>
        {students.length!==0?students.map((student, index) => (
          <StudentList key={index} rollno={student.rollNoId} firstname={student.student.firstname} />
        )):<span>0 student</span>}
        </div>
      </div>
      
    </div>
  );
};

export default GuideDashboard;
