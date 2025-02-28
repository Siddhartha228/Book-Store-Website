import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Clears fields when the component mounts
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/adminlogin/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); // Redirect after successful login
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Admin Login</h2>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                autoComplete="off" // Prevents autofill
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                autoComplete="new-password" // Prevents autofill
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-400"
            >
              Log in
            </button>
          </form>
          <p className="text-sm text-center text-gray-500 mt-4">
            Go back to user{" "}
            <Link to="/Login" className="text-gray-800 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
