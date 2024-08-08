import { Problems } from "@/lib/atom";
import pb from "@/utils/pocketbase";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Question = ({
  title,
  description,
  score,
  index,
  problemId,
  category,
  status,
}) => {
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [Questions,setQuestions] = useAtom(Problems);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setInputValue("");
  };

  const submitter = async (data) => {
    console.log(data);
    data.problem_Id = problemId;
    data.user_Id = pb.authStore.model.id;
    data.status = false;
    data.score = score;

    console.log(data);

    // const user = await pb.collection("users").getOne(data.user_Id);
    // const attemptedProblems = user.attempted_problems || {};

    // // Ensure the category exists in the JSON and add the problem ID to it
    // if (!attemptedProblems[category]) {
    //   attemptedProblems[category] = [];
    // }
    // if (!attemptedProblems[category].includes(problemId)) {
    //   attemptedProblems[category].push(problemId);
    // }

    // await pb.collection("users").update(data.user_Id, { attempted_problems: attemptedProblems });

    pb.collection("submissions")
      .create(data)
      .then((record) => {
        console.log(record);

        setQuestions((prevQuestions) => {
          const updatedQuestions = prevQuestions.map((question) => {
            if (question.id === problemId) {
              return {
                ...question,
                status: "false",
              };
            }
            return question;
          });
          console.log(updatedQuestions);
          return updatedQuestions;
        });

        handleModalClose();
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        handleModalClose();
      });
  };

  let statusText;
  if (status === "not solved") {
    statusText = "solve the problem";
  } else if (status === "false") {
    statusText = "processing";
  } else if (status === "true") {
    statusText = "done successfully";
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 text-white flex justify-between items-center">
      <div className="text-lg">{title}</div>
      <div>
        <button
          onClick={handleButtonClick}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {statusText}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit(submitter)}
            className="bg-white text-black p-6 rounded-lg"
          >
            <h2 className="text-lg mb-4">Submit Solution</h2>
            <div className="mb-4 flex gap-x-2">
              <div className="flex flex-col">
                <p className="font-bold text-xl">{title}</p>
                <p>{description}</p>
              </div>
              <br />
              {/* <strong>Score:</strong> {score} */}
            </div>
            <p className="mb-4">Provide the GitHub commit link :</p>
            <input
              type="text"
              {...register("Commit_link")}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <p className="mb-4">LinkedIn post URL :</p>
            <input
              type="text"
              {...register("Linkedin_Post")}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Question;