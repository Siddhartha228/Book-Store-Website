import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", "Fiction", "Non-Fiction", "Science", "History", "Mystery"];
  const [selectedCategory, setSelectedCategory] = useState("All");

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

      {/* Search and Filter Section */}
      <div className="flex justify-center items-center gap-4 py-6 px-6">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute right-3 top-3 text-gray-500" />
        </div>
        <div>
          <select
            className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Books */}
      <div className="py-12 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Featured Books</h2>
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((book, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-4 hover:shadow-2xl transition-shadow"
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
