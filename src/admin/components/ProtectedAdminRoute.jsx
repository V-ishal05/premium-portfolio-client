import React from "react";
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/adminAuth";

function ProtectedAdminRoute({ children }) {
  return isAdminAuthenticated() ? (
    children
  ) : (
    <Navigate to="/admin/login" replace />
  );
}

export default ProtectedAdminRoute;