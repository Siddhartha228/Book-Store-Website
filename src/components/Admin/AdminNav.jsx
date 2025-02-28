import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function AdminNav() {
  const navigate = useNavigate(); // Initialize navigation

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to the login page after logout
  };

  return (
    <nav className="bg-black text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-yellow-400"><i className="fas fa-book-open"></i> Book Haven</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li className="hover:text-gray-300 transition duration-300">
            <Link to="/manage-book" className="flex items-center space-x-2">
              <i className="fas fa-tasks"></i>
              <span>Manage Book</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to="/customer-detail" className="flex items-center space-x-2">
              <i className="fas fa-users"></i>
              <span>Customer Details</span>
            </Link>
          </li>
          {/* Change Logout link to button and call handleLogout */}
          <li className="hover:text-gray-300 transition duration-300">
            <button onClick={handleLogout} className="flex items-center space-x-2">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNav;
