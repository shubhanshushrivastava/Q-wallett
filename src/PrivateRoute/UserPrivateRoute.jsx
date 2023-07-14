import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserPrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  if ( isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default UserPrivateRoute;
