import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { promoteUser } from "../../Redux/Actions/Users/useraction";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PromoteUser = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [userId] = useState(user.userId);
  const [role, setrole] = useState(user.role);

  const dispatch = useDispatch();
  const history = useNavigate();

  const formSubmitHandler = (e) => {
    const data = {
      role,
    };
    e.preventDefault();
    dispatch(promoteUser(userId, data));
    history("/allusers");
  };

  return (
    <div className="row container-height">
      <div className="signup-form">
        <h3>Promote User</h3>
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="inputEmail">UserType</label>
          <input
            value={role}
            onChange={(e) => setrole(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Promote User"
          />
          <button type="submit" className="btn btn-success m-auto">
            Update
          </button>
          <ToastContainer />
          <Loading />
        </form>
      </div>
    </div>
  );
};

export default PromoteUser;
