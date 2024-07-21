"use client";
// components/SignUpForm.js
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = ({handleSignupSucess}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
      setIsLoading(false);
      setUsernameError(false)
      setEmailError(false);
      handleSignupSucess(true);
    } else {
      setIsLoading(false);
      const data = await response.json();
      if (data.error) {
        if (data.error.includes("Username")) {
          setUsernameError(data.error);
          setEmailError("");
        } else if (data.error.includes("Email")) {
          setEmailError(data.error);
          setUsernameError("");
        }
      } else {
        alert("Failed to add user");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex items-center gap-x-5">
        <label className="w-20">Username:</label>
        <div className="flex flex-col">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border-2 border-gray-300 p-2 rounded-md w-60"
          />
          {userNameError && (
            <div className="text-red-500 text-xs pt-2">{userNameError}</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-5 py-5">
        <label className="w-20">Email:</label>
        <div className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-gray-300 p-2 rounded-md w-60"
          />
          {emailError && (
            <div className="text-red-500 text-xs pt-2">{emailError}</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-5">
        <label className="w-20">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-2 border-gray-300 p-2 rounded-md w-60"
        />
      </div>
      <div className="w-full flex justify-center py-5">
        <button type="submit" className=" bg-black text-white p-2 rounded-xl">
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
