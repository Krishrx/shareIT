import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

function NavBar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      {user && (
        <div className='flex flex-col gap-y-5 justify-center items-center md:gap-x-5 md:flex-row md:gap-y-0'>
          <p className='text-xs md:text-sm'>{user.email}</p>
          <button className='border-2 border-accent px-4 py-2 rounded-md hover:border-white hover:bg-accent hover:text-white transition-colors duration-300 ease-in-out' onClick={handleLogout}>Logout</button>
        </div>
      )
      }
      {!user && (
        <div className='flex gap-x-5 items-center'>
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </div>
      )
      }
    </div>
  )
}

export default NavBar