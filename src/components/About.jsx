import React from "react";
import Navbar from "./Navbar"

function About() {
  return (
    <><Navbar/>
    <div className="bg-gray-100 min-h-screen py-12 px-6">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-900">About Us</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to <span className="font-semibold">Book Haven</span>, your ultimate destination for literature lovers!
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
        <p className="mt-4 text-gray-600 text-lg">
          Our mission is to foster a love for reading by offering a diverse collection of books that inspire, educate, and entertain.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[ 
          { title: "Wide Collection", text: "Thousands of books across various genres." },
          { title: "Affordable Prices", text: "Best prices with exciting discounts." },
          { title: "Fast Delivery", text: "Quick and secure book delivery to your doorstep." },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-lg rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-blue-800">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default About;
