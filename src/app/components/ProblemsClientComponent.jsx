// app/problems/ProblemsClientComponent.jsx
"use client";

import React, { useState, useEffect } from 'react';
import ProblemPage from '../components/ProblemPage';

const ProblemsClientComponent = ({ days }) => {

  return (
    <div className="w-full">
      <ProblemPage days={days} />
    </div>
  );
};

export default ProblemsClientComponent;
