import React, { useState, useEffect } from 'react';
import './guidestudentform.css';
import Select from 'react-dropdown-select';
import { TailSpin } from 'react-loader-spinner';
import { PopupMessage } from './PopupMessage';

const GuideStudentForm = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [selectedChairperson, setSelectedChairperson] = useState(null);
  const [selectedCommitteeMember1, setSelectedCommitteeMember1] = useState(null);
  const [selectedCommitteeMember2, setSelectedCommitteeMember2] = useState(null);
  const [selectedRollNumber, setSelectedRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isopen,setisopen]=useState(false)
  const [error,setError]=useState('')

  const onClose=()=>{
    setisopen(false);
    setError('')
  }



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
            label: `${item.email}`,
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
    setLoading(true)
    const token = localStorage.getItem('token');
    const data = {
      rollno: selectedRollNumber?selectedRollNumber[0].label:"",
      sugchair: selectedChairperson?selectedChairperson[0].label:"",
      sugmem1: selectedCommitteeMember1?selectedCommitteeMember1[0].label:"",
      sugmem2: selectedCommitteeMember2?selectedCommitteeMember2[0].label:""
    };

   console.log(selectedChairperson[0].label)
  if (selectedRollNumber==='' || selectedChairperson.email===null || !selectedCommitteeMember1.email===null || !selectedCommitteeMember2.email===null) {
    setisopen(true)
    setError('All fields are required.');
    setLoading(false)
    return;
  }
  if (
    selectedChairperson[0].label === selectedCommitteeMember1[0].label ||
    selectedChairperson[0].label === selectedCommitteeMember2[0].label ||
    selectedCommitteeMember1[0].label === selectedCommitteeMember2[0].label
  ) {
    console.log(selectedChairperson.email,selectedCommitteeMember1.email,selectedCommitteeMember2.email)
    setisopen(true)
    setError('Email should be unique');
    setLoading(false)
    return;
  }

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
        setLoading(false)
        setisopen(true)
        setError("Student is added successfully")
        setSelectedRollNumber('');
        setSelectedChairperson(null)
        setSelectedCommitteeMember1(null)
        setSelectedCommitteeMember2(null)
        console.log('Student data added successfully.');
      } else {
        const data=await response.json();
        setLoading(false)
        setisopen(true)
        setError("error: "+data.message)
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

      {loading?<div style={{display:"flex",justifyContent:"center"}}>
        <TailSpin color='darkblue' />
        </div>:<button type="submit" style={{backgroundColor:"darkblue",color:"white"}} onClick={()=>{handleSubmit()}}>Submit</button>}
        <PopupMessage isOpen={isopen} onClose={onClose} message={error} />
      
    </div>
  );
};

export default GuideStudentForm;
