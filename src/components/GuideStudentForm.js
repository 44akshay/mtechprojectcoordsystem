import React, { useState, useEffect } from 'react';
import './guidestudentform.css';

const GuideStudentForm = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [selectedChairperson, setSelectedChairperson] = useState(null);
  const [selectedCommitteeMember1, setSelectedCommitteeMember1] = useState(null);
  const [selectedCommitteeMember2, setSelectedCommitteeMember2] = useState(null);
  const [selectedRollNumber, setSelectedRollNumber] = useState('');

  useEffect(() => {
    const fetchFacultyData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://127.0.0.1:8000/faculty/viewfacs/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setFacultyList(data.faculty);
        } else {
          throw new Error('Failed to fetch faculty data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchStudentData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://127.0.0.1:8000/students/viewstuds/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setStudentList(data.student);
        } else {
          throw new Error('Failed to fetch student data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFacultyData();
    fetchStudentData();
  }, []);

  const handleSelectChange = (event, setSelectedFunc) => {
    const selectedEmail = event.target.value;
    const selectedFaculty = facultyList.find(faculty => faculty.email === selectedEmail);
    setSelectedFunc(selectedFaculty);
  };

  const handleRollNumberChange = (event) => {
    setSelectedRollNumber(event.target.value);
  };
  const handleSubmit = async (event) => {
    const token = localStorage.getItem('token');
    const data = {
      rollno: selectedRollNumber,
      sugchair: selectedChairperson.email,
      sugmem1: selectedCommitteeMember1.email,
      sugmem2: selectedCommitteeMember2.email
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/faculty/addmystudent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        // Handle successful response
        console.log('Student data added successfully.');
        // You can reset form fields or show a success message here
      } else {
        throw new Error('Failed to add student data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredFacultyList = facultyList.filter(
    faculty =>
      faculty.email !== (selectedChairperson ? selectedChairperson.email : '') &&
      faculty.email !== (selectedCommitteeMember1 ? selectedCommitteeMember1.email : '') &&
      faculty.email !== (selectedCommitteeMember2 ? selectedCommitteeMember2.email : '')
  );



  const filteredStudentList = studentList.filter(student => student.email !== selectedRollNumber);

  return (
    <div className="student-form-container">
      <div className="section-header">Student Details:</div>

      <label htmlFor="rollNumber">Roll Number:</label>
      <select
        id="rollNumber"
        value={selectedRollNumber}
        onChange={handleRollNumberChange}
      >
        <option value="">Select Roll Number</option>
        {studentList.map((student, index) => (
          <option key={index} value={student.email}>
            {student.firstname} - {student.email}
          </option>
        ))}
      </select>

      {/* Add student details here */}
      

      <div className="section-header">Suggestions for Committee Members:</div>

      <div className="dropdown-container">
        <label htmlFor="chairperson">Chairperson:</label>
        <select
          id="chairperson"
          value={selectedChairperson ? selectedChairperson.email : ''}
          onChange={(event) => handleSelectChange(event, setSelectedChairperson)}
        >
          <option value="">{selectedChairperson?selectedChairperson.name : "Select Chairperson"}</option>
          {filteredFacultyList.map((faculty, index) => (
            <option key={index} value={faculty.email}>
              {faculty.name} - {faculty.email}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="committeeMember1">Committee Member 1:</label>
        <select
          id="committeeMember1"
          value={selectedCommitteeMember1 ? selectedCommitteeMember1.email : ''}
          onChange={(event) => handleSelectChange(event, setSelectedCommitteeMember1)}
        >
          <option value="">{selectedCommitteeMember1?selectedCommitteeMember1.name:"Select Committee Member 1"}</option>
          {filteredFacultyList.map((faculty, index) => (
            <option key={index} value={faculty.email}>
              {faculty.name} - {faculty.email}
            </option>
          ))}
        </select>
      </div>

      <div className="dropdown-container">
        <label htmlFor="committeeMember2">Committee Member 2:</label>
        <select
          id="committeeMember2"
          value={selectedCommitteeMember2 ? selectedCommitteeMember2.email : ''}
          onChange={(event) => handleSelectChange(event, setSelectedCommitteeMember2)}
        >
          <option value="">{selectedCommitteeMember2?selectedCommitteeMember2.name:"Select Committee Member 2"}</option>
          {filteredFacultyList.map((faculty, index) => (
            <option key={index} value={faculty.email}>
              {faculty.name} - {faculty.email}
            </option>
          ))}
        </select>
      </div>

      {/* Add submit button */}
      <button type="submit" onClick={()=>{handleSubmit()}}>Submit</button>
    </div>
  );
};

export default GuideStudentForm;
