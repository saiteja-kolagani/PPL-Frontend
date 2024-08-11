import React from 'react';
import moment from 'moment-timezone';

import './index.css'

const TimeZoneDisplay = ({ timeZone, currentTime, onDelete }) => {
  const time = currentTime.tz(timeZone).format('HH:mm:ss'); 
  return (
    <div className='display-timezones'>
      <p>
        {timeZone}: {time}
      </p>
      <button onClick={onDelete} className='remove-btn'>Remove</button>
    </div>
  );
};

export default TimeZoneDisplay;
