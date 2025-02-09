import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
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
            <Link to="/home" className="flex items-center space-x-2">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to="/about" className="flex items-center space-x-2">
              <i className="fas fa-info-circle"></i>
              <span>About</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to="/login" className="flex items-center space-x-2">
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
          </li>
          <li className="hover:text-gray-300 transition duration-300">
            <Link to="/signup" className="flex items-center space-x-2">
              <i className="fas fa-user-plus"></i>
              <span>Signup</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
