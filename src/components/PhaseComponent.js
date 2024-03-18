import React, { useEffect, useState } from 'react';
import './phase.css';
import CloseIcon from '@mui/icons-material/Close';
import { useAuthStateValue } from '../context/AuthStateProvider';

const PhaseComponent = ({ data, phase,rollno,close}) => {
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [{ user }, authdispatch] = useAuthStateValue();
  const [comments, setComments] = useState('');
  const [reportUploaded, setReportUploaded] = useState(data.Report !== null);
  const [status, setstatus] = useState(data.Status);
  const [evaluationMarks, setEvaluationMarks] = useState('');
  const [evaluationComments, setEvaluationComments] = useState('');
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  useEffect(()=>{
    console.log(data)
  },[])
  useEffect(()=>{

  },[status])

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
  const handleUploadReport = async () => {
    // Logic to upload report
    // Set reportUploaded to true after successful upload
  };

  const handleDownloadReport = async () => {
    const data = {
      rollNoId: rollno,
      phase: phase+"",
    };
  
    const token = localStorage.getItem('token');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/projects/postreq', requestOptions);
  
      if (!response.ok) {
        throw new Error('Failed to fetch PDF file');
      }
  
      const blob = await response.blob(); // Convert the response to a Blob object
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'project_report.pdf'; // Set the filename for download
      document.body.appendChild(a);
      a.click(); // Trigger the download
      document.body.removeChild(a); // Clean up after download
    } catch (error) {
      console.error('Error downloading PDF file:', error);
      // Handle error cases if needed
    }
  };
  
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleStatusChange = async (status) => {
    if(status==='accepted'){
      const data = {
        rollNoId:rollno,
        phase:phase+""
       
      };
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/projects/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        close();
  
      } else {
        console.log("error")
        
      }

    }else if(status==='modify'){
      const data = {
        rollNoId:rollno,
        phase:phase+"",
        comment:comments
      };
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/projects/modify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        close()
  
      } else {
        console.log("error")
        
      }
    }

  };

  const handleChairpersonSubmit = async () => {
    const formData = {
      rollNoId: rollno,
      phase: phase+"",
      marks: parseInt(evaluationMarks), // Convert to integer
      comments: evaluationComments
    };

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/chairperson/givemarks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Handle success, maybe close the form or show a success message
        console.log('Evaluation submitted successfully');
      } else {
        // Handle failure, maybe show an error message
        console.error('Failed to submit evaluation');
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
    }
  };

  

  return (
    <div className="phase-component">
      {data && user && user.role==="Student" &&(
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
      {data && user && user.role==="Guide" && (
         <>
         {reportUploaded ? (
            <>
              <div>Report Uploaded: Yes</div>
              <button style={{width:"200px", textAlign:"center" }} onClick={handleDownloadReport}>Download Report</button>
              <div>Submission status:{status}</div>
              {status!=="Accepted"?
              <div>
              <div>Enter comments on report</div>
              <textarea value={comments} onChange={handleCommentsChange} />
              </div>
              :""
              }
              {status!=="Accepted"?<div>
                <button style={{backgroundColor:"green"}} onClick={() => handleStatusChange('accepted')}>Accept</button>
              <button style={{backgroundColor:"orange"}} onClick={() => handleStatusChange('modify')}>Modify </button>
              </div>
              :""}
            </>
          ) : (
            <div>Student has not uploaded the report yet</div>
          )}
       </>
      )}
       {data && user && user.role==="Chairperson" &&  (
        <form onSubmit={handleChairpersonSubmit}>
          <div>
            <label htmlFor="evaluationMarks">Evaluation Marks:</label>
            <input type="number" id="evaluationMarks" value={evaluationMarks} onChange={(e) => setEvaluationMarks(e.target.value)} />
          </div>
          <div>
            <label htmlFor="evaluationComments">Evaluation Comments:</label>
            <textarea id="evaluationComments" value={evaluationComments} onChange={(e) => setEvaluationComments(e.target.value)} />
          </div>
          <button type="submit">Submit Evaluation</button>
        </form>
      )}
    </div>
  );
};

export default PhaseComponent;
