// app/problems/ProblemsClientComponent.jsx
"use client";

import React, { useState, useEffect } from 'react';
import ProblemPage from '../components/ProblemPage';

const ProblemsClientComponent = ({ initialQuestions, days }) => {
  const [questions, setQuestions] = useState(initialQuestions);

  const reloadData = async () => {
    const response = await fetch('/api/fetch-problems');
    const data = await response.json();
    setQuestions(data);
  };

  // Refetch data when component mounts
  useEffect(() => {
    reloadData();
  }, []);

  return (
    <div className="w-full">
      <ProblemPage questions={questions} days={days} reloadData={reloadData} />
    </div>
  );
};

export default ProblemsClientComponent;
