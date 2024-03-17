import React, { useState, useEffect } from 'react';
import './guidestudentform.css';
import Select from 'react-dropdown-select';

const GuideStudentForm = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [selectedChairperson, setSelectedChairperson] = useState(null);
  const [selectedCommitteeMember1, setSelectedCommitteeMember1] = useState(null);
  const [selectedCommitteeMember2, setSelectedCommitteeMember2] = useState(null);
  const [selectedRollNumber, setSelectedRollNumber] = useState('');
  const [error, setError] = useState('');


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
          const formattedOptions = data.faculty.map((item, index) => ({
            value: index + 1,
            label: `${item.name} ${item.email}`,
          }));
          setFacultyList(formattedOptions);
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
        const response = await fetch('http://127.0.0.1:8000/faculty/viewAllStud/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          const formattedOptions = data.students.map((item, index) => ({
            value: index + 1,
            label: `${item.rollNoId}`,
          }));
          console.log(formattedOptions)
          setStudentList(formattedOptions);
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

  const handleRollNumberChange = (value) => {
    setSelectedRollNumber(value);
  };
  const handleSubmit = async (event) => {
    const token = localStorage.getItem('token');
    const data = {
      rollno: selectedRollNumber[0].label,
      sugchair: selectedChairperson?.email,
      sugmem1: selectedCommitteeMember1?.email,
      sugmem2: selectedCommitteeMember2?.email
    };

  // if (!selectedRollNumber || !selectedChairperson.email || !selectedCommitteeMember1.email || !selectedCommitteeMember2.email) {
  //   setError('All fields are required.');
  //   return;
  // }

  // // Check if any email is the same
  // if (
  //   selectedChairperson.email === selectedCommitteeMember1.email ||
  //   selectedChairperson.email === selectedCommitteeMember2.email ||
  //   selectedCommitteeMember1.email === selectedCommitteeMember2.email
  // ) {
  //   setError('Emails should be unique.');
  //   return;
  // }

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
        console.log('Student data added successfully.');
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


  return (
    <div className="student-form-container">
      <div className="section-header">Student Details:</div>

      <label htmlFor="rollNumber">Roll Number:</label>
      <Select
      options={studentList}
      value={selectedRollNumber}
      id="rollNumber"
      style={{width:"400px"}}
      onChange={(values) =>{ 
        setSelectedRollNumber(values)
      }}
      />
      
      <div className="section-header">Suggestions for Committee Members:</div>

      <div className="dropdown-container">
        <label htmlFor="chairperson">Chairperson:</label>
            <Select
          options={facultyList}
          value={selectedChairperson}
          style={{width:"400px"}}
          onChange={(values) =>{ 
            setSelectedChairperson(values)
          }}
           />
      </div>

      <div className="dropdown-container">
        <label htmlFor="committeeMember1">Committee Member 1:</label>
            <Select
          options={facultyList}
          value={selectedCommitteeMember1}
          style={{width:"400px"}}
          onChange={(values) =>{ 
            setSelectedCommitteeMember1(values)
          }}
           />
      </div>

      <div className="dropdown-container">
        <label htmlFor="committeeMember2">Committee Member 2:</label>
        <Select
          options={facultyList}
          value={selectedCommitteeMember2}
          style={{width:"400px"}}
          onChange={(values) =>{ 
            setSelectedCommitteeMember2(values)
          }}
           />
      </div>

      {/* Add submit button */}
      <button type="submit" style={{backgroundColor:"darkblue",color:"white"}} onClick={()=>{handleSubmit()}}>Submit</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default GuideStudentForm;
