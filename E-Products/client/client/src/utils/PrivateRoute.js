import React from "react";
import { Navigate } from "react-router-dom";
import userRole from "../Constants/Roles";

const PrivateRoute = ({ children }) => {
  console.log("child", children);
  const auth = sessionStorage.getItem("userAuthData");
  const role = sessionStorage.getItem("role");
  const multirole = children[1].props.role;
  // return auth && isAdmin ? children : <Navigate to="/forbidden" />;
  if (auth) {
    if (multirole === userRole.admin && role) {
      return children;
    } else if (multirole === userRole.user && role) {
      return children;
    } else {
      return <Navigate to="/forbidden" />;
    }
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
