import React,{useState,useEffect} from "react"; 
import { useForm } from "react-hook-form"; 
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/Actions/Users/useraction';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "./signup.css"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const SignUp = () => {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage()

  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log('reg', register)

  const [userName, setusername] = useState('');
  const [userEmail, setemail] = useState('');
  const [userPassword, setpassword] = useState('');
  const history = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(registerUser());  
  },[dispatch])
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo,error} = userLogin;
  

  function onSubmit(data) { 
  console.log('datas',data)
    dispatch(registerUser(userName, userEmail,userPassword));
    console.log(userInfo);
    toast("User Created!")
    if (userInfo !== null && error === undefined) {
       history('/signin');
    }  
  } 
  
  return ( 
    <div className="signup-form">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="inputUsername">{t("signup.username")}</label>
        <input type="text"
          {...register('text', {
            required: 'Username is required'
          })}
          value={userName}
          onChange={e => setusername(e.target.value)}
        />

        {errors.text && <p className="error">{errors.text.message}</p>}
        
        <label htmlFor="inputEmail">{t("signin.email_address")}</label>
        <input type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter the valid Email",
            }
          })}
          value={userEmail}
          onChange={e => setemail(e.target.value)}
        />
        
        {errors.email && <p className="error">{errors.email.message}</p>} 

        <label htmlFor="inputPassword">{t("signin.password")}</label>
        <input type="password"
          {...register('password', {
            required: 'Password is required',
            pattern: {
              value: /^[A-Za-z0-9]{5,10}$/,
              message: "Enter the valid Password with strings and numbers",
            }
          })}
          value={userPassword}
          onChange={e => setpassword(e.target.value)}
        />

        {errors.password && <p className="error">{errors.password.message}</p>}
        <button type="submit">{t("signup.signup")}</button>
        <ToastContainer/>
        <a href="signin">
          {t("signup.do_account")}
        </a>
      </form>
    </div>
  );
}; 

 export default SignUp; 

 