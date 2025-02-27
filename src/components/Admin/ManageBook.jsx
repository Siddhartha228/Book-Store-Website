import React, { useState } from "react";
import AdminNav from "./AdminNav";

function ManageBook() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Python Crash Course",
      author: "Eric Matthes",
      description: "A hands-on, project-based introduction to programming in Python.",
      price: "1200",
      image: "https://th.bing.com/th/id/OIP.YXeUxEXczKyvokUWv3k3cAHaFj?w=223&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 2,
      title: "Java: The Complete Reference",
      author: "Herbert Schildt",
      description: "Comprehensive guide to Java programming, covering all aspects of the language.",
      price: "2000",
      image: "https://th.bing.com/th/id/OIP.xe4HFq4YeBrfkgBA4z82KgHaJS?w=202&h=253&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    },
    {
      id: 3,
      title: "Database System Concepts",
      author: "Abraham Silberschatz",
      description: "Fundamentals of database systems, including design and implementation.",
      price: "1800",
      image: "https://th.bing.com/th/id/OIP.O4UlfXUrkZdpH9jEDobJjQHaJ4?w=202&h=269&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    }
  ]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleDelete = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gray-100 p-8 relative">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Books</h1>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 divide-y divide-gray-200 shadow-lg rounded-lg">
                <thead className="bg-gray-100">
                  <tr className="border-b border-gray-300">
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Cover</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id} className="border-b border-gray-300">
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300">
                        <img 
                          src={book.image} 
                          alt={book.title} 
                          className="h-12 w-12 object-cover rounded shadow-md"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-300">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-300">{book.author}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate border-r border-gray-300">{book.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-300">{book.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition font-bold">Edit</button>
                        <button 
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition font-bold" 
                          onClick={() => {
                            setSelectedBook(book.id);
                            setIsDeleteModalOpen(true);
                          }}
                        >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {books.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No books found in the database
            </div>
          )}
        </div>

        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-20">
            <div className="absolute inset-0 backdrop-blur-lg z-10"></div> {/* Applying the blur to the background */}
            <div className="bg-white rounded-lg p-6 max-w-md w-full z-30">
              <h3 className="text-lg font-medium mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this book? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedBook)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ManageBook;
