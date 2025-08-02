// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useAuth();

  if (!token || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/Auth" replace />;
  }

  return children;
};


export default ProtectedRoute;
