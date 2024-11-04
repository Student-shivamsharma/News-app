
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLogoMongodb } from "react-icons/bi";
import { IoLogoGoogle } from "react-icons/io";
import { FaApple } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('user-info')){
      // navigate("/News") 
    }
    clear()
  } , [])

  
  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(email , password);
    let item = {email , password}
    let result = await fetch("https://e-learning-slfj.onrender.com/user/login/" , {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body : JSON.stringify(item)
    })
    result = await result.json();
    localStorage.setItem("user-info" , JSON.stringify(result))
    navigate("/News") 
    clear()
    
  };

  function clear(){
    setEmail("")
    setPassword("")
  }

  function navigateSign(){
    navigate("/Register")
  }
  
  return (
    <div className="flex items-center bg-gradient-to-t from-violet-600 from-45%  to-green-500 justify-center bg-cover h-auto w-screen bg-gray-100 flex-col ">
      <form onSubmit={handleLogin} className="bg-gradient-to-t from-white from-70% white to-violet-300 p-6 rounded shadow-md w-96 max-[450px]:w-72 text-center flex justify-cente items-center flex-col md:w-6/12 mt-20">
      <div className='text-5xl text-red-600 text-center'> <BiLogoMongodb/></div>
        <div>
          <h1 className='font-bold text-2xl'>Welcome back</h1>
          <p className='text-lg'>please enter your details to sign in</p>
        </div>
        <div className='flex flex-row gap-2 '>
          <button className='h-12 flex justify-center items-center flex-row w-28 rounded-xl shadow-lime-500 shadow-lg max-[450px]:w-20'><IoLogoGoogle className='text-2xl'/></button>
          <button className='h-12 flex justify-center items-center flex-row w-28 max-[450px]:w-20 rounded-xl shadow-lime-500 shadow-lg'><FaApple className='text-2xl'/></button>
          <button className='h-12 flex justify-center items-center flex-row w-28 max-[450px]:w-20 rounded-xl shadow-lime-500 shadow-lg'><FaFacebookF className='text-2xl'/></button>
        </div>
        <div >or</div>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4 w-full text-start">
          <label className="block text-lg font-bold mb-1 ">Email adress</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" rounded p-2 w-full  shadow-lime-500 shadow-lg bg-transparent border-n"
             placeholder='Enter your email'
          />
        </div>
        <div className="mb-4 w-full text-start">
          <label className="block text-lg font-bold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" rounded p-2 w-full  shadow-lime-500 shadow-lg bg-transparent border-n"
           placeholder='Enter your password'
          />
        </div>
        <button type="submit" className="bg-violet-600 text-white rounded p-2 w-full">
          Login
        </button>
        <div className='mt-2'>
          <p>Don't have an account? <span className='text-violet-600 text-bold' onClick={navigateSign}>Create account</span></p>
        </div>
      </form>
    </div>
  );
};

export default Login;


