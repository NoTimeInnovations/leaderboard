// components/LoginForm.js
import { useState } from 'react';
import {useRouter} from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push('/problems');
      alert('Login successful');
      localStorage.setItem('token', data.token);
    } else {
      alert('Login failed');
    }

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
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
        <button type="submit" className=" bg-black text-white p-2 rounded-xl">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
