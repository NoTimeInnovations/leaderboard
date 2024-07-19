"use client";
import React, { useState, useEffect } from "react";
import {useRouter} from "next/navigation";
import Leaderboard from "./Leaderboard";
import Topper from "./Topper";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

const MainPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  
  const router = useRouter();

  const handleSignup = () => {
    if(buttontext === "Join Now"){
        setIsSignup(!isSignup);
    }
    else{
      router.push('/problems');
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('token');
    if(token){
        setButtonText("Start Coding");
    }else {
        setButtonText("Join Now");
    }
  }, []);

  // join now button will become joined when the user is signed up/login
  const [buttontext, setButtonText] = useState("Join Now");

  return (
    <div className="w-full h-full">
      <div
        className={`flex flex-col items-center justify-center p-5 bg-[#151729] min-h-screen w-full ${
          isSignup || isLogin ? "blur-sm" : ""
        }`}
      >
        <div className="text-white flex justify-end w-full">
          <button
            onClick={handleSignup}
            className="bg-yellow-500 p-2 rounded-xl"
          >
            {buttontext}
          </button>
        </div>
        <div className="heading p-2 text-3xl text-white rounded-xl">
          LeaderBoard
        </div>
        <div className="parent flex justify-around items-end w-full max-w-4xl mt-10 relative">
          <Topper h={44} position={2} name="Jackson" score="1847" rank="2" />
          <Topper h={56} position={1} name="Eiden" score="2430" rank="1" />
          <Topper h={44} position={3} name="Emma Aria" score="1674" rank="3" />
        </div>
        <Leaderboard />
      </div>
      {isSignup && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center">
          <div className="w-full max-w-xl p-5 bg-white">
            <div className="flex w-full justify-between">
              <div className="text-center text-xl font-bold mb-5">Sign Up</div>
              <div className="rounded-xl cursor-pointer">
                Close
              </div>
            </div>
            <SignUpForm />
            <div className="text-center mt-5">
                Already have an account? <button onClick={() =>{ 
                    setIsLogin(!isLogin)
                    setIsSignup(!isSignup)
                }}>Login</button>
            </div>
          </div>
        </div>
      )}
      {isLogin && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex items-center justify-center">
          <div className="w-full max-w-xl p-5 bg-white">
            <div className="flex w-full justify-between">
              <div className="text-center text-xl font-bold mb-5">Login</div>
              <div
                onClick={() => {
                    setIsLogin(!isLogin);
                }}
                className="rounded-xl cursor-pointer"
              >
                Close
              </div>
            </div>
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
