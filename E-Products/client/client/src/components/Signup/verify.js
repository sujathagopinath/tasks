import React from "react";
import { Link } from "react-router-dom";

const Verify = () => {
  return (
    <div className="signup-form">
      <div className="col-lg-6 col-md-6 m-auto">
        <div className="container">
          <Link
            to="signin"
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Click to Login.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
