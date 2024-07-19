"use client"
// components/SignUpForm.js
import { useState } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
      alert('User added successfully');
    } else {
      alert('Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
      <div className="flex items-center gap-5">
        <label className="w-20">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="border-2 border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="flex items-center gap-5">
        <label className="w-20">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-2 border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="flex items-center gap-5">
        <label className="w-20">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-2 border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="w-full flex justify-center">
        <button type="submit" className=" bg-black text-white p-2 rounded-xl">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
