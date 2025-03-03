import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
import Footer from "../Footer";

function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [showBuyForm, setShowBuyForm] = useState(false);
  const [selectedBookForPurchase, setSelectedBookForPurchase] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    contact: "",
    address: ""
  });

  const handleAddToCart = (bookToAdd) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = currentCart.find(
        (item) => 
          item.title === bookToAdd.title && 
          item.author === bookToAdd.author
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        currentCart.push({
          ...bookToAdd,
          quantity: 1,
          price: bookToAdd.price, 
          image: bookToAdd.image
        });
      }

      localStorage.setItem("cart", JSON.stringify(currentCart));
      window.dispatchEvent(new Event("cartUpdated"));
      alert(`${bookToAdd.title} added to cart! 🛒`);
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add to cart');
    }
  };

  const handleBuyNow = (book) => {
    setSelectedBookForPurchase(book);
    setShowBuyForm(true);
  };

  const handleBuySubmit = (e) => {
    e.preventDefault();
    const order = {
      ...customerDetails,
      bookTitle: selectedBookForPurchase.title,
      price: selectedBookForPurchase.price,
      date: new Date().toISOString(),
      status: "Pending"
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));
    
    setCustomerDetails({ name: "", contact: "", address: "" });
    setShowBuyForm(false);
    alert("Order placed successfully!");
  };

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
        title: book.title || 'No Title',
        author: book.author || 'Unknown Author',
        description: book.description || 'No description available',
        price: Number(book.price) || 0, 
        image: book.imageUrl || 'https://via.placeholder.com/150'
      }));
      
      setBooks(transformedBooks);
      
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to load books. Please try again.');
    }
  };

  useEffect(() => {
    fetchBooks();
    const handleBookAdded = () => fetchBooks();
    const handleBookDeleted = () => fetchBooks();
    const handleBookUpdated = () => fetchBooks();
    
    window.addEventListener('bookAdded', handleBookAdded);
    window.addEventListener('bookDeleted', handleBookDeleted);
    window.addEventListener('bookUpdated', handleBookUpdated);
    
    return () => {
      window.removeEventListener('bookAdded', handleBookAdded);
      window.removeEventListener('bookDeleted', handleBookDeleted);
      window.removeEventListener('bookUpdated', handleBookUpdated);
    };
  }, []);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const openModal = (book) => setSelectedBook(book);
  const closeModal = () => setSelectedBook(null);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <UserNav />
      <div className={`bg-gray-100 min-h-screen py-12 ${(selectedBook || showBuyForm) ? "filter blur-sm pointer-events-none" : ""}`}>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search books by title or author"
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-6 px-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div
                key={book.title + index}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4 transform transition-all hover:scale-102 hover:shadow-lg hover:bg-gray-50"
              >
                <div className="relative w-full h-64 mb-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                <p className="text-sm text-gray-600 mt-1 font-medium">by {book.author}</p>
                <p className="text-gray-700 mt-2 text-sm truncate">{book.description}</p>
                <p className="text-lg font-semibold text-green-600 mt-2">
                  ₹{book.price.toFixed(2)} 
                </p>
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={() => handleAddToCart(book)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleBuyNow(book)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:ring-2 focus:ring-green-400"
                  >
                    Buy Now
                  </button>
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

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedBook.title}</h2>
            <p className="text-gray-600 mt-2 font-medium">by {selectedBook.author}</p>
            <p className="text-gray-700 mt-4">{selectedBook.description}</p>
            <p className="text-lg font-semibold text-green-600 mt-2">
              ₹{selectedBook.price.toFixed(2)}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Purchase Form Modal */}
      {showBuyForm && selectedBookForPurchase && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Purchase Details</h2>
            <form onSubmit={handleBuySubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Book Title</label>
                <input
                  type="text"
                  value={selectedBookForPurchase.title}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="text"
                  value={`₹${selectedBookForPurchase.price.toFixed(2)}`}
                  readOnly
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  required
                  value={customerDetails.contact}
                  onChange={(e) => setCustomerDetails({...customerDetails, contact: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Delivery Address</label>
                <textarea
                  required
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBuyForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Books;