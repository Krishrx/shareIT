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
        <div className='flex gap-x-5 items-center'>
          <p>{user.email}</p>
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