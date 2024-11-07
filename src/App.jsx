import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Home from './pages/home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import EmailVerification from './pages/email-verification';
import { UserProvider } from './providers/UserProvider';
import Dashboard from './pages/dashboard';
import AdminDashboard from './pages/admin/dashboard';
import AttendancePage from './pages/admin/attendance';
import MainPanel from './pages/dashboard/components/main-panel';
import OrgDetail from './pages/dashboard/components/org-detail-page';
import PasswordRecoveryPage from './pages/password-recovery';
import NewPasswordPage from './pages/password-recovery/new-password';
import ProtectAuth from './pages/protect-auth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/dashboard/:userId" element={<Dashboard />}>
        <Route index element={<MainPanel />} />
        <Route path=":org" element={<OrgDetail />} />
      </Route>

      <Route path="/admin/dashboard/:userId" element={<AdminDashboard />} />
      <Route
        path="/admin/dashboard/:userId/mark-attendance"
        element={<AttendancePage />}
      />

      <Route path="/recover-password" element={<PasswordRecoveryPage />} />
      <Route
        path="/new-password"
        element={
          <ProtectAuth>
            <NewPasswordPage />
          </ProtectAuth>
        }
      />
    </>,
  ),
);

const App = () => {
  const serverPinger = async () => {
    try {
      const baseURl = import.meta.env.PROD
        ? 'https://attendify-server-7g6h.onrender.com'
        : 'http://localhost:3000';
      await fetch(`${baseURl}/api/v1/ping`);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const timerId = setInterval(
      () => {
        serverPinger();
      },
      15 * 60 * 1000,
    );

    return () => clearInterval(timerId);
  }, []);

  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </UserProvider>
  );
};

export default App;
