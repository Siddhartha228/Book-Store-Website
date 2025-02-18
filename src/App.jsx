import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Signup from "./components/Signup"

import AdminLogin from "./components/AdminLogin"
import AdminDashboard from "./components/Admin/AdminDashboard"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />  {/* Default Route */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
          <Route path="/admin-login" element={<AdminLogin/>}/>
          <Route path="/dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App