// CoordinatorPage.js

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './chairperson.css';

const Chairperson = () => {
    const [formData, setFormData] = useState({
        marks: '',
        comments: '',
        minutes: '',
    });

    const [activePhase, setActivePhase] = useState(1); // State to track active phase

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    return (
        <div className="coordinator-page">
            <div className="phase-buttons">
                <button
                    className={activePhase === 1 ? 'active-phase' : ''}
                    onClick={() => setActivePhase(1)}
                >
                    <b>Phase 1</b>
                </button>
                <button
                    className={activePhase === 2 ? 'active-phase' : ''}
                    onClick={() => setActivePhase(2)}
                >
                    <b>Phase 2</b>
                </button>
                <button
                    className={activePhase === 3 ? 'active-phase' : ''}
                    onClick={() => setActivePhase(3)}
                >
                    <b>Phase 3</b>
                </button>
            </div>
            <div className='forme'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="marks"><b>Marks:</b></label>
                <input
                    type="number"
                    id="marks"
                    name="marks"
                    value={formData.marks}
                    onChange={handleInputChange}
                />
                <label htmlFor="comments"><b>Comments:</b></label>
                <textarea
                    type="text"
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleInputChange}
                />
                <label htmlFor="minutes"><b>Minutes:</b></label>
                <textarea
                    id="minutes"
                    name="minutes"
                    value={formData.minutes}
                    onChange={handleInputChange}
                />
                <br></br>
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Chairperson;