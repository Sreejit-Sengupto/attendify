import React from 'react';
import LoginForm from './login';
import { InputFormProvider } from '../../../providers/InputFormProvider';
import ProtectAuth from '../../protect-auth';
import withAuthentication from '../../../hoc/authenticated';

const Login = withAuthentication(() => {
  return (
    <InputFormProvider>
      {/* <ProtectAuth> */}
      <LoginForm />
      {/* </ProtectAuth> */}
    </InputFormProvider>
  );
}, true);

// const Login = withAuthentication(LoginForm, true);

export default Login;
