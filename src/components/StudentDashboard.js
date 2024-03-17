import React, { useEffect, useState } from 'react';
import MessageBox from './MessageBox';
import ProjectForm from './ProjectForm';
import PhasesTab from './PhaseTab';
import { TailSpin } from 'react-loader-spinner';

const StudentDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [hasUploadedDetails, setHasUploadedDetails] = useState("False");
    const [isguideSelected, setGuideSelected] = useState("False"); 
    const [guideName, setGuideName] = useState("");
    const [phasesData, setPhasesData] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const apiUrl = 'http://localhost:8000/students/';
                const response = await fetch(apiUrl, {
                    headers: {
                      Authorization: `Token ${token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();

                console.log(data.isGuideSelected);
                setGuideSelected(data.isGuideSelected); 
                setHasUploadedDetails(data.isProjectUploaded);
                if (data.project && data.project.guide && data.project.guide.name) {
                  setGuideName(data.project.guide.name);
              }
              if (data.project) {
                console.log(data.project);
                setPhasesData(data.project);
            }
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching guide selection status:', error);
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchData(); // Call the function to fetch data when component mounts
    }, []); // Empty dependency array to ensure it only runs once on mount

    if (loading) {
        return <div style={{height:"100%",textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center"}}><TailSpin color='darkblue'/></div>; // Display a loading indicator
    }

    return (
        <div>
            {/* Display appropriate message based on guide selection status */}
            {isguideSelected==="False" && (
            <MessageBox message="Guide is not selected. Please select a guide." />
        )}

            {/* Display project form if guide is selected and details are not uploaded */}
            {isguideSelected==="True" && hasUploadedDetails==="False" ? (
                <>
                    <MessageBox message="You haven't uploaded your project details. Please do that to proceed with the evaluation." />
                    <ProjectForm guideName={guideName} />
                </>
            ) : ""}

            {isguideSelected==="True" && hasUploadedDetails==="True" ? (
                <>
                <h1 style={{textAlign:"center"}}>Phases of the project</h1>
                <div style={{display:"flex", justifyContent:"center",marginLeft:"100px"}}>
                    <PhasesTab phaseno={1} phasesData={phasesData.Phase1}/>
                    <PhasesTab phaseno={2} phasesData={phasesData.Phase2}/>
                    <PhasesTab phaseno={3} phasesData={phasesData.Phase3}/>
                </div>

                </>
            ) : ""}
        </div>
    );
};

export default StudentDashboard;
