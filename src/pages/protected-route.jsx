import React from 'react';
import { useUserContext } from '../providers/UserProvider';
import { Navigate, Outlet } from 'react-router-dom';
import VerificationPrompt from './verification-prompt';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();

  if (user !== null) {
    return user.emailVerification ? children : <VerificationPrompt />;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRoute;
