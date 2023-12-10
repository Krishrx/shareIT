import NavBar from "./NavBar";
import {Link} from 'react-router-dom'

function Header() {
    const isDark = false;

  return (
    <header className={`flex justify-between items-center px-10 py-4`}>
        <Link to="/"><p className={`font-bold text-4xl cursor-pointer`}>Share<span className={`${isDark?'text-darkPrimary':'text-accent'}`}>IT</span></p></Link>
        <NavBar/>
    </header>
  )
}

export default Header