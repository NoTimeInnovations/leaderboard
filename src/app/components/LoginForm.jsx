// components/LoginForm.js
import { useState } from 'react';
import {useRouter} from 'next/navigation'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setIsLoading(false);
      const data = await response.json();
      router.push('/problems');
      localStorage.setItem('token', data.token);
    } else {
      setIsLoading(false);
      const data = await response.json();
      if (data.error.includes("email")) {
        setEmailError(data.error);
        setPasswordError("");
      }
      if (data.error.includes("password")) {
        setPasswordError(data.error);
        setEmailError("");
      }
    }

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
      <div className="flex items-center gap-x-5">
        <label className="w-20">Email:</label>
        <div className="flex flex-col">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-2 border-gray-300 p-2 rounded-md w-60"
          />
          {emailError && (
            <div className="text-red-500 text-xs pt-2">{emailError} </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-5">
        <label className="w-20">Password:</label>
        <div className="flex flex-col">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-2 border-gray-300 p-2 rounded-md"
          />
          {passwordError && (
            <div className="text-red-500 text-xs pt-2">{passwordError}</div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button type="submit" className=" bg-black text-white p-2 rounded-xl">
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
