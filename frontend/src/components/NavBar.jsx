import {Link,Outlet} from 'react-router-dom'

function NavBar() {
  return (
    <ul className='flex gap-x-5 items-center'>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/signup">SignUp</Link></li>
      <Outlet/>
    </ul>
  )
}

export default NavBar