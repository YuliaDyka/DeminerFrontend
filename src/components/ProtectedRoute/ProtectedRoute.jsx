import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuth, redirect = "/login" }) => {
  if (isAuth) {
    return <Outlet />;
  }
  return <Navigate to={redirect} />;
};

export default ProtectedRoute;
