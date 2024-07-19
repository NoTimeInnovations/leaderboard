import React from 'react'
import ProblemPage from '../components/ProblemPage' 

const problems = () => {

  const questions = [
    {
      title: 'Plus Minus',
      attempts: 344243,
      successRate: 92.62,
      skill: 'Problem Solving (Basic)',
      solved: true
    },
    {
      title: 'Mini-Max Sum',
      attempts: 296914,
      successRate: 94.05,
      skill: 'Problem Solving (Basic)',
      solved: false
    },
    {
      title: 'Time Conversion',
      attempts: 243155,
      successRate: 94.55,
      skill: 'Problem Solving (Basic)',
      solved: false
    }
  ];
  
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];

  return (
    <div className="w-full">
      <ProblemPage questions={questions} days={days} />
    </div>
  )
}

export default problems