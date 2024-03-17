import React, { useState, useEffect } from 'react';

const CommiteeCreation = () => {
  const [chairperson, setChairperson] = useState('');
  const [member1, setMember1] = useState('');
  const [member2, setMember2] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch('api/suggestions');
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, []);

  const handleCreateCommittee = () => {
    // Handle creation of committee
    console.log('Committee created:', chairperson, member1, member2);
    // Add logic to create committee using API call
  };

  return (
    <div>
      <h2>Create Committee</h2>
      <div>
        <p>Project Name:</p>
        <p>Guide Name:</p>
      </div>
      <div>
        <select value={chairperson} onChange={(e) => setChairperson(e.target.value)}>
          <option value="">Select a Chairperson</option>
          {/* Add options dynamically based on available guides */}
          {/* Example: <option value="Guide1">Guide 1</option> */}
        </select>
        <select value={member1} onChange={(e) => setMember1(e.target.value)}>
          <option value="">Select Committee Member 1</option>
          {/* Add options dynamically based on available committee members */}
        </select>
        <select value={member2} onChange={(e) => setMember2(e.target.value)}>
          <option value="">Select Committee Member 2</option>
          {/* Add options dynamically based on available committee members */}
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
          {suggestions.map((suggestion, index) => (
            <tr key={index}>
              <td>{suggestion.chairperson}</td>
              <td>{suggestion.member1}</td>
              <td>{suggestion.member2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateCommittee}>Create Committee</button>
    </div>
  );
};

export default CommiteeCreation;
