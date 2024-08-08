// app/components/ProblemPage.jsx
import React, { useEffect } from "react";
import Question from "./Question";
import Progress from "./Progress";
import ProblemTop from "./ProblemTop";
import UploadQuestion from "./UploadQuestion";
import { useAtom } from "jotai";
import { Problems } from "@/lib/atom";
import pb from "@/utils/pocketbase";

const ProblemPage = ({ days }) => {
  const [questions, setQuestions] = useAtom(Problems);
  const fetcher = async () => {
    try {
      const questions = await pb.collection("problems").getFullList();
      const userId = pb.authStore.model.id;
      const submissions = await pb
        .collection("submissions")
        .getFullList({ filter: `user_Id="${userId}"` });

      const updatedQuestions = questions.map((question) => {
        const submission = submissions.find(
          (sub) => sub.problem_Id === question.id
        );
        if (submission) {
          return {
            ...question,
            status: submission.status ? "true" : "false",
            score: submission.status ? submission.score : question.score,
          };
        }
        return question;
      });

      console.log(updatedQuestions);

      setQuestions(updatedQuestions);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };  

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <div className="h-screen">
      <ProblemTop />
      <div className="flex md:flex-row w-full p-10 ">
        <div className="w-1/2 mr-4">
          {questions?.map((question, index) => (
            <div
              key={index}
              className="flex text-white items-center justify-center gap-x-5"
            >
              {/* index */}
              <p className="text-xl mb-4 w-10 h-10 border-2 border-black flex items-center justify-center rounded-full">
                {index + 1}
              </p>
              <div className="w-full">
                <Question
                  key={question.id}
                  title={question.question}
                  description={question.description}
                  score={question.score}
                  index={question.id}
                  problemId={question.id}
                  category={question.category}
                  status={question.status ? question.status : "not solved"}
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
        <UploadQuestion />
      </div>
    </div>
  );
};

export default ProblemPage;
