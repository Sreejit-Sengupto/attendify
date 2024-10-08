import React from "react";
import { InputFormProvider } from "../../../providers/InputFormProvider";
import RegisterForm from "./register";

const Register = () => {
  return (
    <InputFormProvider>
      <RegisterForm />
    </InputFormProvider>
  );
};

export default Register;
