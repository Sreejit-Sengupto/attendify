import React from 'react';
import { useUserContext } from '../../providers/UserProvider';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import TopBar from '../../components/topbar';
import MainPanel from './components/main-panel';

const DashboardPage = () => {
  const { user, getUserData, addRedirectUrl } = useUserContext();

  const { userId } = useParams();

  const location = useLocation();

  React.useEffect(() => {
    getUserData(
      import.meta.env.VITE_APPWRITE_DB_ID,
      import.meta.env.VITE_APPWRITE_STD_COLLECTION_ID,
      userId,
    );
    addRedirectUrl(user.$id, location.pathname);
  }, []);

  return (
    <div className="w-full h-[100dvh] flex flex-col">
      <TopBar />
      <Outlet />
    </div>
  );
};

export default DashboardPage;
