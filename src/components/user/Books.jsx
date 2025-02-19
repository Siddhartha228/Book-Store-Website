import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserNav from "./UserNav";
import Footer from "../Footer";

const books = [
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    description: "A hands-on, project-based introduction to programming in Python.",
    price: "$29.99",
    image: "/image"
  },
  {
    title: "Java: The Complete Reference",
    author: "Herbert Schildt",
    description: "Comprehensive guide to Java programming, covering all aspects of the language.",
    price: "$39.99",
    image: "/image"
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    description: "Fundamentals of database systems, including design and implementation.",
    price: "$49.99",
    image: "/image"
  }
];

function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <UserNav />
      <div className={`bg-gray-100 min-h-screen py-12 ${selectedBook ? "filter blur-sm pointer-events-none" : ""}`}>
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search books by title or author"
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Books List */}
        <div className="grid grid-cols-3 gap-6 px-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 transform transition-all hover:scale-102 hover:shadow-lg hover:bg-gray-50"
              >
                <div className="relative w-full h-64 mb-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-1 font-medium">by {book.author}</p>
                <p className="text-gray-700 mt-2 text-sm truncate">{book.description}</p>
                <p className="text-lg font-semibold text-green-600 mt-2">{book.price}</p>
                <div className="flex justify-between mt-4">
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400">Add to Cart</button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:ring-2 focus:ring-green-400">Buy Now</button>
                </div>
                <button
                  onClick={() => openModal(book)}
                  className="mt-3 text-blue-500 hover:underline"
                >
                  Read More
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No books found.</p>
          )}
        </div>
      </div>
      <Footer />

      {/* Modal for Book Details */}
      {selectedBook && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedBook.title}</h2>
            <p className="text-gray-600 mt-2 font-medium">by {selectedBook.author}</p>
            <p className="text-gray-700 mt-4">{selectedBook.description}</p>
            <p className="text-lg font-semibold text-green-600 mt-2">{selectedBook.price}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Books;
