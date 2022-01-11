import React from 'react';
import { Route, Navigate } from 'react-router-dom'

const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route {...rest} render={props =>
        sessionStorage.getItem("userAuthData")
            ? (<Component {...props} />)
            : (<Navigate to={{ pathname: "/login" }} />)
    }
    />
)

export default PrivateRoute
