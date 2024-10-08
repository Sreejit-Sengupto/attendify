import React from "react";
import ProtectedRoute from "../protected-route";
import DashboardPage from "./dashboard";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
};

export default Dashboard;
