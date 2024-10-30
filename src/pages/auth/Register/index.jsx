import React from 'react';
import { InputFormProvider } from '../../../providers/InputFormProvider';
import RegisterForm from './register';
import ProtectAuth from '../../protect-auth';

const Register = () => {
  return (
    <InputFormProvider>
      <ProtectAuth>
        <RegisterForm />
      </ProtectAuth>
    </InputFormProvider>
  );
};

export default Register;
