// app/components/UploadQuestion.jsx
"use client";
import { Problems } from "@/lib/atom";
import pb from "@/utils/pocketbase";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UploadQuestion = () => {

  const { register, handleSubmit, reset } = useForm();
  const setQuestions = useSetAtom(Problems);

  const [open, setOpen] = useState(false);
  // const [question, setQuestion] = useState("");
  // const [score, setScore] = useState("");
  // const [category, setCategory] = useState("");
  // const [description, setDescription] = useState('');
  const[isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleQuestionChange = (event) => setQuestion(event.target.value);
  const handleScoreChange = (event) => setScore(event.target.value);
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const submitter = async (data) => {
    setIsLoading(true);
    console.log(data);

    pb.collection("problems")
      .create(data)
      .then((record) => {
        setQuestions((prev)=> [...prev, record]);
        console.log(record);
        setIsLoading(false);
        reset();  
        handleClose();
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        setIsLoading(false);
      });

  };

  return (
    <div className="text-black">
      <button
        className="p-2 w-10 text-xl fixed bottom-10 right-10 bg-blue-500 text-white rounded-full"
        onClick={handleOpen}
      >
        +
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <form onSubmit={handleSubmit(submitter)} className="bg-white p-6 rounded-lg shadow-lg z-50">
            <h2 className="text-2xl mb-4">Upload Question</h2>
            <div className="mb-4">
              <label className="block mb-1">Question</label>
              <input
                type="text"
                {...register("question")}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Description</label>
              <textarea
                {...register("description")}
                className="w-full px-3 py-2 border rounded-lg"
                rows="4"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Score</label>
              <input
                type="number"
                {...register("score")}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Category</label>
              <select
                {...register("category")}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                <option value="programming">Programming</option>
                <option value="e-commerce">E-commerce</option>
                <option value="mern">MERN Stack</option>
                <option value="others">Others</option>
              </select>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              {isLoading? 'Loading...' : 'Upload'}
            </button>
            <button
              onClick={handleClose}
              className="w-full mt-2 bg-gray-500 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UploadQuestion;
