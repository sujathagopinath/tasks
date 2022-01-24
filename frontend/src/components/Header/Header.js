import React from 'react';
import './Header.css'
// import { Link} from 'react-router-dom';
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
    const history = useNavigate();

 const logoutHandler = () => {
    dispatch(logoutUser());
    history('/');
  };


  return (
      <header>
          <nav>
              <ul className='underline'>
                  {t("product.name")}
                  {userInfo ? (
                      <>
                          <li className='items'>
                              <a className='links' href='products'>
                                  Products
                              </a>
                          </li>
                          <li className='items'>
                              <a className='links' href='create'>
                                  Add Product
                              </a>
                          </li>
                          <li className='items'>
                              <a className='links' href='allusers'>
                                  Users
                              </a>
                          </li>
                          <li className='nav-item dropdown'>
                              {/* <a className='links'>{userInfo.userName}</a> */}
                              <p>{ userInfo.userName}</p>
                              <a className='items' href='profile'>
                                  Profile
                              </a>
                              <button onClick={logoutHandler} className='press'>
                                  Logout
                              </button>
                          </li>
                      </>
                  ) : (
                          <>
                              <li className='items'>
                                  <button className='press' onClick={() => handleclick('ta')}>Tamil</button>
                                  <button className='press' onClick={() => handleclick('en')}>English</button>
                              </li>
                              <li className='items'>
                                  <a  href="/signup" className='links'>
                                      {/* {t("product.register")} */}Register
                                  </a>
                              </li>
                              <li className='items'>
                                  <a href="signin" className='links'>
                                      {/* {t("product.login")} */} Login
                                  </a>
                              </li>
                              
                      </>
                  )}
              </ul>
          </nav>
      </header>
  );
};

export default Header;
