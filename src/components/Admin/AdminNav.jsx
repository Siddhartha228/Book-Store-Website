import React from 'react';
import { Link } from 'react-router-dom';

function AdminNav() {
  return (
      <div className="flex justify-evenly text-white bg-black h-[100px]">
        <ul className="hidden md:flex text-lg justify-evenly w-full max-w-4xl">
          <li className="mx-[25px] cursor-pointer flex items-center justify-center">
            <Link to="/dashboard" className="hover:text-gray-300">Admin Dashboard</Link>
          </li>
          
        </ul>
      </div>
  );
}

export default AdminNav;