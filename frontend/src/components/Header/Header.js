import React from 'react';
import './Header.css'
import { Link} from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
const Header = () => {
  
  return (
      <header>
          <nav className='navbar'>
              <div className='nav-top'>
                  <ul>
                      E-Products
                      <li className='nav-icon'><SettingsIcon/></li>
                      <li className='nav-item'>
                          <Link className='nav-link' to='/register'>
                              Register
                          </Link>
                      </li>
                      <li className='nav-item'>
                          <Link className='nav-link' to='/login'>
                              Login
                          </Link>
                      </li>
                      
                  </ul>
              </div>
          </nav>
      </header>
  );
};

export default Header;
