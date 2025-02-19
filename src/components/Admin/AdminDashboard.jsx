import React from 'react';
import AdminNav from './AdminNav';

function AdminDashboard() {
  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Add a New Book</h1>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Book Title</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter book title"
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Author Name</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter author's name"
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Image URL</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image URL"
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                placeholder="Enter short description"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Price</label>
              <input 
                type="number" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price"
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;