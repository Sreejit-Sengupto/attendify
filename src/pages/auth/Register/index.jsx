import React from 'react';
import { InputFormProvider } from '../../../providers/InputFormProvider';
import RegisterForm from './register';
import ProtectAuth from '../../protect-auth';
import withAuthentication from '../../../hoc/authenticated';

const Register = withAuthentication(() => {
  return (
    <InputFormProvider>
      {/* <ProtectAuth> */}
      <RegisterForm />
      {/* </ProtectAuth> */}
    </InputFormProvider>
  );
}, true);

export default Register;
