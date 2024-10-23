import React from "react";
import ProtectedRoute from "../../protected-route";
import DashboardPage from "./dashboard";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
};

export default AdminDashboard;
