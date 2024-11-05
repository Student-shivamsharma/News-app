
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register"
import News from "./components/News"
import Navbar from "./components/Navbar"
import Profile from "./components/Profile"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1 className="text-black mt-5 text-center text-5xl">Welcome to the News App</h1>} />
          <Route path="/news" element={<News />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
