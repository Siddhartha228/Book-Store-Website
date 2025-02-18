import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

// Importing book images
import one from '../assets/one.jpeg';
import two from '../assets/two.jpg';
import three from '../assets/three.jpg';
import four from '../assets/four.jpeg';
import five from '../assets/five.jpeg';
import six from '../assets/six.jpeg';

const books = [
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    description: "A hands-on, project-based introduction to programming in Python.",
    image: one
  },
  {
    title: "Java: The Complete Reference",
    author: "Herbert Schildt",
    description: "Comprehensive guide to Java programming, covering all aspects of the language.",
    image: two
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz, Henry Korth, S. Sudarshan",
    description: "Fundamentals of database systems, including design and implementation.",
    image: three
  },
  {
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    description: "A timeless classic that takes readers through a whimsical world filled with curious creatures and unexpected events. It's a story of imagination and fantasy that challenges reality.",
    image: four
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "Follow Bilbo Baggins on an epic adventure through Middle-Earth as he joins a group of dwarves to reclaim their homeland from a fearsome dragon. It's a rich story full of mythical creatures, unexpected twists, and bold exploration.",
    image: five
  },
  {
    title: "Treasure Island",
    author: "Robert Louis Stevenson",
    description: "A classic pirate adventure filled with treasure maps, hidden loot, and thrilling voyages. Join Jim Hawkins as he embarks on a dangerous journey to discover treasure on a remote island.",
    image: six
  }
];

function Home() {
  return (
    <>
      <Navbar />
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
            {books.map((book, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transform transition-all hover:scale-105 hover:shadow-2xl hover:bg-gray-50"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="relative w-full h-72 mb-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-1 font-medium">by {book.author}</p>
                <p className="text-gray-700 mt-2 text-sm">{book.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
