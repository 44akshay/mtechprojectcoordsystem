import React, { useState, useEffect } from 'react';

const CommiteeCreation = ({ rollno }) => {
  const [chairperson, setChairperson] = useState([]);
  const [member1, setMember1] = useState([]);
  const [member2, setMember2] = useState([]);
  const [suggchair, setSuggchair] = useState(null)
  const [suggmem1, setSuggmem1] = useState(null)
  const [suggmem2, setSuggmem2] = useState(null)
  const[iscommcreated,setiscommcreated]=useState(null);
  const [selectedCommittee, setSelectedCommittee] = useState({
    chairpersonId: '',
    member1Id: '',
    member2Id: ''
  });
  const [guide,setguide]=useState(null);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const data = {
        rollNoId: rollno
      };
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/coordinator/getAvailInfo/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          "Content-type": "Application/Json"
        },
        body: JSON.stringify(data)
      });
      const val = await response.json();
      setChairperson(val.chair);
      setMember1(val.committee);
      setMember2(val.committee);
      setSuggchair(val.chair_sugg);
      setSuggmem1(val.committee1_sugg);
      setSuggmem2(val.committee2_sugg);
      setiscommcreated(val.isCommittee);
      setguide(val.guide_name);
      console.log(val);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedCommittee((prevCommittee) => ({
      ...prevCommittee,
      [name]: value
    }));
  };

  const handleCreateCommittee = () => {
    createCommitee();
  };

  const createCommitee = async () => {
    const data = {
      rollNoId:rollno,
      chairId: selectedCommittee.chairpersonId,
      committee1: selectedCommittee.member1Id,
      committee2: selectedCommittee.member2Id
    };
    const token=localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:8000/coordinator/setCommittee/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Commitee created successfully.');
      } else {
        throw new Error('Failed to add student data');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    
     
  };

  return (
    <div>
      <h2>Create Committee</h2>
      <div>
        <p>Project Name: {rollno}</p>
        <p>Guide Name:{guide?guide:"please select a guide"}</p>
      </div>
      {(guide && !iscommcreated)?<div><div>
        <select name="chairpersonId" value={selectedCommittee.chairpersonId} onChange={handleSelectChange}>
          <option value="">Select a Chairperson</option>
          {chairperson.map((guide, index) => (
            <option key={index} value={guide.email}>
              {guide.name}
            </option>
          ))}
        </select>
        <select name="member1Id" value={selectedCommittee.member1Id} onChange={handleSelectChange}>
          <option value="">Select Committee Member 1</option>
          {member1.map((member, index) => (
            <option key={index} value={member.email}>
              {member.name}
            </option>
          ))}
        </select>
        <select name="member2Id" value={selectedCommittee.member2Id} onChange={handleSelectChange}>
          <option value="">Select Committee Member 2</option>
          {member2.map((member, index) => (
            <option key={index} value={member.email}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Chairperson</th>
            <th>Committee Member 1</th>
            <th>Committee Member 2</th>
          </tr>
        </thead>
        <tbody>
          
            <tr >
              <td>{suggchair}</td>
              <td>{suggmem1}</td>
              <td>{suggmem2}</td>
            </tr>
       </tbody>
      </table>
      <button onClick={handleCreateCommittee}>Create Committee</button>
          </div>
          :guide?<div>Committee already exists</div>:""}
    </div>
  );
};

export default CommiteeCreation;
