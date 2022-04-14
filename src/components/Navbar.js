import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import './Navbar.css'

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
            <ul>
            {user && (<li>Hello, {user.displayName}</li>)}
            <li><Link to={'/'}>GameBoard</Link></li>
              {!user && (
                <>
                  
                  <li><Link to={'/signup'}>Signup</Link></li>
                  <li><Link to={'/login'}>Login</Link></li>
                </>
              )}
                
          {user && (
                <> 
               
                  <li>
                    <button onClick={logout} className='btn'>Logout</button>
                  </li>
                </>
          )}
              
            </ul>
    </div>

  )
}
export default Navbar

