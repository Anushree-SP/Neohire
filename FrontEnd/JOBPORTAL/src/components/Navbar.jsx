import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const dashboardRoute =
    role === "1"
      ? "/user-dashboard"
      : role === "2"
      ? "/recruiter-dashboard"
      : role === "3"
      ? "/admin-dashboard"
      : "/";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 to-orange-500 text-transparent bg-clip-text">
          🚀 NeoHire
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 font-semibold">
          <CustomNavLink to="/">Home</CustomNavLink>
          <CustomNavLink to="/about">About</CustomNavLink>
          <CustomNavLink to="/jobs">Jobs</CustomNavLink>
          {token && <CustomNavLink to={dashboardRoute}>Dashboard</CustomNavLink>}
          {token ? (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <CustomNavLink to="/login">Login</CustomNavLink>
              <CustomNavLink to="/register">Register</CustomNavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-blue-800 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-4 text-white font-semibold">
          <CustomNavLink to="/" onClick={() => setIsOpen(false)}>Home</CustomNavLink>
          <CustomNavLink to="/about" onClick={() => setIsOpen(false)}>About</CustomNavLink>
          <CustomNavLink to="/jobs" onClick={() => setIsOpen(false)}>Jobs</CustomNavLink>
          {token && (
            <CustomNavLink to={dashboardRoute} onClick={() => setIsOpen(false)}>
              Dashboard
            </CustomNavLink>
          )}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <CustomNavLink to="/login" onClick={() => setIsOpen(false)}>Login</CustomNavLink>
              <CustomNavLink to="/register" onClick={() => setIsOpen(false)}>Register</CustomNavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const CustomNavLink = ({ to, children, onClick }) => (
  <RouterNavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `px-3 py-2 transition duration-200 ${
        isActive ? "text-indigo-200 underline underline-offset-4" : "hover:underline"
      }`
    }
  >
    {children}
  </RouterNavLink>
);

export default Navbar;
