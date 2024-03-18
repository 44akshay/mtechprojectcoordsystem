import React, { useEffect, useState } from 'react'
import StudentList from './StudentList'

export const CoordinatorDashboard = () => {
  const [students, setStudents] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const token=localStorage.getItem('token')
        const response = await fetch('http://localhost:8000/coordinator/getStudents/', {
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
        console.log(data)
        setStudents(data.students); // Assuming data is an array of student objects with firstname, lastname, and email properties
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  },[])

  return (
    <div>
        <h1 style={{textAlign:"center"}}>Student Details:</h1>
        {students.length!==0?students.map((student, index) => (
          <StudentList key={index} rollno={student.rollNoId} firstname={student.firstname} />
        )):<span>0 student</span>}
    </div>
  )
}
