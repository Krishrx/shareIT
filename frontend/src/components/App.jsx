import { useAuthContext } from '../hooks/useAuthContext';
import Header from "./Header";
import Footer from "./Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { BrowserRouter, Routes,Route,Navigate } from "react-router-dom";


function App() {
   const isDark = false;
   const { user } = useAuthContext();
  return (
    <div className={`font-poppins w-full min-h-screen max-h-full ${isDark?'bg-darkBackground text-darkText':'bg-background text-text'}`}>
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={user?<Home />:<Navigate to={'/login'}/>} />
            <Route path="/login" element={!user?<Login />:<Navigate to={'/'}/>} />
            <Route path="/signup" element={!user?<Signup />:<Navigate to={'/'}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
