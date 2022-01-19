import React from 'react';
import './Header.css'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/Actions/Users/useraction';
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
                                  <button className='press' onClick={() => handleclick('ta')}>Ta</button>
                                  <button className='press' onClick={() => handleclick('en')}>En</button>
                              </li>
                         <li className='items'>
                              <p>{userInfo.userdata[0].userName}</p>
                          </li>

                          <li className='items'>
                              <button onClick={logoutHandler} className='logout'>
                                   {t("product.logout")} 
                              </button>
                          </li>
                          
                          <li className='items'>
                              <a className='links' href='products'>
                                  {t("header.products")} 
                             </a>
                          </li>
                          <li className='items'>
                              <a className='links' href='allproducts'>
                                   {t("header.userproducts")} 
                             </a>
                          </li>
                          <li className='items'>
                              <a className='links' href='create'>
                                   {t("header.addproducts")} 
                              </a>
                          </li>
                
                          <li className='items'>
                              <a className='links' href='allusers'>
                                   {t("header.users")} 
                              </a>
                          </li>

                          <li className='items'>
                              <a className='links' href='update'>
                                  {t("header.profile")} 
                              </a>
                          </li>
                          
                      </>
                  ) : (
                          <>
                              <li className='items'>
                                  <button className='press' onClick={() => handleclick('ta')}>Ta</button>
                                  <button className='press' onClick={() => handleclick('en')}>En</button>
                              </li>
                              <li className='items'>
                                  <a  href="signup" className='links'>
                                      {t("product.register")}
                                  </a>
                              </li>
                              <li className='items'>
                                  <a  href="signin" className='links'>
                                      {t("product.login")} 
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
