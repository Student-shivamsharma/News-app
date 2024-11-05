//


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiLogoMongodb } from "react-icons/bi"
import { IoLogoGoogle } from "react-icons/io"
import { FaApple, FaFacebookF } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('')

    let item = { email, password };

    try {
      let result = await fetch("https://e-learning-slfj.onrender.com/user/login/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(item)
      })

      if (!result.ok) {
        const errorData = await result.json();
        setError(errorData.error || "Invalid email or password.")
        // setError(errorData.error)
        return
      }

      result = await result.json();
      localStorage.setItem('user-info', JSON.stringify(result));
      localStorage.setItem("token", JSON.stringify(result.access))
      navigate("/News");

    }
     catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    }
  }

  return (
    <div className="flex items-center bg-gradient-to-t from-violet-600 from-45% to-green-500 justify-center bg-cover h-auto w-screen bg-gray-100 flex-col ">
      <form onSubmit={handleLogin} className="bg-gradient-to-t from-white from-70% white to-violet-300 p-6 rounded shadow-md w-96 max-[450px]:w-72 text-center flex justify-center items-center flex-col md:w-6/12 mt-20">
        <div className='text-5xl text-red-600 text-center'><BiLogoMongodb /></div>
        <div>
          <h1 className='font-bold text-2xl'>Welcome back</h1>
          <p className='text-lg'>Please enter your details to sign in</p>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message */}

        <div className="flex flex-row gap-2 mb-4">
          <button className='h-12 flex justify-center items-center w-28 rounded-xl shadow-lime-500 shadow-lg'>
            <IoLogoGoogle className='text-2xl' />
          </button>
          <button className='h-12 flex justify-center items-center w-28 rounded-xl shadow-lime-500 shadow-lg'>
            <FaApple className='text-2xl' />
          </button>
          <button className='h-12 flex justify-center items-center w-28 rounded-xl shadow-lime-500 shadow-lg'>
            <FaFacebookF className='text-2xl' />
          </button>
        </div>
        
        <div>or</div>
        
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <div className="mb-4 w-full text-start">
          <label className="block text-lg font-bold mb-1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded p-2 w-full shadow-lime-500 shadow-lg bg-transparent border-n"
            placeholder='Enter your email'
            required
          />
        </div>
        <div className="mb-4 w-full text-start">
          <label className="block text-lg font-bold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded p-2 w-full shadow-lime-500 shadow-lg bg-transparent border-n"
            placeholder='Enter your password'
            required
          />
        </div>
        <button type="submit" className="bg-violet-600 text-white rounded p-2 w-full">
          Login
        </button>
        <div className='mt-2'>
          <p>Don't have an account? <span className='text-violet-600 font-bold cursor-pointer' onClick={() => navigate("/Register")}>Create account</span></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
