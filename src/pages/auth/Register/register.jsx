import React from "react";
import InputForm from "../../../components/input-form";
import { useInputForm } from "../../../providers/InputFormProvider";
import { register } from "../../../appwrite/auth";
import { databases } from "../../../appwrite/config";
import { ID } from "appwrite";
import { useUserContext } from "../../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [category, setCategory] = React.useState("STUDENT");

  const { formData, setFormData } = useInputForm();
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
      };

      const newOrg = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
        ID.unique(),
        dbData
      );

      await login(formData.email, formData.password);

      navigate(`/admin/dashboard/${newOrg.$id}`, { replace: true });

      console.log("Registered successfully!!");
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
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
    }
  };

  const registerStudent = async (e) => {
    try {
      e.preventDefault();
      console.log("Registering...");
      const org = await databases.getDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
        formData.orgCode
      );

      if (!org) {
        alert("Invalid org-code");
        return;
      }

      await register(formData.firstName, formData.email, formData.password);

      // check if org exists

      const dbData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.mobileNumber,
        organisation: [formData.orgCode],
      };

      const newStd = await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DB_ID,
        import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
        ID.unique(),
        dbData
      );

      await login(formData.email, formData.password);

      navigate(`/dashboard/${newStd.$id}`, { replace: true });

      console.log("Registered successfully!!");
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setFormData({
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
    }
  };

  return (
    <>
      <div className="flex justify-center items-center my-2 gap-2 font-garamond text-textPrimary">
        <button
          className={`${
            category === "STUDENT"
              ? "bg-accent p-2 rounded"
              : "p-2 border-b-2 border-white border-b-accent"
          }`}
          onClick={() => setCategory("STUDENT")}
        >
          Student
        </button>
        <button
          className={`${
            category === "ORG"
              ? "bg-accent p-2 rounded"
              : "p-2 border-b-2 border-b-accent"
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
          <InputForm
            category={category}
            type={"REGISTER"}
            formHandler={registerStudent}
          />
        )}
      </div>
    </>
  );
};

export default RegisterForm;
