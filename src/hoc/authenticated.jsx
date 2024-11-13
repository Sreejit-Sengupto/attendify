import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../providers/UserProvider';
import VerificationPrompt from '../pages/verification-prompt';
const withAuthentication = (Component, redirectIfAuth) => {
  return function AuthComponent() {
    const { user, getRedirectUrl, url } = useUserContext();

    React.useEffect(() => {
      getRedirectUrl(user?.$id);
    }, []);

    if (redirectIfAuth) {
      return user ? <Navigate to={url} replace /> : <Component />;
    }
    return user ? (
      user?.emailVerification ? (
        <Component />
      ) : (
        <VerificationPrompt />
      )
    ) : (
      <Navigate to={'/login'} replace />
    );
  };
};

export default withAuthentication;
