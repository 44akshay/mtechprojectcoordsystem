import React, { useState, useEffect } from 'react';
import './committeedetails.css';

const CommitteeDetails = () => {
  const [guideName, setGuideName] = useState('');
  const [chairperson, setChairperson] = useState('');
  const [committeeMember1, setCommitteeMember1] = useState('');
  const [committeeMember2, setCommitteeMember2] = useState('');

  useEffect(() => {
    // Assuming you have an API endpoint to fetch committee details
    fetchCommitteeDetails();
  }, []);

  const fetchCommitteeDetails = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT');
      const data = await response.json();
      setGuideName(data.guideName);
      setChairperson(data.chairperson);
      setCommitteeMember1(data.committeeMember1);
      setCommitteeMember2(data.committeeMember2);
    } catch (error) {
      console.error('Error fetching committee details:', error);
    }
  };

  return (
    <div className="committee-details-container">
      <h2>Committee Details</h2>
      <p><strong>Guide Name:</strong> {guideName}</p>
      <p><strong>Chairperson:</strong> {chairperson}</p>
      <p><strong>Committee Member 1:</strong> {committeeMember1}</p>
      <p><strong>Committee Member 2:</strong> {committeeMember2}</p>
    </div>
  );
};

export default CommitteeDetails;
