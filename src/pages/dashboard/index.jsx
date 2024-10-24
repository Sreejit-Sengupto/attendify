import React from "react";
import ProtectedRoute from "../protected-route";
import DashboardPage from "./dashboard";
import { useUserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user.labels.includes("STD")) {
      navigate("/login");
      return;
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
};

export default Dashboard;
