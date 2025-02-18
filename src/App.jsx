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

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          
          <Route path="/admin-login" element={<AdminLogin/>}/>
          <Route path="/dashboard" element={<AdminDashboard/>}/>

          <Route path="/userhome" element={<Homeu/>} />
          <Route path="/userabout" element={<Aboutu/>}/>
          <Route path="/books" element={<Books/>}/>
          
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App