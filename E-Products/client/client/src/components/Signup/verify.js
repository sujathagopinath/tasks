import React from "react";
const Verify = () => {
  return (
    <div className="signup-form">
      <div className="container">
        <h4>Verify your Email before login!!</h4>
        <a
          href="signnin"
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Click to Login.
        </a>
      </div>
    </div>
  );
};

export default Verify;
