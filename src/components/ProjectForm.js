import React, { useState, useEffect } from 'react';
import './projectform.css';
import './popup.css'; // Import the CSS for the popup
import { TailSpin } from 'react-loader-spinner';

const ProjectForm = ({ guideName }) => {
  const [projectName, setProjectName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    if (error) {
      showPopup(); // Show popup when error state is set
    }
  }, [error]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
      setSelectedCategory('');
    }
  };

  const handleRemoveCategory = (category) => {
    const updatedCategories = selectedCategories.filter((item) => item !== category);
    setSelectedCategories(updatedCategories);
  };
  const closePopup = () => {
    
    const popup = document.getElementById('errorPopup');
    popup.classList.remove('show');
    setError(null); // Reset error state after popup closes
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    setError(null); // Reset error state on form submit
    const data = {
      projectname: projectName,
      domains: selectedCategories
    };
    const token = localStorage.getItem('token');
    const response = await fetch('http://127.0.0.1:8000/students/projectdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      setIsLoading(false);
      window.location.reload();

    } else {
      setIsLoading(false);
      setError(`Error: ${response.statusText}`);
    }
  };
  const isFormValid = () => {
    return projectName.trim() !== '' && selectedCategories.length !==0;
  };

  const showPopup = () => {
    
    const popup = document.getElementById('errorPopup');
    popup.classList.add('show');
  
    setTimeout(() => {
      popup.classList.remove('show');
      setError(null); // Reset error state after popup closes
    }, 2000); // Popup auto-closes after 5 seconds
  };


  return (
    <div className="project-form-container">
      <label htmlFor="projectName">Project Name:</label>
      <input
        type="text"
        id="projectName"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <label>Guide Name: {guideName}</label>

      <div className="category-section">
        <label htmlFor="projectCategory">Select Project Category:</label>
        <select id="projectCategory" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select...</option>
          <option value="cryptography">Cryptography</option>
          <option value="AI">AI</option>
          <option value="infoSecurity">Info Security</option>
        </select>
        <button type="button" style={{backgroundColor:"darkblue", color:"white",border:"1px solid darkblue"}} onClick={handleAddCategory}>
          Add
        </button>
      </div>

      <div className="selected-categories">
        {selectedCategories.map((category) => (
          <div key={category} className="category">
            {category}
            <button type="button" style={{color:"red", backgroundColor:"white"}} onClick={() => handleRemoveCategory(category)}>
              &#x2715;
            </button>
          </div>
        ))}
      </div>

      {/* Conditionally render loading spinner */}
      {isLoading ? (
        <TailSpin color='darkblue' />
      ) : (
        // Submit button
        <button
        type="button"
        onClick={handleFormSubmit}
        disabled={!isFormValid()}
      >
        Submit
      </button>
      )}

     
      {/* Error popup */}
      {error && (
       <div id="errorPopup" className="popup-container">
       <button className="close-btn" onClick={() => closePopup()}>&times;</button>
       <p>{error}</p>
     </div>
      )}
    </div>
  );
};

export default ProjectForm;
