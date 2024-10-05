import React from "react";
import InputForm from "../../components/input-form";

const Login = () => {
  const [category, setCategory] = React.useState("ORG");

  return (
    <>
      <div className="flex justify-center items-center my-2 gap-2 font-garamond">
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
      </div>
      <div>
        {category === "ORG" && (
          <InputForm category={category} type={"LOGIN"} />
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

export default Login;
