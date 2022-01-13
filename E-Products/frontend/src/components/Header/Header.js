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
                              <Link className='links' to='/prodcuts'>
                                      Products
                              </Link>
                          </li>
                          <li className='items'>
                              <button className='press' onClick={logoutHandler}>
                                 {t("product.logout")}
                              </button>
                          </li>
                      </>
                          

                      ) : (
                              <>
                                  <li className='items'>
                                      <button  className='press' onClick={logoutHandler}>
                                         {t("product.logout")}
                                      </button>
                                  </li>

                                   <li className='items'>
                                      <button className='press'  onClick={() => handleclick('ta')}>Tamil</button>
                                      <button  className='press' onClick={()=>handleclick('en')}>English</button>
                                  </li>
                                  
                                  <li className='items'>
                                      <Link className='links' to='/signup'>
                                        {t("product.register")}
                                      </Link>
                                  </li>
                                  <li className='items'>
                                      <Link className='links' to='/signin'>
                                         {t("product.login")}
                                      </Link>
                                  </li>
                                  
                          </>
                      )}
                  </ul>
              
          </nav>
      </header>
  );
};

export default Header;
