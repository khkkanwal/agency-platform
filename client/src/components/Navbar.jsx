import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 shadow">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-md" />
          <h1 className="font-bold text-xl">DevelopersHub Corporation</h1>
        </Link>
      </div>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <Link to="/login">
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
