

import React, { useState } from 'react';
import axios from 'axios';
import { BiLogoMongodb } from "react-icons/bi"
import { IoLogoGoogle } from "react-icons/io"
import { FaApple } from "react-icons/fa"
import pht from '../images/pht.jpg'

const Profile = () => {
  const [userdata, setUserData] = useState();

  const handleClick = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const header = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get('https://e-learning-slfj.onrender.com/user/profile/', header)
      .then((res) => {
        setUserData(res.data);
        console.log("data", res);
      })
      .catch((err) => {
        console.log("error", err);
      })
  }

  handleClick();

  return (
    <div className="w-screen h-auto bg-cover px-20 bg-[url('images/loginearth.jpg')]">
      <div className="icons flex text-center justify-center items-center pt-4">
        <BiLogoMongodb className="text-5xl text-red-600" />
        <IoLogoGoogle className="text-5xl text-pink-500" />
        <FaApple className="text-5xl text-yellow-500" />
      </div>

      <h1 className="text-white text-center">
        <span className="text-red-500">Welcome</span>, to your Profile
      </h1>

      <div className="header h-auto flex justify-center items-center flex-col sm:flex-row">
        <div className="text w-full h-auto p-4 text-white">
          <div className="name text-5xl font-bold">
            {userdata?.fullname}
          </div>
          <div className="info mt-4">
            <p>Hello, I am {userdata?.fullname}, a passionate journalist. <hr /></p>
            <p>Based in {userdata?.location || "New York"}, currently working with top news outlets. <hr /></p>
            <p>My goal is to deliver insightful news articles and reports. <hr /></p>
            <p>Follow my work for the latest updates and analysis. <hr /></p>
          </div>
        </div>
        <div className="img bg-red w-full h-auto p-4 flex justify-center items-center">
          <img src={pht} alt="Profile" className="h-auto w-auto bg-orange-500 rounded-full" />
        </div>
      </div>

      <div className="main h-auto w-full text-white sm:flex">
        <div className="work border-5 border-white p-8 w-full rounded-3xl">
          <p className="text-center text-2xl">Work Experience</p>
          <div className="experience">
            <span className="h-32 w-32 bg-red-500 text-white rounded-full">01</span>
            <span>
              <span>News Reporter at XYZ News <hr /></span>
              <span>Focused on technology and innovation <hr /></span>
              <span>Contributed to various high-impact stories <hr /></span>
            </span>
          </div>
          <div className="experience mt-5">
            <span className="h-32 w-32 bg-red-500 text-white rounded-full">02</span>
            <span>
              <span>Editor at ABC Media <hr /></span>
              <span>Managed a team of journalists <hr /></span>
              <span>Oversaw editorial content and quality <hr /></span>
            </span>
          </div>
        </div>

        <div className="right w-full h-auto pt-0 flex items-center flex-col">
          <div className="mail mt-3 w-64 text-center text-2xl">
            <p>{userdata?.email} <hr /></p>
            <p>{userdata?.username} <hr /></p>
            <p>{userdata?.role} <hr /></p>
            <p>{userdata?.phone || "Not Provided"} <hr /></p>
          </div>
          
          <div className="skills flex justify-center items-center flex-col mt-10">
            <h2 className="w-64 text-center">My Skills <hr /></h2>
            <button className="h-10 w-40 bg-green-500 rounded-2xl mt-6">Investigative</button>
            <button className="h-10 w-40 bg-green-500 rounded-2xl mt-6">Data Analysis</button>
            <button className="h-10 w-40 bg-green-500 rounded-2xl mt-6">Content Writing</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
