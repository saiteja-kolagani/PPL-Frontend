import React, { useState } from 'react';
import moment from 'moment-timezone';

import './index.css'

const AddTimeZone = ({ onAdd }) => {
  const [newTimeZone, setNewTimeZone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTimeZone) {
      onAdd(newTimeZone);
      setNewTimeZone('');
    }
  };

  const timeZones = moment.tz.names();

  return (
    <form onSubmit={handleSubmit} className='form-add-timezone'>
      <select
        value={newTimeZone}
        onChange={(e) => setNewTimeZone(e.target.value)}
        className='select-timezone'
      >
        <option value="" disabled>
          Select Time Zone
        </option>
        {timeZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
      <button type="submit" className='add-timezone-btn'>Add Time Zone</button>
    </form>
  );
};

export default AddTimeZone;
