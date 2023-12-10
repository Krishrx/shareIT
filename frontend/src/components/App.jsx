
import Header from "./Header";
import Footer from "./Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { BrowserRouter, Routes,Route } from "react-router-dom";


function App() {
   const isDark = false;
  return (
    <div className={`font-poppins w-full min-h-screen max-h-full ${isDark?'bg-darkBackground text-darkText':'bg-background text-text'}`}>
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
