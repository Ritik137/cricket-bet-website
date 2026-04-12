import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { token, loading } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  // Decode role from token
  let userRole = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userRole = payload.role;
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }

  useEffect(() => {
    // Simulate verification delay for better UX
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [token]);

  // Show loading state
  if (loading || isVerifying) {
    return (
      <div className="protected-route-loading">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Verifying access...</p>
        </div>
      </div>
    );
  }

  // No token - redirect to login
  if (!token) {
    return (
      <div className="protected-route-redirect">
        <div className="redirect-container">
          <div className="redirect-icon">🔒</div>
          <h2>Access Denied</h2>
          <p>Please log in to continue</p>
          <Navigate to="/login" replace />
        </div>
      </div>
    );
  }

  // Check role if required
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="protected-route-forbidden">
        <div className="forbidden-container">
          <div className="forbidden-icon">⛔</div>
          <h2>Access Forbidden</h2>
          <p>You don't have permission to access this page</p>
          <p className="required-role">Required Role: {requiredRole}</p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  // Token exists and role check passed - render children
  return <div className="protected-route-content">{children}</div>;
};

export default ProtectedRoute;