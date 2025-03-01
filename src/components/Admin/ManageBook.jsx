import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";

function ManageBook() {
  const [books, setBooks] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch books');
      
      const data = await response.json();
      const transformedBooks = data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        price: `₹${Number(book.price).toFixed(2)}`,
        image: book.imageUrl || 'https://via.placeholder.com/150'
      }));
      
      setBooks(transformedBooks);
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and setup event listener
  useEffect(() => {
    fetchBooks();
    const handleBookAdded = () => {
      console.log('Refreshing books list...');
      fetchBooks();
    };
    
    window.addEventListener('bookAdded', handleBookAdded);
    return () => window.removeEventListener('bookAdded', handleBookAdded);
  }, []);

  // Delete book functionality
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${selectedBookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete book');
      
      setBooks(prev => prev.filter(book => book.id !== selectedBookId));
      setIsDeleteModalOpen(false);
      alert('Book deleted successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150';
                          }}
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
                            setSelectedBookId(book.id);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {books.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">
              No books found in the database
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-20">
            <div className="absolute inset-0 backdrop-blur-lg z-10"></div>
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
                  onClick={handleDelete}
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