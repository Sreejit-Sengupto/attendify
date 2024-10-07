import React, { createContext, useContext } from "react";

const InputFormContext = createContext(null);

export const InputFormProvider = ({ children }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    orgCode: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const contextData = {
    formData,
    setFormData,
  };

  return (
    <InputFormContext.Provider value={contextData}>
      {children}
    </InputFormContext.Provider>
  );
};

export const useInputForm = () => useContext(InputFormContext);

export default InputFormContext;
