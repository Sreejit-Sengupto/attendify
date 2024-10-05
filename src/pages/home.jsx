import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex gap-2 text-blue-500">
      <Link to={"/register"}>Register</Link>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default Home;
