import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 shadow">
      {/* LOGO */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-md" />
          <h1 className="font-bold text-xl">DevelopersHub Corporation</h1>
        </Link>
      </div>

      {/* LINKS */}
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* RIGHT SIDE */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            {/* USER NAME */}
            <span className="font-semibold text-gray-700">{user.name}</span>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
