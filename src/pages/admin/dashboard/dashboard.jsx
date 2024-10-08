import React from "react";
import { useUserContext } from "../../../providers/UserProvider";
import { useNavigate, useParams } from "react-router-dom";

const DashboardPage = () => {
  const { logout, userData, getUserData } = useUserContext();

  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const { userId } = useParams();

  React.useEffect(() => {
    getUserData(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_APPWRITE_ORG_COLLECTION_ID,
      userId
    );
  }, []);

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
      <div>
        <p>Admin Dashboard</p>
        <p>OrgID: {userData.$id}</p>
        <p>Org Name: {userData.name}</p>
      </div>
    </div>
  );
};

export default DashboardPage;
