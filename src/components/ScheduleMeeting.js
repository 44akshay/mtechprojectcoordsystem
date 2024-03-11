// ScheduleMeeting.js

import React from 'react';
import './schedulemeeting.css';

const ScheduleMeeting = () => {
  return (
    <div className="schedule-meeting-form">
      <label>
        Select Student:
        <select>
          <option value="akshay">Akshay</option>
          <option value="mihir">Mihir</option>
          <option value="kapil">Kapil</option>
        </select>
      </label>

      <label>
        Date:
        <input type="date" />
      </label>

      <label>
        Time:
        <input type="time" />
      </label>

      <label>
        Location:
        <input type="text" />
      </label>

      <label>
        Description of Meeting:
        <textarea rows="4"></textarea>
      </label>

      <label>
        Invite Text:
        <input type="text" />
      </label>

      <div>
        <label>
          Coordinator:
          <input type="checkbox" />
        </label>

        <label>
          Chairperson:
          <input type="checkbox" />
        </label>

        <label>
          Committee Member:
          <input type="checkbox" />
        </label>
      </div>

      <button type="button">Schedule</button>
    </div>
  );
};

export default ScheduleMeeting;
