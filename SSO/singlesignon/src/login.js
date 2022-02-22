import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./login.css";

const Login = () => {
  const clientId =
    "601270705293-1kpto4h0ja0qlddapi9l86qtbc0gh97o.apps.googleusercontent.com";
  const [showLoginButton, setShowloginbutton] = useState(true);
  const [showLogoutButton, setShowlogoutbutton] = useState(false);
  const [userEmail, setemail] = useState("");
  const [userPassword, setpassword] = useState("");

  const onLoginSuccess = (res) => {
    console.log("Login Success", res.profileObj);
    setShowloginbutton(false);
    setShowlogoutbutton(true);
  };
  const onFailureSuccess = (res) => {
    console.log("Login Success", res);
  };
  const onLogoutSuccess = () => {
    alert("you have logged!!");
    setShowloginbutton(true);
    setShowlogoutbutton(false);
    console.clear();
  };
  function formSubmitHandler(e) {
    const data = {
      userEmail,
      userPassword,
    };
    e.preventDefault();
    console.log(data);
  }
  return (
    <div className="signin-form">
      <h3 className="heading">SSO</h3>
      <form onSubmit={formSubmitHandler} noValidate>
        <label htmlFor="inputEmail">Email Id</label>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setemail(e.target.value)}
        />

        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          value={userPassword}
          onChange={(e) => setpassword(e.target.value)}
        />
        <br></br>
        <div>
          <button type="submit">Login</button>
        </div>
        <small style={{ alignItems: "center" }}>Or</small>
        <hr></hr>
        {showLoginButton ? (
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onLoginSuccess}
            onFailure={onFailureSuccess}
            cookiePolicy={"single_host_origin"}
          />
        ) : null}
        {showLogoutButton ? (
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />
        ) : null}
      </form>
    </div>
  );
};

export default Login;
