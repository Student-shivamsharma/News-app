

import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa"
import { MdAttachEmail } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("");
  // const [dob, setDob] = useState("");
  const [emailValid, setEmailValid] = useState(true)
  const [nameValid, setNameValid] = useState(true)
  const [userValid, setUserValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const navigate = useNavigate();

  async function signUp() {
    if (clear()) {
      let item = {
        email,
        username: user,
        fullname: name,
        password
        // dob
      }

      console.log(item);

      let result = await fetch("https://e-learning-slfj.onrender.com/user/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      })

      result = await result.json();
      console.log(result);
      localStorage.setItem('user-info', JSON.stringify(result));
      localStorage.setItem("token" , JSON.stringify(result.access));
      clearFields();
      navigate("/News") 
    }
  }

  function clear() {
    let valid = true;

    setEmailValid(true);
    setNameValid(true);
    setUserValid(true);
    setPasswordValid(true);

    if (email === "" || name === "" || user === "" || password === "") {
      alert("Please fill all fields first.");
      valid = false;
      if (email === "") setEmailValid(false);
      if (name === "") setNameValid(false);
      if (user === "") setUserValid(false);
      if (password === "") setPasswordValid(false);
    }

    if (!email.includes("@gmail.com")) {
      alert("Email must contain '@gmail.com'.");
      valid = false;
      setEmailValid(false);
    }

    if (name.split("").some(char => !isNaN(char))) {
      alert("Name cannot contain numbers.");
      valid = false;
      setNameValid(false);
    }

    if (!user.endsWith("123")) {
      alert("Username must end with '123'.");
      valid = false;
      setUserValid(false)
    }

    if (password.length < 6 || !containsSpecialCharacter(password)) {
      alert("Password must be at least 6 characters long and contain at least one special character.");
      valid = false;
      setPasswordValid(false);
    }

    if (valid) {
      alert("Registration successful!");
    }
    return valid; 
  }

  function containsSpecialCharacter(str) {
    const specialChars = "!@#$%^&*()_+=-";
    for (let i = 0; i < str.length; i++) {
      if (specialChars.includes(str[i])) {
        return true;
      }
    }
    return false;
  }

  function clearFields() {
    setEmail(" ");
    setName(" ");
    setPassword(" ");
    setUser(" ");
    // setDob("")
    setEmailValid(true);
    setNameValid(true);
    setUserValid(true);
    setPasswordValid(true);
  }

  function navigateLogin(){
    navigate("/Login")
  }

  return (
    <div className="signup text-lg bg-black flex justify-center items-center flex-col sm:flex-row p-16 text-white gap-10 bg-[url('images/news-bg-transformed.jpeg')] bg-cover w-screen h-auto ">
      <div className="text text-left h-auto w-auto sm:w-6/12 flex justify-center items-center sm:place-items-start flex-col gap-6">
        <p className="sm:text-3xl text-xl text-left font-semibold">JOIN FOR FREE</p>
        <p className="sm:text-5xl text-2xl font-semibold">Unleash the traveler</p>
        <p className="sm:text-5xl text-2xl font-semibold"><span className="text-red-800 font-bold">inside YOU</span>, Enjoy your</p>
        <p className="sm:text-5xl text-2xl font-semibold">Dream Vacation</p>
        <p className="text-lg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea excepturi quasi repellat iustehenderit facere. Aut fugi animi ipsam te?</p>
        <div className="buttons flex justify-center items-center gap-8">
          <button className="h-10 text-center w-36 rounded-3xl bg-black border-2 border-sky-500">Explore</button>
          <button className="h-10 text-center w-36 rounded-3xl bg-black border-2 border-sky-500" onClick={navigateLogin}>
        Login
          </button>
        </div>
      </div>

      <div className="sm:w-6/12  backdrop-blur-lg  h-auto w-full flex justify-center gap-4 place-content-start flex-col p-6 rounded-xl">
        <h1 className="text-start text-4xl font-bold">Create</h1>
        <h1 className="text-start text-3xl font-bold">new account</h1>

        <div className={`flex w-full h-12 rounded-xl justify-between items-center bg-white ${!emailValid ? 'border border-red-500' : ''}`}>
          <input className={`h-12 rounded-xl w-full ${!emailValid ? 'text-red-500' : ''}`} type="text" value={email} onChange={(e) => {
              setEmail(e.target.value);
              setEmailValid(true);
            }}
            placeholder="email"
          />
          <div className="md:text-4xl text-xl text-black">
            <MdAttachEmail />
          </div>
        </div>
         
         <div className="block  md:flex gap-2">
        <div className={`flex w-full h-12 rounded-xl md:mt-6 md:w-6/12 justify-between items-center bg-white ${!nameValid ? 'border border-red-500' : ''}`}>
          <input className={`h-12 rounded-xl   w-full ${!nameValid ? 'text-red-500' : ''}`} type="text" value={name} onChange={(e) => {
              setName(e.target.value);
              setNameValid(true);
            }}
            placeholder="Enter name"
          />
          <div className="md:text-2xl text-xl text-black">
            <FaUserPlus/>
          </div>
        </div>

        <input className="md:w-6/12 h-12 rounded-xl w-full mt-4 " type="date" placeholder="DOB"  /*onChange={(e) => {
              setDob(e.target.value);
            }} */ />
        </div>

        <div className={`flex w-full h-12   rounded-xl justify-between items-center bg-white ${!userValid ? 'border border-red-500' : ''}`}>
          <input className={`h-12 rounded-xl w-full ${!userValid ? 'text-red-500' : ''}`} type="text" value={user} onChange={(e) => {
              setUser(e.target.value);
              setUserValid(true);
            }}
            placeholder="Username"
          />
          <div className="md:text-4xl text-xl text-black">
            <FaUserPlus/>
          </div>
        </div>

        <div className={`flex w-full h-12 rounded-xl justify-between items-center bg-white ${!passwordValid ? 'border border-red-500' : ''}`}>
          <input className={`h-12 rounded-xl w-full ${!passwordValid ? 'text-red-500' : ''}`} type="password" value={password} onChange={(e) => {
              setPassword(e.target.value);
              setPasswordValid(true);
            }}
            placeholder="Enter password"
          />
          <div className="md:text-4xl text-xl text-black">
            <RiLockPasswordFill/>
          </div>
        </div>

        <p>Already a Member? <span onClick={navigateLogin} className="text-blue-600 text-end font-bold">Log in</span></p>
        <button onClick={signUp} className="w-full h-12 text-center bg-blue-400 rounded-3xl">Create Account</button>
      </div>
    </div>
  );
};

export default Register;
