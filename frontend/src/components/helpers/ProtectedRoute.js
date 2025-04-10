import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children, allowRoles = [] }) => {
  const { data } = useContext(UserContext);

  if (!data) return null;

  const userRole = data.role?.toLowerCase();

  if (!allowRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
