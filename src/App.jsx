import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer, Zoom } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './index.css';
import Home from "./pages/home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import EmailVerification from "./pages/email-verification";
import { UserProvider } from "./providers/UserProvider";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/admin/dashboard";
import AttendancePage from "./pages/admin/attendance";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route path="/dashboard/:userId" element={<Dashboard />} />
      <Route path="/admin/dashboard/:userId" element={<AdminDashboard />} />

      <Route
        path="/admin/dashboard/:userId/mark-attendance"
        element={<AttendancePage />}
      />
    </>
  )
);

const App = () => {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center"
                      autoClose={2000}
                      hideProgressBar={true}
                      newestOnTop={true}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme= "colored"
                      transition={Zoom} />
    </UserProvider>
  );
};

export default App;
