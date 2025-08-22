import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './Context/AuthContext';

/**
 * A protected route component.
 * It checks if a user is authenticated (by checking for a 'token' in localStorage).
 * If authenticated, it renders the requested component.
 * If not, it redirects the user to the login page.
 */
const ProtectedRoute = ({ children }) => {
    let ctx = useContext(AuthContext);
  const isAuthenticated = ctx.isAuthenticated; // 
  
  if (!isAuthenticated) {
    // User not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
