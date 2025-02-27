import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Signup from "./components/Signup"

import AdminLogin from "./components/AdminLogin"
import AdminDashboard from "./components/Admin/AdminDashboard"

import Homeu from "./components/user/Homeu"
import Aboutu from "./components/user/Aboutu"

import Books from "./components/user/Books"

import ManageBook from "./components/Admin/ManageBook"
import CustomerDetails from "./components/Admin/CustomerDetails"
import Cart from "./components/user/Cart"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/home" element={<Home />}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
          <Route path="/admin-login" element={<AdminLogin/>}/>
          <Route path="/dashboard" element={<AdminDashboard/>}/>

          <Route path="/manage-book" element={<ManageBook/>}/>
          <Route path="/customer-detail" element={<CustomerDetails/>}/>

          <Route path="/userhome" element={<Homeu/>}/>
          <Route path="/userabout" element={<Aboutu/>}/>

          <Route path="/books" element={<Books/>}/>

          <Route path="/cart" element={<Cart/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App