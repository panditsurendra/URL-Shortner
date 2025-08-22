import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for a token in localStorage when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // You can expand this provider with login/logout functions that update the state
  const authValue = { isAuthenticated, setIsAuthenticated };

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

// // Custom hook to easily access auth state
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
export default AuthContext;