import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import EmailVerification from "./pages/email-verification";
import { UserProvider } from "./providers/UserProvider";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/protected-route";
import DashboardPage from "./pages/Dashboard/dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>
  )
);

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export default App;
