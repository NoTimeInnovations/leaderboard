// app/components/ProblemPage.jsx
import React from 'react';
import Question from './Question';
import Progress from './Progress';
import ProblemTop from './ProblemTop';
import UploadQuestion from './UploadQuestion';

const ProblemPage = ({ questions, days, reloadData }) => {
  return (
    <div className="h-screen">
      <ProblemTop />
      <div className="flex md:flex-row w-full p-10 ">
        <div className="w-1/2 mr-4">
          {questions.map((question, index) => (
            <div key={index} className="flex items-center justify-center gap-x-5">
              {/* index */}
              <p className="text-xl mb-4 w-10 h-10 border-2 border-black flex items-center justify-center rounded-full">{index + 1}</p>
              <div className="w-full" >
                <Question
                  key={index}
                  title={question.title}
                  description={question.description}
                  score={question.score}
                  index={index}
                  problemId={question.id}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/4">
          <Progress days={days} />
        </div>
      </div>
      <div className="w-1/4">
        <UploadQuestion onUploadComplete={reloadData} />
      </div>
    </div>
  );
};

export default ProblemPage;
