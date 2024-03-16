import React, { useState } from 'react';
import './phase.css';

const PhaseComponent = ({ data, phase }) => {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (data && data.Status !== "Accepted" && file) {
      // Make post request to upload file
      const formData = new FormData();
      formData.append('phase', phase); // Append phase number
      formData.append('file', file); // Append file
  
      const token = localStorage.getItem('token');
      try {
        setSubmitting(true);
        const response = await fetch('http://localhost:8000/students/upload', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Token ${token}`
          }
        });
        if(response.ok){
          window.location.reload()
        }

  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Handle successful response
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setSubmitting(false);
      }
    } else {
      // Handle submission for other statuses or when data is undefined
    }
  };
  

  return (
    <div className="phase-component">
      {data && (
        <>
          <div className="submission-status">Submission Status: {data.Status}</div>
          {data.Evaluation !== -1 && (
            <div className="evaluation">Evaluation: {data.Evaluation}</div>
          )}
          {data.Evaluation_Comments && (
            <div className="evaluation-comments">Evaluation Comments: {data.Evaluation_Comments}</div>
          )}
          {data.Report_Comments && (
            <div className="report-comments">Report Comments: {data.Report_Comments}</div>
          )}
          {data.Status !== "Accepted" && (
            <div className="upload-file">
              <input type="file" onChange={handleFileChange} />
            </div>
          )}
          <button className="submit-button" onClick={handleSubmit} disabled={submitting || data.Status === "Accepted"}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </>
      )}
    </div>
  );
};

export default PhaseComponent;
