import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../Redux/Actions/Users/useraction";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [userName, setusername] = useState("");
  const [userEmail, setemail] = useState("");
  const [userPassword, setpassword] = useState("");
  const [isAdmin, setIsadmin] = useState(false);
  const [verified] = useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(registerUser());
  }, [dispatch]);

  function onSubmit() {
    dispatch(
      registerUser(userName, userEmail, userPassword, isAdmin, verified)
    );
    console.log(userInfo);
    toast("User Created and Verify your email");
    history("/verify");
  }

  return (
    <div className="signup-form">
      <h3 className="heading">Sign Up</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="inputUsername">{t("signup.username")}</label>
          <input
            type="text"
            {...register("text", {
              required: "Username is required",
            })}
            value={userName}
            onChange={(e) => setusername(e.target.value)}
          />
          {errors.text && (
            <small className="error">{errors.text.message}</small>
          )}
        </div>
        <div>
          <label htmlFor="inputEmail">{t("signin.email_address")}</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "user Exists",
              },
            })}
            value={userEmail}
            onChange={(e) => setemail(e.target.value)}
          />

          {errors.email && (
            <small className="error">{errors.email.message}</small>
          )}
        </div>

        <div>
          <label htmlFor="inputPassword">{t("signin.password")}</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^[A-Za-z0-9]{5,20}$/,
                message:
                  "Enter the valid Password with strings and 5 to 20 numbers",
              },
            })}
            value={userPassword}
            onChange={(e) => setpassword(e.target.value)}
          />

          {errors.password && (
            <small className="error">{errors.password.message}</small>
          )}
        </div>

        <label htmlFor="inputIsadmin">IsAdmin</label>
        <input
          type="checkbox"
          checked={isAdmin}
          onChange={(e) => {
            setIsadmin(e.target.checked);
          }}
        />

        <p>{isAdmin ? "Checked" : "Not checked"}</p>

        <div>
          <button type="submit">{t("signup.signup")}</button>
          <a href="resend" className="resend">
            Resend
          </a>
          <ToastContainer />
        </div>
        <a href="signin">{t("signup.do_account")}</a>
      </form>
    </div>
  );
};

export default SignUp;
