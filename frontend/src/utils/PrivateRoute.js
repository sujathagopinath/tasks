import React from 'react';
import { Navigate } from 'react-router-dom'

const  PrivateRoute = ({ children })=> {
    const auth = sessionStorage.getItem("userAuthData")
    return auth ? children : <Navigate to="/signin" />;
}

export default PrivateRoute
