import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { resend } from "../../Redux/Actions/Users/useraction";
import "./resend.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Resend = () => {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage();
  const dispatch = useDispatch();
  // const history = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userEmail, setemail] = useState("");

  // useEffect(() => {
  //   if (userEmail) {
  //     history("/signin");
  //   }
  // }, [dispatch, userEmail, history]);
  function onSubmit() {
    dispatch(resend(userEmail));
    toast("link has been sent to your email");
  }

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="inputEmail">{t("signin.email_address")}</label>
        <input
          name="email"
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
        {errors.text && <p className="error">{errors.text.message}</p>}
        <button type="submit">Resend Link</button>
        <ToastContainer />
      </form>
      {/* <a href="/verify">
        <KeyboardBackspaceIcon />
      </a> */}
    </div>
  );
};

export default Resend;
