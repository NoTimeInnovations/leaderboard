import React from 'react';
import Question from './Question';
import Progress from './Progress';
import ProblemTop from './ProblemTop';

const ProblemPage = ({ questions, days }) => {
  return (
    <>
      <ProblemTop />
      <div className="flex md:flex-row w-full p-10 h-screen">
      <div className="w-1/2 mr-4">
          {questions.map((question, index) => (
          <Question
              key={index}
              title={question.title}
              attempts={question.attempts}
              successRate={question.successRate}
              skill={question.skill}
              solved={question.solved}
          />
          ))}
      </div>
      <div className="w-1/4">
          <Progress days={days} />
      </div>
      </div>
    </>
  );
};

export default ProblemPage;
