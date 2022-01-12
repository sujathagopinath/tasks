import React from 'react';
import './Header.css'
import { Link} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/Actions/Users/useraction';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const { t, i18n } = useTranslation();
    function handleclick(lang) {
        i18n.changeLanguage(lang)
    }
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
                       {t("product.name")}
                      
                      {userInfo ? (
                          <li className='nav-item'>
                              <Link className='nav-link' to='/prodcuts'>
                                  Products
                              </Link>
                          </li>
                      ) : (
                              <>
                                  <li className='nav-item'>
                                      <button  className='button' onClick={logoutHandler}>
                                          Logout
                                      </button>
                                  </li>

                                   <li className='nav-item'>
                                      <button className='button'  onClick={() => handleclick('ta')}>Tamil</button>
                                      <button  className='button' onClick={()=>handleclick('en')}>English</button>
                                  </li>
                                  
                                  <li className='nav-item'>
                                      <Link className='nav-link' to='/register'>
                                        {t("product.register")}
                                      </Link>
                                  </li>
                                  <li className='nav-item'>
                                      <Link className='nav-link' to='/login'>
                                         {t("product.login")}
                                      </Link>
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
