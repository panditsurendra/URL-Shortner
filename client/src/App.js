import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
import Home from './components/pages/home';
import Login from './components/pages/login';
import SignUp from './components/pages/signup';
import {Notfound} from './components/pages/notFound';
import About from './components/pages/about';
import Profile from './components/pages/profile';
import ProtectedRoute from './components/protectedRoute'; 


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />

        {/* Protected Route for the main application */}
        <Route 
          path="/" 
          element={
              <Home />
          } 
        />

        <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        
        {/* Add a catch-all or 404 route if needed */}
        <Route path="*" element={<Notfound  />} />
      </Routes>
    </BrowserRouter>
  );
}





