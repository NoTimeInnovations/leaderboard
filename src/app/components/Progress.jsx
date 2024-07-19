import React from 'react';

const Progress = ({ days }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white">
      <div className="text-lg mb-4">
        Progress
      </div>
      {days.map((day, index) => (
        <div key={index} className="mb-2">
          <input type="radio" id={`day-${index + 1}`} name="progress" className="mr-2" />
          <label htmlFor={`day-${index + 1}`}>{day}</label>
        </div>
      ))}
    </div>
  );
};

export default Progress;
