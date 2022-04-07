import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "../components/login";
import { Users } from "../components/users";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
