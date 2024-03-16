// ProjectForm.js

import React, { useState } from 'react';
import './projectform.css';

const ProjectForm = ({guideName}) => {
  const [projectName, setProjectName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const handleFormSubmit = async () => {
    // Add your logic to handle form submission
    console.log('Form submitted with:', { projectName, selectedCategories });
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

      // Check if response is successful
      if (response.ok) {
        window.location.reload();
      }

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
        <button type="button" onClick={handleAddCategory}>
          Add
        </button>
      </div>

      <div className="selected-categories">
        {selectedCategories.map((category) => (
          <div key={category} className="category">
            {category}
            <button type="button" onClick={() => handleRemoveCategory(category)}>
              &#x2715;
            </button>
          </div>
        ))}
      </div>

      {/* Submit button */}
      <button type="button" onClick={handleFormSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ProjectForm;
