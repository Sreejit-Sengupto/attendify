import React from "react";
import ProtectedRoute from "../../protected-route";
import DashboardPage from "./dashboard";

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
};

export default AdminDashboard;
