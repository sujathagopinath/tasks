import React from "react";
import { Navigate } from "react-router-dom";
import role from "../Constants/Roles";

const PrivateRoute = ({ children }) => {
  console.log("child", children);
  const auth = sessionStorage.getItem("userAuthData");
  const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin"));
  const multirole = children[1].props.role;
  // return auth && isAdmin ? children : <Navigate to="/forbidden" />;
  if (auth) {
    if (multirole === role.admin && isAdmin) {
      return children;
    } else if (multirole === role.user && !isAdmin) {
      return children;
    } else {
      return <Navigate to="/forbidden" />;
    }
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
