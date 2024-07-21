import React, { useState } from 'react';

const Question = ({ title, description, score, index, problemId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setInputValue('');
  };

  const handleSubmit = async () => {

    // fetchUser api
    const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/fetchUser`, { cache: 'no-store' });
    if (!user.ok) {
      console.error('Error fetching user:', user);
      return;
    }
    const userData = await user.json();
    console.log(userData);

    // Handle the form submission, e.g., sending the data to an API
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          userId: userData.userId,
          problemId,
          content: inputValue,
          score,
        }
      ),
    });
    if (response.ok) {
      handleModalClose();
    } else {
      console.error('Error submitting solution:', response);
      handleModalClose();
    }
    handleModalClose();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 text-white flex justify-between items-center">
      <div className="text-lg">{title}</div>
      <div>
        <button 
          onClick={handleButtonClick} 
          className="bg-blue-600 text-white py-2 px-4 rounded">
          Solve Challenge
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg">
            <h2 className="text-lg mb-4">Submit Solution</h2>
            <div className="mb-4 flex gap-x-2">
              <div className="">{index+1}.</div>
              {description}
              <br />
              {/* <strong>Score:</strong> {score} */}
            </div>
            <p className="mb-4">Provide the GitHub link or LinkedIn post URL:</p>
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="flex justify-end">
              <button 
                onClick={handleModalClose} 
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button 
                onClick={handleSubmit} 
                className="bg-blue-600 text-white py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
