import  'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

// This component just checks if the user is logged in at all
export const PrivateRoute = (props) => {
  const { children } = props;
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  // If true show the page. If false then re-direct to login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// checks if they have a specific role like if it is admin or like customer
export const RoleRoute = (props) => {
  const { children, allowedRoles = [] } = props;
  const { isAuthenticated, role } = useAuthStore();
  
  // Must be logged in
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  // if roles are required, the user's role must be in the list
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />; // Send to error page
  }
  
  // if both the above rules will be passed then the user can access the page
  return children;
};

