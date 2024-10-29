import React from "react";
import ProtectAuth from "../protect-auth";
import RecoverPassword from "./components/recover-password";

const PasswordRecoveryPage = () => {
  return (
    <ProtectAuth>
      <RecoverPassword />
    </ProtectAuth>
  );
};

export default PasswordRecoveryPage;
