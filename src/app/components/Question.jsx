import React from 'react';

const Question = ({ title, attempts, successRate, skill, solved }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 text-white flex justify-between items-center">
      <div className="text-lg ">{title}</div>
      <div className="">
        {solved ? (
          <button className="bg-green-500 text-white py-2 px-4 rounded">Solved ✓</button>
        ) : (
          <button className="bg-blue-600 text-white py-2 px-4 rounded">Solve Challenge</button>
        )}
      </div>
    </div>
  );
};

export default Question;
