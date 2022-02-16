import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/Actions/Users/useraction";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./signin.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userEmail, setemail] = useState("");
  const [userPassword, setpassword] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();

  const userLoginDetails = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginDetails;

  useEffect(() => {
    if (userInfo) {
      history("/");
    }
  }, [dispatch, userInfo, history]);

  function onSubmit(data) {
    console.log("datas", data);
    dispatch(loginUser(userEmail, userPassword));

    console.log(userEmail, userPassword);
    toast("once verified your mail and Log In occurs!!");
  }

  return (
    <div className="signin-form">
      <h3 className="heading">Sign In</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="inputEmail">{t("signin.email_address")}</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter the valid Email",
            },
          })}
          value={userEmail}
          onChange={(e) => setemail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <label htmlFor="inputPassword">{t("signin.password")}</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8}$/,
              message: "Enter the valid Password with strings and numbers",
            },
          })}
          value={userPassword}
          onChange={(e) => setpassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <div>
          <button type="submit">{t("signin.signin")}</button>
          <ToastContainer />
        </div>
        <a href="signup" className="hyperlink">
          {t("signin.dont_account")}
        </a>
      </form>
    </div>
  );
};

export default SignIn;
