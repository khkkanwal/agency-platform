import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userRole = payload.role;
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
