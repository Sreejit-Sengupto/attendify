import React from "react";
import { useUserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { logout } = useUserContext();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <div className="flex justify-between items-center p-2 border-b-2">
        <p>Attendify</p>
        <button
          className="bg-primary p-3 rounded-lg text-white"
          onClick={logoutUser}
        >
          Logout
        </button>
      </div>
      <div>Dashboard</div>
    </div>
  );
};

export default DashboardPage;
