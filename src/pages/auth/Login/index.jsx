import React from 'react';
import LoginForm from './login';
import { InputFormProvider } from '../../../providers/InputFormProvider';
import ProtectAuth from '../../protect-auth';

const Login = () => {
  return (
    <InputFormProvider>
      <ProtectAuth>
        <LoginForm />
      </ProtectAuth>
    </InputFormProvider>
  );
};

export default Login;
