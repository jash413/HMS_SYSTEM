import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, userPermissions, requiredPermissions }) => {
  const hasRequiredPermissions = requiredPermissions.every(permission =>
    userPermissions.includes(permission)
  );

  return isAuthenticated && hasRequiredPermissions ? (
    <Routes>
    <Route element={element} />
    </Routes>
  ) : (
    <Navigate to="/signin" /> // Redirect to the login page or another unauthorized page
  );
};

export default ProtectedRoute;
