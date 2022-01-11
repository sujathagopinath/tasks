import React from 'react';
import './Header.css'
import { Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/Actions/Users/useraction';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const { t, i18n } = useTranslation();
    i18n.changeLanguage()

    const handleChange = (option) => {
         i18next.changeLanguage(option)
        // sessionStorage.setItem('lang', option.target.value);
        // window.location.reload();
    };
    //    const language= sessionStorage.getItem('lang') || 'en'

    // function handleClick(lang) {
    //     i18next.changeLanguage(lang)
    // }
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
  
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate.push('/');
  };

  
  return (
      <header>
          <nav className='navbar'>
              <div className='nav-top'>
                  <ul>
                      {t('product.name')}
                      {userInfo ? (
                          <li className='nav-item'>
                              <Link className='nav-link' to='/prodcuts'>
                                  Products
                              </Link>
                          </li>
                      ) : (
                              <>
                                  <li className='nav-icon'>
                                      <select className='custom-select' onChange={handleChange}>
                                          <option value="Languages">Choose Language</option>
                                          <option value="en">English</option>
                                          <option value="ta">Tamil</option>
                                      </select>
                                  </li>
                                  <li className='nav-item'>
                                      <Link className='nav-link' to='/register'>
                                          {t('product.register')}
                                      </Link>
                                  </li>
                                  <li className='nav-item'>
                                      <Link className='nav-link' to='/login'>
                                          {t('product.login')}
                                      </Link>
                                  </li>
                                  <li>
                                  <button onClick={logoutHandler} className='dropdown-item'>
                    Logout
                  </button>
                  </li>
                          </>
                      )}
                  </ul>
              </div>
          </nav>
      </header>
  );
};

export default Header;
