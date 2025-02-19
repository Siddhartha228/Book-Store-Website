import React, { useState } from "react";
import AdminNav from "./AdminNav";

function CustomerDetails() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      bookTitle: "The Great Gatsby",
      totalPrice: 15.99,
      status: "Pending"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      bookTitle: "1984",
      totalPrice: 18.50,
      status: "Pending"
    }
  ]);

  const updateStatus = (id, status) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...customer, status } : customer
    ));
  };

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Details</h1>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 divide-y divide-gray-200 shadow-lg rounded-lg">
                <thead className="bg-gray-100">
                  <tr className="border-b border-gray-300">
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Customer Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Book Title</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider border-r border-gray-300">Total Price</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-300">
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300 text-sm font-medium text-gray-900">{customer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300 text-sm text-gray-500">{customer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300 text-sm text-gray-500">{customer.bookTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-gray-300 text-sm text-gray-500">${customer.totalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                        <button 
                          className={`px-4 py-2 rounded-lg shadow-md transition font-bold ${customer.status === "Delivered" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`} 
                          onClick={() => updateStatus(customer.id, "Delivered")}
                        >Delivered</button>
                        <button 
                          className={`px-4 py-2 rounded-lg shadow-md transition font-bold ${customer.status === "Not Delivered" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-700"}`} 
                          onClick={() => updateStatus(customer.id, "Not Delivered")}
                        >Not Delivered</button>
                        <button 
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition font-bold" 
                          onClick={() => setCustomers(customers.filter(c => c.id !== customer.id))}
                        >Cancel Order</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDetails;
