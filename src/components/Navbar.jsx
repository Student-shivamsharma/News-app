
import React, { useState } from "react";
import { BiLogoMongodb } from "react-icons/bi";
import { FaSearch } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const Navbar = () => {
  let user = JSON.parse(localStorage.getItem('user-info'));
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false); 

  function logOut() {
    localStorage.clear();
    navigate("/Register");
  }

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); 
  };

  return (
    <>
      <div className="navlogo flex justify-between items-center bg-black text-white h-20 w-auto ">
        <div className="flex justify-center items-center">
          <div className="text-red-600 text-4xl "><BiLogoMongodb/></div>
          <div className="name text-red-600 font-bold sm:text-lg lg:text-2xl ">News Live</div>
        </div>
        <div className="list hidden md:flex md:mt-3">
          <ul className="flex gap-6 font-bold sm:gap-2 md:gap-6 justify-center items-center">
            <li><Link to="/News" className="text-white no-underline md:text-2xl">News</Link></li>
            <li><Link to="/Profile" className="text-white no-underline md:text-2xl">Profile</Link></li>
            <li><Link to="/Register" className="text-white no-underline md:text-2xl">Signup</Link></li>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-1">
          <div className="text-2xl bg-slate-50 w-10 h-10 text-black sm:h-14 rounded-xl flex justify-center items-center max-[400px]:hidden ">
            <FaSearch />
          </div>
          <div className="search">
            <input type="text" placeholder="Search " className="bg-gray-150 rounded-xl sm:hidden h-10 max-[350px]:w-40 " />
            <input type="text" placeholder="Search the News of all over india " className="bg-gray-150 rounded-xl sm:w-64 p-3 md:w-[200px] lg:w-[550px] hidden sm:block" />
          </div>
        </div>
        <div className="button hidden md:flex sm:gap-2 mr-4 font-bold sm:hidden">
          {localStorage.getItem('user-info') ? 
            <button className="text-white text-xl">
              <NavDropdown title={user.user && user.user.fullname}>
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            </button>
          : 
            <button><Link to="/Login" className="text-white no-underline md:text-2xl">Log in</Link></button>
          }
        </div>
        <div className="md:hidden">
          <a href="#" onClick={toggleMenu} className="text-5xl text-center mb-20 font-bold text-decoration-none text-white">&#8801;</a>
          {menuVisible && (
            <div className="absolute bg-black text-white rounded shadow-lg mt-2 w-56 h-40 left-60">
              <ul className="flex flex-col p-2">
                <li className="py-2"><Link to="/News" className="no-underline text-white">News</Link></li>
                <li className="py-2"><Link to="/Profile" className="no-underline text-white">Profile</Link></li>
                <li className="py-2"><Link to="/Register" className="no-underline text-white">Signup</Link></li>
                <li onClick={logOut} className="text-white ">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
