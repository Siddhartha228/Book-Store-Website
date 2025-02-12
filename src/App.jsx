import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import AdminLogin from "./components/AdminLogin"

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />  {/* Default Route */}
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/adminlogin" element={<AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App