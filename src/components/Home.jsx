import React from "react";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white h-[500px] flex flex-col justify-center items-center text-center px-4">
        <motion.h1
          className="text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Book Haven
        </motion.h1>
        <motion.p
          className="mt-4 text-lg max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Discover a world of knowledge, adventure, and imagination. Find your next great read today!
        </motion.p>
        <motion.button
          className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          Browse Books
        </motion.button>
      </div>
      
      {/* Featured Books */}
      <div className="py-12 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Featured Books</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((book, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="h-64 bg-gray-300 flex items-center justify-center text-2xl font-bold">Book {book}</div>
              <h3 className="mt-4 text-xl font-semibold">Book Title {book}</h3>
              <p className="text-gray-600 mt-2">An amazing book description goes here.</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Buy Now</button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;