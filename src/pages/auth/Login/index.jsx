import React from "react";
import LoginForm from "./login";
import { InputFormProvider } from "../../../providers/InputFormProvider";

const Login = () => {
  return (
    <InputFormProvider>
      <LoginForm />
    </InputFormProvider>
  );
};

export default Login;
