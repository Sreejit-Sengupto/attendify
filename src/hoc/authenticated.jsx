import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../providers/UserProvider';
const withAuthentication = (Component, redirectIfAuth) => {
  return function AuthComponent() {
    const { user, userData } = useUserContext();

    if (redirectIfAuth) {
      return user ? <Navigate to={redirectUrl} replace /> : <Component />;
    }
    return user ? <Component /> : <Navigate to={'/login'} replace />;
  };
};

export default withAuthentication;
