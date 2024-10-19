import React from "react";
import ProtectedRoute from "../../protected-route";
import Attendence from "./components/attendence";

const AttendancePage = () => {
  return (
    <ProtectedRoute>
      <Attendence />
    </ProtectedRoute>
  );
};

export default AttendancePage;
