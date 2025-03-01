import React, { useState } from 'react';
import AdminNav from './AdminNav';

function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    imageUrl: '',
    description: '',
    price: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Client-side validation
      if (!formData.title.trim() || 
          !formData.author.trim() || 
          !formData.imageUrl.trim() || 
          !formData.description.trim() || 
          !formData.price) {
        throw new Error('All fields are required');
      }

      if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
        throw new Error('Price must be a positive number');
      }

      if (!isValidUrl(formData.imageUrl)) {
        throw new Error('Please enter a valid image URL');
      }

      const response = await fetch('http://localhost:5000/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          author: formData.author.trim(),
          imageUrl: formData.imageUrl.trim(),
          description: formData.description.trim(),
          price: parseFloat(formData.price)
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add book');
      }

      // Reset form
      setFormData({
        title: '',
        author: '',
        imageUrl: '',
        description: '',
        price: ''
      });
      
      window.dispatchEvent(new Event('bookAdded'));
      alert('Book added successfully!');
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Submission error:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>Add a New Book</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Book Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter book title"
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Author Name</label>
              <input 
                type="text" 
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter author's name"
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Image URL</label>
              <input 
                type="url" 
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
                required 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                placeholder="Enter short description"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Price</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price"
                min="0"
                step="0.01"
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