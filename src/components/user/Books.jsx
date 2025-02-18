import React from "react";
import { Link } from "react-router-dom";
import UserNav from "./UserNav";
import Footer from "../Footer";

function Books() {
  return (
    <>
    <UserNav/>
    <div className="bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 py-12">Browse All Books</h2>
    </div>
    <Footer/>
    </>
  );
}

export default Books;
