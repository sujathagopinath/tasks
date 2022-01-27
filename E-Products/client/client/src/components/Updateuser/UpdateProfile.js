import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Actions/Users/useraction";
import Loading from "../Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("info", userInfo);

  const [userName, setname] = useState(userInfo.userdata[0].userName);
  const [userEmail, setemail] = useState(userInfo.userdata[0].userEmail);
  const [userPassword, setpassword] = useState("");
  console.log("login", userLogin);

  const updatedUser = useSelector((state) => state.updatedUser);
  const { userdata, loading } = updatedUser;

  const dispatch = useDispatch();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(userName, userEmail, userPassword));
    toast("Updated and login with new credentials and Try!!");
  };

  const mystyle = {
    backgroundColor: "lightgrey",
    color: "black",
    width: "30%",
    border: "1px solid green",
    padding: "1px",
  };

  return (
    <div className="row container-height">
      <div className="container">
        {userdata}
        <div className="col mt-5">
          {loading && userdata ? (
            <Loading />
          ) : (
            <div className="card m-auto " style={mystyle}>
              <h2 className="text-center">Update Profile</h2>
            </div>
          )}
        </div>
        <div className="col-lg-6 col-md-6 m-auto">
          <form onSubmit={formSubmitHandler}>
            <fieldset>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">UserName</label>
                <input
                  value={userName}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  value={userEmail}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  value={userPassword}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary m-auto">
                Update your profile
              </button>
              <ToastContainer />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
