import React from "react";
import InputForm from "../../../components/input-form";
import { useInputForm } from "../../../providers/InputFormProvider";
import { register } from "../../../appwrite/auth";
import { account, databases } from "../../../appwrite/config";
import { ID } from "appwrite";
import { generateOrgCode } from "../../../utils/codeGenerator";
import { useUserContext } from "../../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [category, setCategory] = React.useState("STUDENT");

  const { formData } = useInputForm();
  const { login } = useUserContext();

  const navigate = useNavigate();

  const registerOrg = async (e) => {
    try {
      e.preventDefault();
      console.log("Registering...");
      await register(formData.name, formData.email, formData.password);

      const dbData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.mobileNumber,
        addressLine1: formData.line1,
        addressLine2: formData.line2,
        state: formData.state,
        city: formData.city,
        orgCode: generateOrgCode(formData.name),
      };

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
        ID.unique(),
        dbData
      );

      await login(formData.email, formData.password);

      navigate("/dashboard");

      console.log("Registered successfully!!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center my-2 gap-2 font-garamond">
        <button
          className={`${
            category === "STUDENT"
              ? "bg-secondary p-2 rounded"
              : "p-2 border-b-2 border-b-secondary"
          }`}
          onClick={() => setCategory("STUDENT")}
        >
          Student
        </button>
        <button
          className={`${
            category === "ORG"
              ? "bg-secondary p-2 rounded"
              : "p-2 border-b-2 border-b-secondary"
          }`}
          onClick={() => setCategory("ORG")}
        >
          Organisation
        </button>
      </div>
      <div>
        {category === "ORG" && (
          <InputForm
            category={category}
            type={"REGISTER"}
            formHandler={registerOrg}
          />
        )}
      </div>
      <div>
        {category === "STUDENT" && (
          <InputForm category={category} type={"REGISTER"} />
        )}
      </div>
    </>
  );
};

export default RegisterForm;
