import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../utils/hooks/index.jsx";





const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token || !user.user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;

