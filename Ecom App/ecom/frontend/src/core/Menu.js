import React,{ useState } from 'react';
import { Link, Navigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Import the useLocation hook
import { signout ,isAuthenticated} from '../auth/helper';


const CurrentTab = (path) => {
  const location = useLocation(); // Get the current location using the useLocation hook

  if (location.pathname === path) {
    return { color: '#2ecc72' };
  } else {
    return { color: '#FFFFFF' };
  }
};

function Menu() {
  
    const [shouldRedirect, setShouldRedirect] = useState(false);
  
    const handleSignout = () => {
      signout(() => {
        setShouldRedirect(true);
      });
    };
  
    if (shouldRedirect) {
      return <Navigate to='/' />;
    }
  return (
    <div>
      <ul className='nav nav-tabs bg-dark'>
        <li className='nav-item'>
          <Link to='/' style={CurrentTab('/')} className='nav-link'>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/cart' style={CurrentTab('/cart')} className='nav-link'>
            Cart
          </Link>
        </li>
        {isAuthenticated() && (
            <li className='nav-item'>
            <Link to='/user/dashboard' style={CurrentTab('/user/dashboard')} className='nav-link'>
              Dashboard
            </Link>
          </li>
        )}
       
        {!isAuthenticated() && (
            <>
             <li className='nav-item'>
             <Link to='/signin' style={CurrentTab('/signin')} className='nav-link'>
               Sign In
             </Link>
           </li>
           <li className='nav-item'>
          <Link to='/signup' style={CurrentTab('/signup')} className='nav-link'>
            Sign Up
          </Link>
        </li>
           </>
        )}
        {/* Other menu items */}
        
        {isAuthenticated() && (
          <>
            <li className='nav-item'>
          <Link to='/history' style={CurrentTab('/history')} className='nav-link'>
            My Orders
          </Link>
        </li>
            <li className='nav-item'>
            <span onClick={handleSignout} className='nav-link text-warning'>Sign Out</span>
          </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Menu;
