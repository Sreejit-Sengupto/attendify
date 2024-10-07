import React from "react";
import InputForm from "../../../components/input-form";
import { useUserContext } from "../../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { useInputForm } from "../../../providers/InputFormProvider";

const LoginForm = () => {
  const [category, setCategory] = React.useState("STUDENT");

  const { login } = useUserContext();
  const { formData } = useInputForm();

  const navigate = useNavigate();

  const loginOrg = async (e) => {
    try {
      e.preventDefault();
      console.log("Logging in...");
      console.log(formData.email, formData.password);
      await login(formData.email, formData.password);
      navigate("/dashboard");
      console.log("Login successfull");
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
            type={"LOGIN"}
            formHandler={loginOrg}
          />
        )}
      </div>
      <div>
        {category === "STUDENT" && (
          <InputForm category={category} type={"LOGIN"} />
        )}
      </div>
    </>
  );
};

export default LoginForm;
