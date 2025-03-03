import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = () => {
      try {
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(items);
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    // Load immediately
    loadCartItems();

    // Listen for cart updates
    window.addEventListener("cartUpdated", loadCartItems);

    return () => {
      window.removeEventListener("cartUpdated", loadCartItems);
    };
  }, []);

  const removeItem = (index) => {
    const newCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <>
      <UserNav />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty</p>
        ) : (
          <div className="max-w-4xl mx-auto">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">by {item.author}</p>
                    <p className="text-green-600 font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(index)}
                  className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 text-lg"
                >
                  ×
                </button>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold">
                Total: NPR
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;